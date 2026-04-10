import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getExperience } from '../../utils/api';
import './Timeline.css';

const formatDate = (date) => {
  if (!date) return 'Present';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const Timeline = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience()
      .then((res) => setExperiences(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section" id="experience">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Journey</p>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        {loading ? (
          <div className="timeline_loading">Loading experience...</div>
        ) : experiences.length === 0 ? (
          <div className="timeline_empty">
            <p>No experience entries yet. Add some via the admin dashboard.</p>
          </div>
        ) : (
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                className="timeline_item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="timeline_marker">
                  <div className="timeline_dot" />
                  {index < experiences.length - 1 && <div className="timeline_line" />}
                </div>

                <div className="timeline_content">
                  <div className="timeline_header">
                    <div>
                      <h3 className="timeline_role">{exp.role}</h3>
                      <div className="timeline_company">
                        {exp.company}
                        {exp.location && <span className="timeline_location"> · {exp.location}</span>}
                      </div>
                    </div>
                    <div className="timeline_dates">
                      <span className={exp.current ? 'timeline_badge-current' : ''}>
                        {exp.current ? 'Current' : ''}
                      </span>
                      <span className="timeline_period">
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>

                  <p className="timeline_desc">{exp.description}</p>

                  {exp.achievements?.length > 0 && (
                    <ul className="timeline_achievements">
                      {exp.achievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {exp.techUsed?.length > 0 && (
                    <div className="timeline_tech">
                      {exp.techUsed.map((tech) => (
                        <span key={tech} className="timeline_tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Timeline;
