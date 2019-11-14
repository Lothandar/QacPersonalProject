const express = require('express');
const models = require('../models');
const router = express.Router();

router.get('/all', async (_req, res) => {
    const result = await models.Matches.findAll();
    res.send(result);
});

router.post('/create', async (req, res) => {

    await models.Matches.create(req.body);
    res.send();

});

router.post('/update', async (req, res) => {
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
router.delete('/clear', async (req, res) => {
    await models.Matches.destroy();
});

router.delete('/',async (req, res) => {
    await models.Matches.destroy({
        where: {
            player1 : req.query.player1,
            player2: req.query.player2
        }
    });
});

module.exports = router;
