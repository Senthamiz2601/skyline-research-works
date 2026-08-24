const mongoose = require('mongoose');
const slugify = require('slugify');

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    domain: {
      type: String,
      required: true,
      enum: ['Artificial Intelligence & Machine Learning', 'Full Stack Web Development', 'Python Development', 'Data Science', 'IoT'],
    },
    duration: { type: String, required: true }, // e.g. "8 weeks"
    technologies: [{ type: String, trim: true }],
    description: { type: String, required: true },
    features: [{ type: String, trim: true }],
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
  },
  { timestamps: true }
);

internshipSchema.pre('validate', function generateSlug(next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Internship', internshipSchema);
