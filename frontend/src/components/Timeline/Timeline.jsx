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
          <div className="timeline__loading">Loading experience...</div>
        ) : experiences.length === 0 ? (
          <div className="timeline__empty">
            <p>No experience entries yet. Add some via the admin dashboard.</p>
          </div>
        ) : (
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp._id}
                className="timeline__item"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="timeline__marker">
                  <div className="timeline__dot" />
                  {index < experiences.length - 1 && <div className="timeline__line" />}
                </div>

                <div className="timeline__content">
                  <div className="timeline__header">
                    <div>
                      <h3 className="timeline__role">{exp.role}</h3>
                      <div className="timeline__company">
                        {exp.company}
                        {exp.location && <span className="timeline__location"> · {exp.location}</span>}
                      </div>
                    </div>
                    <div className="timeline__dates">
                      <span className={exp.current ? 'timeline__badge-current' : ''}>
                        {exp.current ? 'Current' : ''}
                      </span>
                      <span className="timeline__period">
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>

                  <p className="timeline__desc">{exp.description}</p>

                  {exp.achievements?.length > 0 && (
                    <ul className="timeline__achievements">
                      {exp.achievements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {exp.techUsed?.length > 0 && (
                    <div className="timeline__tech">
                      {exp.techUsed.map((tech) => (
                        <span key={tech} className="timeline__tech-tag">{tech}</span>
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
