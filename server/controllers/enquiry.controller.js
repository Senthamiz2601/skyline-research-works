const Enquiry = require('../models/Enquiry');
const crudFactory = require('./crudFactory');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

const base = crudFactory(Enquiry);

// Public create — admin-only for list/update/delete (wired in routes)
const create = asyncHandler(async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.status(201).json({
    success: true,
    message: 'Thank you — your enquiry has been received. We will get back to you shortly.',
    data: { id: enquiry._id },
  });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['new', 'contacted', 'completed'].includes(status)) {
    throw new ApiError(400, 'Invalid status value');
  }
  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!enquiry) throw new ApiError(404, 'Enquiry not found');
  res.json({ success: true, data: enquiry });
});

module.exports = { ...base, create, updateStatus };
