import React from 'react';

const Footer = () => (
  <footer style={{
    borderTop: '1px solid var(--border)',
    padding: '2rem 0',
    textAlign: 'center',
  }}>
    <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Abdulazeez Hibatullah. Built with React + Node.js + MongoDB.
      </span>
      <a href="/admin/login" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
        onMouseEnter={e => e.target.style.color = 'var(--text-secondary)'}
        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
      >
        admin
      </a>
    </div>
  </footer>
);

export default Footer;
