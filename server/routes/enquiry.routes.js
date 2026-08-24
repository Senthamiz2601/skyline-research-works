const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/enquiry.controller');

router.post('/', ctrl.create); // public
router.get('/', protect, ctrl.getAll);
router.patch('/:id/status', protect, ctrl.updateStatus);
router.delete('/:id', protect, ctrl.remove);

module.exports = router;
