const express = require('express');
const router = express.Router();

// Get all members
router.get('/', (req, res) => {
    console.log(`got ping  ${JSON.stringify({params:req.params, baseUrl:req.baseUrl,  path:req.path })} `);

    res.json({hello:'world'});
});

module.exports = router
