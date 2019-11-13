const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/all', async (_req, res) => {
    const result = await models.Item.findAll({
        include: [
            {
                model: models.Location
            }
        ]
    });
    res.send(result);
});

router.get('/:index', async (req, res) => {
    const [first = null] = await models.Item.findAll({ where: { id: req.params.index } });
    if (first) {
        res.send(first);
    } else {
        res.status(404).send({ message: 'Item not found for index ' + req.params.index });
    }
});

router.post('', async (req, res) => {
    try {
        await models.Item.create(req.body);
        res.send();
    } catch (exc) {
        next(exc);
    }
});

router.put('/:index', (req, res) => {
    res.send('Not implemented!');
});

router.delete('/:index', (req, res) => {
    res.send('Not implemented!');
});

module.exports = router;
