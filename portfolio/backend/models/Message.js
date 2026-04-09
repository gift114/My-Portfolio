const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    subject: { type: String, default: 'Portfolio Inquiry' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    ipAddress: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
