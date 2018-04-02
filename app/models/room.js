module.exports = function(sequelize, DataTypes) {
    var Room = sequelize.define("Room", {
        turns: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        player_turn: DataTypes.INTEGER,
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
        player1_attackx: DataTypes.INTEGER,
        player1_attacky: DataTypes.INTEGER,
        player1_attack_close: DataTypes.BOOLEAN,
        player2_attackx: DataTypes.INTEGER,
        player2_attacky: DataTypes.INTEGER,
        player2_attack_close: DataTypes.BOOLEAN

    });
    return Room;
}