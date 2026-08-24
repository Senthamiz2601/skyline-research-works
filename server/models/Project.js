const mongoose = require('mongoose');
const slugify = require('slugify');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    slug: { type: String, unique: true, lowercase: true },
    category: {
      type: String,
      required: true,
      enum: ['AI/ML', 'Web Development', 'Data Science', 'IoT', 'Blockchain'],
    },
    description: { type: String, required: true },
    overview: { type: String, default: '' },
    problem: { type: String, default: '' },
    solution: { type: String, default: '' },
    technologies: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    outcome: { type: String, default: '' },
    image: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
);

projectSchema.pre('validate', function generateSlug(next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

projectSchema.index({ category: 1, status: 1 });

module.exports = mongoose.model('Project', projectSchema);
