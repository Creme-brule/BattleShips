module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        user_name: DataTypes.STRING,
        user_password: DataTypes.STRING,
        user_wins: DataTypes.INTEGER,
        user_loss: DataTypes.INTEGER,
        user_inGame: DataTypes.BOOLEAN,
    });
    User.associate = function(models) {
        models.User.belongsTo(models.Room);
    }
    return User;
}