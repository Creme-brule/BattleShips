module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: DataTypes.STRING,
        user_password: Datatypes.STRING,
        user_wins: DataType.INTEGER,
        user_loss: DataType.INTERGER,
        user_inGame: BOOLEAN,
    });
    User.associate = function(models) {
        models.User.belongsTo(models.Room);
    }
    return User;
}