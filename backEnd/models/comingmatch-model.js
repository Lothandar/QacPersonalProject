const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comingmatches', {
    matchID: {
        type: DataTypes.INTEGER,
        primaryKey: true 
    },
    matchType: {
        type: DataTypes.ENUM('Casual Normal', 'Ranked Normal', 'FOR THE GLORY OF THE CHAMPION','Reverse Pool|looP esreveR','Custom','Killer','Baby Pool', 'doubles'),
        require: true,
        allowNull: false
    },
    isPlayed: {
        type: DataTypes.BOOLEAN,
        require: true,
        allowNull: false,
        defaultValue: false
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['player1', 'player2']
        }
    ]
});
};