import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Thin fetch helper used only inside this file
const apiFetch = async (method, path, { body, token } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data?.error || 'Request failed');
    err.response = { status: res.status, data };
    throw err;
  }

  return data;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, verify any stored token
  useEffect(() => {
    const token = localStorage.getItem('portfolio_token');
    if (!token) {
      setLoading(false);
      return;
    }

    apiFetch('GET', '/auth/verify', { token })
      .then((data) => setAdmin(data.admin))
      .catch(() => localStorage.removeItem('portfolio_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await apiFetch('POST', '/auth/login', {
      body: { email, password },
    });
    localStorage.setItem('portfolio_token', data.token);
    setAdmin(data.admin);
    return data.admin;
  };

  const logout = () => {
    localStorage.removeItem('portfolio_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
