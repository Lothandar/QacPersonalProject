module.exports = (sequelize, DataTypes) => {
    return sequelize.define('poolplayer', {
    playerID :{
        type: DataTypes.INTEGER,
        primaryKey:true
    },
    playerName: {
        type: DataTypes.STRING,
        validate:{
        allowNull: false
        },
        required: true
    },
    Photo: {
        type: DataTypes.STRING
    },
    isBanned: {
        type: DataTypes.BOOLEAN,
        validate:{
            allowNull: false
        },
        defaultValue: false
    }
}, {
    timestamps: false
});
};