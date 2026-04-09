import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import {
  getProjects, createProject, updateProject, deleteProject,
  getSkills, createSkill, deleteSkill,
  getExperience, createExperience, deleteExperience,
} from '../utils/api';
import './AdminDashboard.css';

const TABS = ['Projects', 'Skills', 'Experience'];

// ── Reusable confirm delete ──
const ConfirmDelete = ({ onConfirm, onCancel }) => (
  <div className="confirm-overlay">
    <div className="confirm-box">
      <p>Are you sure you want to delete this?</p>
      <div className="confirm-actions">
        <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
        <button className="btn" style={{ background: '#e24b4a', color: '#fff' }} onClick={onConfirm}>Delete</button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// PROJECTS TAB
// ─────────────────────────────────────────────
const ProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const blank = { title: '', description: '', techStack: '', liveUrl: '', githubUrl: '', category: 'fullstack', featured: false, image: '' };
  const [form, setForm] = useState(blank);

  const load = () => {
    setLoading(true);
    getProjects().then(r => setProjects(r.data.data)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => { setForm(blank); setEditing(null); setShowForm(true); };
  const openEdit = (p) => {
    setForm({ ...p, techStack: (p.techStack || []).join(', ') });
    setEditing(p._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean) };
    try {
      if (editing) {
        await updateProject(editing, payload);
        toast.success('Project updated!');
      } else {
        await createProject(payload);
        toast.success('Project created!');
      }
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast.success('Deleted.');
      setConfirmId(null);
      load();
    } catch {
      toast.error('Delete failed.');
    }
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h2 className="admin-tab__title">Projects <span className="admin-count">{projects.length}</span></h2>
        <button className="btn btn-primary" onClick={openCreate}>+ Add Project</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3 className="admin-form__title">{editing ? 'Edit Project' : 'New Project'}</h3>
          <div className="admin-form__grid">
            <div className="admin-field">
              <label>Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="My Awesome App" required />
            </div>
            <div className="admin-field">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['fullstack','frontend','backend','mobile','other'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label>Description *</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="What does this project do?" required />
          </div>
          <div className="admin-field">
            <label>Tech Stack (comma-separated)</label>
            <input value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="admin-form__grid">
            <div className="admin-field">
              <label>Live URL</label>
              <input value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://..." />
            </div>
            <div className="admin-field">
              <label>GitHub URL</label>
              <input value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/..." />
            </div>
          </div>
          <div className="admin-field">
            <label>Image URL</label>
            <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
          </div>
          <div className="admin-field admin-field--checkbox">
            <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
            <label htmlFor="featured">Mark as Featured</label>
          </div>
          <div className="admin-form__actions">
            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</button>
          </div>
        </form>
      )}

      {loading ? <p className="admin-loading">Loading...</p> : (
        <div className="admin-list">
          {projects.length === 0 && <p className="admin-empty">No projects yet. Add one above.</p>}
          {projects.map(p => (
            <div key={p._id} className="admin-item">
              {confirmId === p._id && (
                <ConfirmDelete onConfirm={() => handleDelete(p._id)} onCancel={() => setConfirmId(null)} />
              )}
              <div className="admin-item__info">
                <span className="admin-item__badge">{p.category}</span>
                {p.featured && <span className="admin-item__badge admin-item__badge--accent">Featured</span>}
                <span className="admin-item__title">{p.title}</span>
                <span className="admin-item__sub">{(p.techStack || []).slice(0, 4).join(' · ')}</span>
              </div>
              <div className="admin-item__actions">
                <button className="admin-btn-icon" onClick={() => openEdit(p)} title="Edit">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button className="admin-btn-icon admin-btn-icon--danger" onClick={() => setConfirmId(p._id)} title="Delete">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// SKILLS TAB
// ─────────────────────────────────────────────
const SkillsTab = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const blank = { name: '', category: 'frontend', level: 80 };
  const [form, setForm] = useState(blank);

  const load = () => {
    setLoading(true);
    getSkills().then(r => setSkills(r.data.data)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSkill(form);
      toast.success('Skill added!');
      setShowForm(false);
      setForm(blank);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add skill.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id);
      toast.success('Deleted.');
      setConfirmId(null);
      load();
    } catch {
      toast.error('Delete failed.');
    }
  };

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h2 className="admin-tab__title">Skills <span className="admin-count">{skills.length}</span></h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ Add Skill</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3 className="admin-form__title">New Skill</h3>
          <div className="admin-form__grid">
            <div className="admin-field">
              <label>Skill Name *</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="React.js" required />
            </div>
            <div className="admin-field">
              <label>Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['frontend','backend','database','devops','tools','other'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label>Proficiency Level: <strong>{form.level}%</strong></label>
            <input type="range" min="10" max="100" step="5" value={form.level} onChange={e => setForm({ ...form, level: Number(e.target.value) })} />
          </div>
          <div className="admin-form__actions">
            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Skill</button>
          </div>
        </form>
      )}

      {loading ? <p className="admin-loading">Loading...</p> : (
        <div className="admin-list">
          {skills.length === 0 && <p className="admin-empty">No skills yet. Add one above.</p>}
          {skills.map(s => (
            <div key={s._id} className="admin-item">
              {confirmId === s._id && (
                <ConfirmDelete onConfirm={() => handleDelete(s._id)} onCancel={() => setConfirmId(null)} />
              )}
              <div className="admin-item__info">
                <span className="admin-item__badge">{s.category}</span>
                <span className="admin-item__title">{s.name}</span>
                <span className="admin-item__sub">{s.level}%</span>
              </div>
              <div className="admin-item__actions">
                <button className="admin-btn-icon admin-btn-icon--danger" onClick={() => setConfirmId(s._id)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// EXPERIENCE TAB
// ─────────────────────────────────────────────
const ExperienceTab = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const blank = { role: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '', achievements: '', techUsed: '' };
  const [form, setForm] = useState(blank);

  const load = () => {
    setLoading(true);
    getExperience().then(r => setExperiences(r.data.data)).catch(console.error).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      achievements: form.achievements.split('\n').map(s => s.trim()).filter(Boolean),
      techUsed: form.techUsed.split(',').map(s => s.trim()).filter(Boolean),
      endDate: form.current ? null : form.endDate,
    };
    try {
      await createExperience(payload);
      toast.success('Experience added!');
      setShowForm(false);
      setForm(blank);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      toast.success('Deleted.');
      setConfirmId(null);
      load();
    } catch {
      toast.error('Delete failed.');
    }
  };

  const fmt = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';

  return (
    <div className="admin-tab">
      <div className="admin-tab__header">
        <h2 className="admin-tab__title">Experience <span className="admin-count">{experiences.length}</span></h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ Add Experience</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3 className="admin-form__title">New Experience</h3>
          <div className="admin-form__grid">
            <div className="admin-field">
              <label>Role / Title *</label>
              <input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Senior Developer" required />
            </div>
            <div className="admin-field">
              <label>Company *</label>
              <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Acme Inc." required />
            </div>
          </div>
          <div className="admin-form__grid">
            <div className="admin-field">
              <label>Location</label>
              <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Remote / City" />
            </div>
            <div className="admin-field">
              <label>Start Date *</label>
              <input type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
            </div>
          </div>
          <div className="admin-form__grid">
            <div className="admin-field admin-field--checkbox">
              <input type="checkbox" id="current" checked={form.current} onChange={e => setForm({ ...form, current: e.target.checked })} />
              <label htmlFor="current">Currently working here</label>
            </div>
            {!form.current && (
              <div className="admin-field">
                <label>End Date</label>
                <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} />
              </div>
            )}
          </div>
          <div className="admin-field">
            <label>Description *</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="What did you do?" required />
          </div>
          <div className="admin-field">
            <label>Key Achievements (one per line)</label>
            <textarea value={form.achievements} onChange={e => setForm({ ...form, achievements: e.target.value })} rows={3} placeholder="Led team of 5 engineers&#10;Improved performance by 40%" />
          </div>
          <div className="admin-field">
            <label>Technologies Used (comma-separated)</label>
            <input value={form.techUsed} onChange={e => setForm({ ...form, techUsed: e.target.value })} placeholder="React, Node.js, AWS" />
          </div>
          <div className="admin-form__actions">
            <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Experience</button>
          </div>
        </form>
      )}

      {loading ? <p className="admin-loading">Loading...</p> : (
        <div className="admin-list">
          {experiences.length === 0 && <p className="admin-empty">No experience yet. Add one above.</p>}
          {experiences.map(exp => (
            <div key={exp._id} className="admin-item">
              {confirmId === exp._id && (
                <ConfirmDelete onConfirm={() => handleDelete(exp._id)} onCancel={() => setConfirmId(null)} />
              )}
              <div className="admin-item__info">
                {exp.current && <span className="admin-item__badge admin-item__badge--accent">Current</span>}
                <span className="admin-item__title">{exp.role} @ {exp.company}</span>
                <span className="admin-item__sub">{fmt(exp.startDate)} — {exp.current ? 'Present' : fmt(exp.endDate)}</span>
              </div>
              <div className="admin-item__actions">
                <button className="admin-btn-icon admin-btn-icon--danger" onClick={() => setConfirmId(exp._id)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Projects');
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__logo">&lt;Admin /&gt;</span>
        </div>
        <nav className="admin-sidebar__nav">
          {TABS.map(tab => (
            <button
              key={tab}
              className={`admin-sidebar__link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <p className="admin-sidebar__user">{admin?.email}</p>
          <button className="admin-sidebar__logout" onClick={handleLogout}>Logout</button>
          <a href="/" className="admin-sidebar__back">← View Portfolio</a>
        </div>
      </aside>

      <main className="admin-main">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'Projects' && <ProjectsTab />}
          {activeTab === 'Skills' && <SkillsTab />}
          {activeTab === 'Experience' && <ExperienceTab />}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;