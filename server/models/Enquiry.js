const mongoose = require('mongoose');
const validator = require('validator');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Full name is required'], trim: true },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, 'Enter a valid email address'],
    },
    phone: { type: String, required: [true, 'Phone / WhatsApp number is required'], trim: true },
    service: {
      type: String,
      required: true,
      enum: [
        'Research Guidance',
        'Project Assistance',
        'Publication Support',
        'Internship',
        'Documentation Support',
        'Career / Technical Guidance',
        'Other',
      ],
    },
    message: { type: String, required: [true, 'Message is required'], minlength: 10, maxlength: 2000 },
    status: { type: String, enum: ['new', 'contacted', 'completed'], default: 'new' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
