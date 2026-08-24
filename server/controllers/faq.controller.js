const FAQ = require('../models/FAQ');
const crudFactory = require('./crudFactory');
const asyncHandler = require('../utils/asyncHandler');

const base = crudFactory(FAQ, {
  publicFilter: (req) => (req.admin ? {} : { status: 'active' }),
});

const getAll = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { status: 'active' };
  const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: 1 });
  res.json({ success: true, count: faqs.length, data: faqs });
});

module.exports = { ...base, getAll };
