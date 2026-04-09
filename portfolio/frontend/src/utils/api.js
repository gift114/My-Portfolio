const BASE_URL = '/api';

// ── Core fetch wrapper ──────────────────────────────────────────────────────
// Attaches the JWT token automatically, parses JSON, and throws on non-2xx.
const request = async (method, path, { body, params } = {}) => {
  const token = localStorage.getItem('portfolio_token');

  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  let url = `${BASE_URL}${path}`;
  if (params) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
    ).toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    // Mirror the shape axios throws so all existing catch blocks still work
    const err = new Error(data?.error || `Request failed with status ${res.status}`);
    err.response = { status: res.status, data };
    throw err;
  }

  // Mirror axios's res.data shape so call sites stay identical
  return { data };
};

// ── Projects ────────────────────────────────────────────────────────────────
export const getProjects = (params) => request('GET', '/projects', { params });
export const createProject = (data) => request('POST', '/projects', { body: data });
export const updateProject = (id, data) => request('PUT', `/projects/${id}`, { body: data });
export const deleteProject = (id) => request('DELETE', `/projects/${id}`);

// ── Skills ──────────────────────────────────────────────────────────────────
export const getSkills = () => request('GET', '/skills');
export const createSkill = (data) => request('POST', '/skills', { body: data });
export const updateSkill = (id, data) => request('PUT', `/skills/${id}`, { body: data });
export const deleteSkill = (id) => request('DELETE', `/skills/${id}`);

// ── Experience ──────────────────────────────────────────────────────────────
export const getExperience = () => request('GET', '/experience');
export const createExperience = (data) => request('POST', '/experience', { body: data });
export const updateExperience = (id, data) => request('PUT', `/experience/${id}`, { body: data });
export const deleteExperience = (id) => request('DELETE', `/experience/${id}`);

// ── Contact ─────────────────────────────────────────────────────────────────
export const sendContact = (data) => request('POST', '/contact', { body: data });

// ── Auth ─────────────────────────────────────────────────────────────────────
export const loginAdmin = (data) => request('POST', '/auth/login', { body: data });
