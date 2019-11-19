const express = require('express');
const models = require('../models');
const Sequelize = require('sequelize');
const router = express.Router();

router.get('/all', async (req, res) => {
    const result = await models.Matches.findAll({
        include: [{
            model: models.Player
        },
        {
            model: models.Winner
        }]
    });
    res.send(result);
});

router.get('/not-played', async (req, res) => {
    const result = await models.Matches.findAll({
        include: [{
            model: models.Player
        }],
        where: {
            isPlayed: false
        }
    });
    res.send(result);
});

router.get('/:id', async (req, res) => {
    const result = await models.Matches.findAll({
        where:{
            matchID: req.params.id
        },
        include: [{
            model: models.MatchPlayer,
            where:{
                matchID: req.params.id
            }
        },
        {
            model: models.Winner,
            where:{
                matchID: req.params.id
            }
        }
    ]
    });
    res.send(result);
});

router.post('/create', async (req, res) => {


    if(req.body.match.type == "double"){
        if(req.body.players.length !=4){
            console.log("the amount of player doesn't match the match type");
        }
        else{
            await models.Matches.create(req.body.match);
            for(let player in req.body.players){
                console.log(player);
                await models.MatchPlayer.create(req.body.players[player]);
            }
        }
    }
    else if(req.body.match.type == "killer"){
        if(req.body.players.length <=3){
           console.log("the amount of player doesn't match the match type");
        }        
        else{
            await models.Matches.create(req.body.match);
            for(let player in req.body.players){
                console.log(player);
                await models.MatchPlayer.create(req.body.players[player]);
            }
        }
    }
    else{
        if(req.body.players.length !=2){
            //err
            console.log("the amount of player doesn't match the match type");
        }
        else{
            await models.Matches.create(req.body.match);
            for(let player in req.body.players){
                console.log(player);
                await models.MatchPlayer.create(req.body.players[player]);
            }
            
        }
    }
    res.send();
});
router.post('/addPlayer/:id/:playerID', async(req, res) =>{
    await models.MatchPlayer.create({matchID: req.params.id, playerID: req.params.playerID})
});

router.post('/update/:id/:previous/:new', async (req, res) => {
    await models.MatchPlayer.update({
        playerID : req.params.new        
      }, {
        where: {
          playerID : req.params.previous,
          matchID : req.params.id
          }
        }
      );
});

router.post('/play/:id', async (req, res) => {
    await models.Matches.update({
        isPlayed : true        
      }, {
        where: {
          matchID : req.params.id
          }
        }
      );
});
router.delete('/:id',async (req, res) => {
    if (models.Matches.findAll({
        where: {
            matchID: req.params.id
        }
    }));

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
