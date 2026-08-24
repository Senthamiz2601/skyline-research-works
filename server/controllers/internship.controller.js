const Internship = require('../models/Internship');
const crudFactory = require('./crudFactory');
const asyncHandler = require('../utils/asyncHandler');

const base = crudFactory(Internship, {
  publicFilter: (req) => (req.admin ? {} : { status: 'open' }),
});

const getAll = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : {};
  if (req.query.domain) filter.domain = req.query.domain;
  const internships = await Internship.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: internships.length, data: internships });
});

module.exports = { ...base, getAll };
