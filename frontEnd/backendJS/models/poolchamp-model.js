const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('poolchamp', {
    defences: {
        type: Sequelize.TINYINT(4),
        required: true,
        allowNull: false,
        default: 0
    },
    nextChallenger: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});
};