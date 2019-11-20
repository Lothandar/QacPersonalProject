module.exports = (sequelize, DataTypes) => {
    return sequelize.define('poolplayer', {
    playerID :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    playerName: {
        type: DataTypes.STRING,
        //allowNull : false,
        required: true
    },
    Elo: {
        type: DataTypes.INTEGER,
        allowNull : false,
        required: true,
        defaultValue: 1000
    },
    Photo: {
        type: DataTypes.STRING
    },
    isBanned: {
        type: DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false
    }
}, {
    timestamps: false,
    tableName: "poolplayer"
});
};