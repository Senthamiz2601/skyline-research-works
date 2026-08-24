const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { login, me } = require('../controllers/auth.controller');

router.post('/login', login);
router.get('/me', protect, me);

module.exports = router;
