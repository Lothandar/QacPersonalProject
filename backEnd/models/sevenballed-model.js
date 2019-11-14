const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('sevenballed', {
        photoProof: {
            type: DataTypes.STRING
        },
        poem: {
            type: DataTypes.STRING
        }
}, {
    timestamps: false
});
};;