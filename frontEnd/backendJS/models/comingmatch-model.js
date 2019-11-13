const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comingmatches', {
    player1: {
        type: Sequelize.INTEGER,
        primaryKey: true 
    },
    player2: {
        type: Sequelize.INTEGER,
        primaryKey: true 
    }
}, {
    timestamps: false
});
};