const express = require('express');
const router = express.Router();
// Members API Routes
router.use('/members', require('./api/members'));
router.use('/tasks', require('./api/tasks'));
router.use('/ping', require('./api/ping'));

module.exports = router;

