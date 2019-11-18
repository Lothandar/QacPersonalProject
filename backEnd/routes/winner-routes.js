const express = require('express');
const models = require('../models');
const router = express.Router();

router.post('/create', async (req, res) => {
    await models.Winner.create(req.body);
    res.send();
});


module.exports = router;
