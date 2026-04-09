import React from 'react';
import Hero from '../components/Hero/Hero';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Timeline from '../components/Timeline/Timeline';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;
