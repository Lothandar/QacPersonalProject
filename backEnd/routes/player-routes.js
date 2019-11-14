const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/all', async (_req, res) => {
    const result = await models.Player.findAll();
    res.send(result);
});

router.get('/', async (_req, res) => {
    const result = await models.Player.findAll({
        where: {isBanned : 0 } } );
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

router.post('/update', async (req, res) => {
    await models.Player.update({
        playerName : req.body.playerName,
        photo : req.body.photo
      }, {
        where: {
          playerID : req.body.id
          }
        }
      );
});
router.post('/ban/:id', async (req, res) =>{
    await models.Player.update({
        isBanned : 1,
      }, {
        where: {
          playerID : req.params.id
          }
        }
      );
});

router.delete('/:index',async (req, res) => {
    await models.Player.destroy({
        where: {
            playerID : req.params.index
        }
    });
});

module.exports = router;
