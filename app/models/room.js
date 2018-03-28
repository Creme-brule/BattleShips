module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define("Room", {
        turns: {
            type: DataType.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        height: DataType.INTEGER,
        width: DataType.INTEGER,
        gameover: {
            type: DataType.BOOLEAN,
            defaultValue: false,
        },
        player1_id: DataType.INTEGER,
        player2_id: DataType.INTEGER,
        player1x: DataType.INTEGER,
        player1y: DataType.INTEGER,
        player2x: DataType.INTEGER,
        player2y: DataType.INTEGER,

    });
    return Room;
}