const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/all', async (req, res) => {
    const result = await models.Matches.findAll({
        include: [{
            model: MatchPlayer,
            where: { matchID: Sequelize.col('Matches.matchID') }
        }]
    })
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const result = await models.Matches.findAll({
        where:{
            matchID: req.params.id
        },
        include: [{
            model: MatchPlayer,
            where: { matchID: Sequelize.col('Matches.matchID') }
        }]
    })
    res.send(result);
});

router.post('/create', async (req, res) => {

    await models.Matches.create(req.body);
    res.send();

});

router.post('/update/:id/:player', async (req, res) => {
    await models.Matches.update({
        player1 : req.body.player2,
        player2 : req.body.player2
      }, {
        where: {
          player1 : req.body.previous1,
          player2 : req.body.previous2
          }
        }
      );
});
router.delete('/:id',async (req, res) => {
    await models.Matches.destroy({
        where: {
            matchID: req.params.id
        }
    });
    await models.MatchPlayer.destroy({
        where:{
            matchID: req.params.id
        }
    });
});

module.exports = router;
