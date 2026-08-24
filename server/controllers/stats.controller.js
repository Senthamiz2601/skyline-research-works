const asyncHandler = require('../utils/asyncHandler');
const Project = require('../models/Project');
const Article = require('../models/Article');
const Internship = require('../models/Internship');
const Testimonial = require('../models/Testimonial');
const Enquiry = require('../models/Enquiry');

// GET /api/stats/dashboard — admin-only summary counts
const dashboard = asyncHandler(async (req, res) => {
  const [projects, articles, internships, testimonials, enquiries] = await Promise.all([
    Project.countDocuments(),
    Article.countDocuments(),
    Internship.countDocuments(),
    Testimonial.countDocuments(),
    Enquiry.countDocuments(),
  ]);
  res.json({
    success: true,
    data: { projects, articles, internships, testimonials, enquiries },
  });
});

module.exports = { dashboard };
