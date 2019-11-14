const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'pooldb', //database
    'root', //username
    'password' ,//password
    {
        host: 'localhost',
        dialect: 'mysql'
    });
sequelize
.authenticate()
.then(() => {
    console.log('connected');
})
.catch(err => {
    console.error('EVERYTHING IS ON FIRE', err);
});

const Player = sequelize.import(__dirname + '/player-model');
const Matches = sequelize.import(__dirname + '/comingmatch-model');
const MatchPlayer = sequelize.import(__dirname + '/matchplayer-model');
const Champion = sequelize.import(__dirname + '/poolchamp-model');
const SevenBalled = sequelize.import(__dirname + '/sevenballed-model');

SevenBalled.belongsTo(Player, {foreignKey: 'gotSevenBalled'});
SevenBalled.belongsTo(Player, {foreignKey: 'sevenBaller'});

MatchPlayer.belongsTo(Matches, {foreignKey: 'matchID'});
Matches.belongsTo(Player, {foreignKey: 'playerID'});


Champion.belongsTo(Player, {foreignKey: 'nextChallenger'});
Champion.belongsTo(Player, {foreignKey: 'Champion'});




// sequelize.sync() //remove force true
//   .then(() => {
//     console.log(`Database & tables created!`)
//   })


  module.exports = {
    Player,
    Matches,
    Champion,
    SevenBalled,
    MatchPlayer
  }

