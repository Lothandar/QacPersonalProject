const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/all', async (_req, res) => {
    const result = await models.Player.findAll();
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const [first = null] = await models.Player.findAll({ where: { id: req.params.id } });
    if (first) {
        res.send(first);
    } else {
        res.status(404).send({ message: 'Player not found for index ' + req.params.id });
    }
});

router.post('/create', async (req, res) => {

    await models.Player.create(req.body);
    res.send();

});

router.put('/:index', (req, res) => {
    res.send('Not implemented!');
});

router.delete('/:index', (req, res) => {
    res.send('Not implemented!');
});

module.exports = router;
