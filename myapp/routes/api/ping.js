const express = require('express');
const router = express.Router();

// Get all members
router.get('/', (req, res) => {
    console.log(`got ping  ${JSON.stringify(req)} `);

    res.json({hello:'world'});
});

module.exports = router
