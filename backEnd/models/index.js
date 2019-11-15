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
const Winner = sequelize.import(__dirname + '/winner-model');
const Matches = sequelize.import(__dirname + '/comingmatch-model');
const SevenBalled = sequelize.import(__dirname + '/sevenballed-model');
const MatchPlayer = sequelize.import(__dirname + '/matchplayer-model');
const Champion = sequelize.import(__dirname + '/poolchamp-model');

SevenBalled.belongsTo(Player, {foreignKey: 'gotSevenBalled'});
SevenBalled.belongsTo(Player, {foreignKey: 'sevenBaller'});


Player.belongsToMany(Matches, {through: MatchPlayer, foreignKey: 'playerID'});
Matches.belongsToMany(Player, {through: MatchPlayer, foreignKey: 'matchID'});
MatchPlayer.hasOne(Matches);
MatchPlayer.hasOne(Player);

Player.belongsToMany(Matches, {through: Winner, foreignKey: 'winnerID'});
Matches.belongsToMany(Player, {through: Winner, foreignKey: 'matchID'});
MatchPlayer.hasOne(Matches);
MatchPlayer.hasOne(Player);


Champion.belongsTo(Player, {foreignKey: 'nextChallenger'});
Champion.belongsTo(Player, {foreignKey: 'Champion'});




 sequelize.sync({force: true}) //remove force true
  .then(() => {
   console.log(`Database & tables created!`)
  });


  module.exports = {
    Player,
    Matches,
    Champion,
    SevenBalled,
    MatchPlayer
  }

