const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/testimonial.controller');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create); // public can submit; starts as "pending" until admin approves
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
