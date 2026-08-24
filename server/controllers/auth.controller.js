const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Admin = require('../models/Admin');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// POST /api/auth/login — no public registration endpoint by design (admins are seeded/created by an existing admin)
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, 'Email and password are required');

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = signToken(admin._id);
  res.json({
    success: true,
    token,
    admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  });
});

const me = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.admin });
});

module.exports = { login, me };
