const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    feedback: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    image: { type: String, default: '' },
    status: { type: String, enum: ['pending', 'approved', 'hidden'], default: 'pending' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
