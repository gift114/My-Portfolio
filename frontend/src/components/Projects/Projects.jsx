import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../../utils/api';
import './Projects.css';

const CATEGORIES = ['all', 'fullstack', 'frontend', 'backend', 'mobile'];

const ProjectCard = ({ project, index }) => (
  <motion.div
    className="project-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
  >
    {project.image && (
      <div className="project-card_img-wrap">
        <img src={project.image} alt={project.title} className="project-card_img" />
      </div>
    )}
    {!project.image && (
      <div className="project-card_img-placeholder">
        <span>{project.title.slice(0, 2).toUpperCase()}</span>
      </div>
    )}

    <div className="project-card_body">
      <div className="project-card_meta">
        <span className="project-card_category">{project.category}</span>
        {project.featured && <span className="project-card_featured">Featured</span>}
      </div>

      <h3 className="project-card_title">{project.title}</h3>
      <p className="project-card_desc">{project.description}</p>

      <div className="project-card_stack">
        {project.techStack?.slice(0, 5).map((tech) => (
          <span key={tech} className="project-card_tech">{tech}</span>
        ))}
      </div>

      <div className="project-card_links">
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-card_link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-card_link project-card_link--muted">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 016 0c2.3-1.5 3.3-1.2 3.3-1。2.7 １．６．２ ２．８ ０ ３．２．９．８ １．３ １．９ １．３ ３．２ ０ ４．６－２．８ ５．６－５．５ ５．９．５．４．９ １．２．９ ２．３ｖ３．３ｃ０ ／３／２／７／８／６Ａ１２ １２ ０ ００１２ ／３"/>
            </svg>
            Code
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Work</p>
          <h2 className="section-title">Featured Projects</h2>
        </motion.div>

        <div className="projects_filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`projects_filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="projects_loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="projects_skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="projects_empty">
            <p>No projects yet. Add some via the admin dashboard.</p>
          </div>
        ) : (
          <div className="projects_grid">
            {filtered.map((project, i) => (
              <ProjectCard key={project._id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
