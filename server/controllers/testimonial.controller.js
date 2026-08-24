const Testimonial = require('../models/Testimonial');
const crudFactory = require('./crudFactory');
const asyncHandler = require('../utils/asyncHandler');

const base = crudFactory(Testimonial, {
  publicFilter: (req) => (req.admin ? {} : { status: 'approved' }),
});

const getAll = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { status: 'approved' };
  const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: testimonials.length, data: testimonials });
});

module.exports = { ...base, getAll };
