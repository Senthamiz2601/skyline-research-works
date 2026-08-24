const Service = require('../models/Service');
const crudFactory = require('./crudFactory');
const asyncHandler = require('../utils/asyncHandler');

const base = crudFactory(Service, {
  publicFilter: (req) => (req.admin ? {} : { status: 'active' }),
});

const getAll = asyncHandler(async (req, res) => {
  const filter = req.admin ? {} : { status: 'active' };
  const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
  res.json({ success: true, count: services.length, data: services });
});

module.exports = { ...base, getAll };
