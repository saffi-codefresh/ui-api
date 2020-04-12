const express = require('express');
const router = express.Router();

// Get all members
router.get('/', (req, res) => res.json({hello:'world'}));
