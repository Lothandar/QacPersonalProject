const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('winner', {
        matchID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        winnerID: {
            type: DataTypes.INTEGER,
            validate: {
                
            }
        }
    }, {
        timestamps: false,
        tableName: "winner"
    });
};