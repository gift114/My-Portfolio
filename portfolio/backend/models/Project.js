const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    longDescription: { type: String },
    techStack: [{ type: String }],
    image: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ['fullstack', 'frontend', 'backend', 'mobile', 'other'],
      default: 'fullstack',
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
