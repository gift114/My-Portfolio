import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="hero">
      {/* Background grid */}
      <div className="hero_grid" aria-hidden="true" />

      <div className="container hero_inner">
        <motion.div
          className="hero_content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero_badge">
            <span className="hero_badge-dot" />
            Available for work
          </div>

          <h1 className="hero_title">
            <span className="hero_title-line">Hi, I'm</span>
            <span className="hero_title-name">Abdulazeez Hibatullah</span>
            <span className="hero_title-role">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "React Developer",
                  2000,                 
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>

          <p className="hero_desc">
            I build end-to-end web applications — from pixel-perfect interfaces
            to robust APIs and scalable databases. Passionate about clean code
            and great user experiences.
          </p>

          <div className="hero_actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
          </div>

          <div className="hero_stack">
            {["React", "Node.js", "MongoDB", "Express", "REST APIs", "Git"].map(
              (tech) => (
                <span key={tech} className="hero_tag">
                  {tech}
                </span>
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          className="hero_visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero_code-card">
            <div className="hero_code-header">
              <span
                className="hero_code-dot"
                style={{ background: "#ff5f57" }}
              />
              <span
                className="hero_code-dot"
                style={{ background: "#febc2e" }}
              />
              <span
                className="hero_code-dot"
                style={{ background: "#28c840" }}
              />
              <span className="hero_code-filename">portfolio.js</span>
            </div>
            <pre className="hero_code-body">
              <code>{`const developer = {
  name: "Abdulazeez Hibatullah Ajoke",
  role: "Full Stack Dev",
  stack: [
    "React", "Node.js",
    "MongoDB", "Express"
  ],
  available: true,
  coffee: Infinity,
};

export default developer;`}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
