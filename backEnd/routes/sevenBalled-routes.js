const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/all', async (_req, res) => {
    const result = await models.SevenBalled.findAll();
    res.send(result);
});

router.get('/:index', async (req, res) => {
    const [first = null] = await models.SevenBalled.findAll({ where: { id: req.params.index } });
    if (first) {
        res.send(first);
    } else {
        res.status(404).send({ message: 'Seven Balled not found for index ' + req.params.index });
    }
});
router.get('/n/:name', async (req, res) => {
    const [first = null] = await models.SevenBalled.findAll({ where: { id: req.params.name } });
    if (first) {
        res.send(first);
    } else {
        res.status(404).send({ message: 'SevenBalled not found for index ' + req.params.name });
    }
});
router.post('/:id', async (req, res) =>{
    await models.SevenBalled.update({
        photo : req.params.photo,
      }, {
        where: {
            id : req.params.id
          }
        }
      );
});
module.exports = router;
