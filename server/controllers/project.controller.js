const Project = require('../models/Project');
const crudFactory = require('./crudFactory');
const asyncHandler = require('../utils/asyncHandler');

const base = crudFactory(Project, {
  publicFilter: (req) => (req.admin ? {} : { status: 'published' }),
});

// Public: supports ?category=AI/ML and ?featured=true
const getAll = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { status: 'published' };
  if (req.query.category && req.query.category !== 'All') filter.category = req.query.category;
  if (req.query.featured) filter.featured = req.query.featured === 'true';
  const projects = await Project.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, count: projects.length, data: projects });
});

module.exports = { ...base, getAll };
