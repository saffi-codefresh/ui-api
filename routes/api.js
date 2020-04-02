const express = require('express');
const router = express.Router();
// Members API Routes
router.use('/members', require('./api/members'));
router.use('/tasks', require('./api/tasks'));

module.exports = router;

