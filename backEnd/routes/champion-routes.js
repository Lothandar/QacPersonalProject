const express = require('express');
const models = require('../models');
const Sequelize = require('Sequelize')
const router = express.Router();

router.get('/all', async (req, res) => {
    const result = await models.Champion.findAll();
    res.send(result);
});
router.get('/shame', async (req, res) => {
    const result = await models.Champion.findAll({
        include: [{
            model: models.Player,
            where: {
                isBanned: 1
            }
        }],
        group: ['Champion']
        });
    res.send(result);
});

router.get('/hallOfFame', async (req,res) => {
    const result = await models.Champion.findAll({
        order: [['defences', 'DESC']],
        limit: 10
    });
    res.send(result);
});

router.get('/notTrueChampion', async (req, res) => {
    const result = await models.Champion.findAll({
        include: [{
            model: models.SevenBalled,
            where: {
                gotSevenBalled : Sequelize.col('Champion.Champion')
            }
        }]
    });
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const [first = null] = await models.Champion.findAll({ where: { id: req.params.id } });
    if (first) {
        res.send(first);
    } else {
        res.status(404).send({ message: 'Champion not found for index ' + req.params.id });
    }
});

router.post('/create', async (req, res) => {

    await models.Champion.create(req.body);
    res.send();

});

router.post('/update?nextChall?defences?id', async (req, res) => {
    await models.Champion.update({
        nextChallenger : req.body.nextChallenger,
        defences : req.body.defences
      }, {
        where: {
          id : req.body.id
          }
        }
      );
});

module.exports = router;
