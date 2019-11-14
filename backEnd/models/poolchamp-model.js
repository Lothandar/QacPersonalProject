const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('poolchamp', {
    defences: {
        type: DataTypes.TINYINT(4),
        allowNull : false,
        required: true,
        defaultValue: 0
    },
    Champion: {
        type: DataTypes.INTEGER
    }
    ,
    nextChallenger: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    tableName: "poolchamp"
});
};