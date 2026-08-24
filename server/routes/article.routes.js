const express = require('express');

const router = express.Router();

const { protect } = require('../middleware/auth');
const ctrl = require('../controllers/article.controller');

router.get('/', ctrl.getAll);

router.get('/related/:slug', ctrl.getRelated);

router.get('/:id', ctrl.getOne);

router.post('/', protect, ctrl.create);

router.put('/:id', protect, ctrl.update);

router.delete('/:id', protect, ctrl.remove);

module.exports = router;