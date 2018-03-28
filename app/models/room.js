module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define("Room", {
        turns: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        height: DataTypes.INTEGER,
        width: DataTypes.INTEGER,
        gameover: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        player1_id: DataTypes.INTEGER,
        player2_id: DataTypes.INTEGER,
        player1x: DataTypes.INTEGER,
        player1y: DataTypes.INTEGER,
        player2x: DataTypes.INTEGER,
        player2y: DataTypes.INTEGER,

    });
    return Room;
}