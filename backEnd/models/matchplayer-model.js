const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('matchplayer', {
    matchID: {
        type: DataTypes.INTEGER,
        primaryKey: true 
    },
    playerID: {
        type: DataTypes.INTEGER,
        primaryKey: true 
    }
}, {
    timestamps: false
});
};