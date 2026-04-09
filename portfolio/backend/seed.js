require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Experience = require('./models/Experience');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // Clear existing
  await Promise.all([Project.deleteMany(), Skill.deleteMany(), Experience.deleteMany()]);
  console.log('🗑️  Cleared existing data');

  // Seed Projects
  await Project.insertMany([
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack online store with product listings, cart, checkout, and order management.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      category: 'fullstack',
      featured: true,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      order: 1,
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates, drag-and-drop boards, and team collaboration.',
      techStack: ['React', 'Express', 'Socket.io', 'MongoDB'],
      category: 'fullstack',
      featured: true,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      order: 2,
    },
    {
      title: 'REST API Backend',
      description: 'Scalable REST API with authentication, rate limiting, caching, and comprehensive documentation.',
      techStack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Redis'],
      category: 'backend',
      featured: false,
      githubUrl: 'https://github.com',
      order: 3,
    },
  ]);
  console.log('✅ Projects seeded');

  // Seed Skills
  await Skill.insertMany([
    { name: 'React.js', category: 'frontend', level: 92, order: 1 },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 95, order: 2 },
    { name: 'HTML & CSS', category: 'frontend', level: 90, order: 3 },
    { name: 'Tailwind CSS', category: 'frontend', level: 88, order: 4 },
    { name: 'Node.js', category: 'backend', level: 88, order: 1 },
    { name: 'Express.js', category: 'backend', level: 90, order: 2 },
    { name: 'REST APIs', category: 'backend', level: 92, order: 3 },
    { name: 'JWT & Auth', category: 'backend', level: 85, order: 4 },
    { name: 'MongoDB', category: 'database', level: 87, order: 1 },
    { name: 'Mongoose ODM', category: 'database', level: 85, order: 2 },
    { name: 'PostgreSQL', category: 'database', level: 72, order: 3 },
    { name: 'Git & GitHub', category: 'tools', level: 90, order: 1 },
    { name: 'Docker', category: 'devops', level: 70, order: 1 },
    { name: 'AWS Basics', category: 'devops', level: 65, order: 2 },
  ]);
  console.log('✅ Skills seeded');

  // Seed Experience
  await Experience.insertMany([
    {
      role: 'Full Stack Developer',
      company: 'Tech Startup',
      location: 'Remote',
      startDate: new Date('2022-06-01'),
      current: true,
      description: 'Building and maintaining full-stack web applications using React and Node.js. Leading frontend architecture decisions and collaborating with cross-functional teams.',
      achievements: [
        'Reduced page load time by 45% through code splitting and lazy loading',
        'Built a real-time notification system serving 10,000+ users',
        'Mentored 2 junior developers',
      ],
      techUsed: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      order: 1,
    },
    {
      role: 'Junior Web Developer',
      company: 'Digital Agency',
      location: 'Lagos, Nigeria',
      startDate: new Date('2020-09-01'),
      endDate: new Date('2022-05-31'),
      current: false,
      description: 'Developed client websites and web applications, working closely with designers to implement pixel-perfect UIs.',
      achievements: [
        'Delivered 12+ client projects on time',
        'Introduced component-based architecture reducing development time by 30%',
      ],
      techUsed: ['JavaScript', 'React', 'PHP', 'MySQL', 'WordPress'],
      order: 2,
    },
  ]);
  console.log('✅ Experience seeded');

  console.log('\n🎉 Seed complete! Start your server and visit the portfolio.');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
