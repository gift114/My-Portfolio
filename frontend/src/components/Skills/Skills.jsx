import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSkills } from '../../utils/api';
import './Skills.css';

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
  tools: 'Tools',
  other: 'Other',
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then((res) => setSkills(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Skills & Technologies</h2>
        </motion.div>

        {loading ? (
          <div className="skills_loading">Loading skills...</div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="skills_empty">
            <p>No skills yet. Add some via the admin dashboard.</p>
          </div>
        ) : (
          <div className="skills_groups">
            {Object.entries(grouped).map(([category, items], groupIndex) => (
              <motion.div
                key={category}
                className="skills_group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              >
                <h3 className="skills_group-title">{CATEGORY_LABELS[category] || category}</h3>
                <div className="skills_list">
                  {items.map((skill, i) => (
                    <motion.div
                      key={skill._id}
                      className="skill-item"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <div className="skill-item_header">
                        <span className="skill-item_name">{skill.name}</span>
                        <span className="skill-item_level">{skill.level}%</span>
                      </div>
                      <div className="skill-item_bar">
                        <motion.div
                          className="skill-item_fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.05 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
