
module.exports = function(sequelize, DataTypes) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
 
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
 
        username: {
            type: DataTypes.TEXT
        },
 
        about: {
            type: DataTypes.TEXT
        },
 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
 
        last_login: {
            type: DataTypes.DATE
        },
 
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },

        user_wins: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        user_loss: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        user_inGame: DataTypes.BOOLEAN,
        playerx: DataTypes.INTEGER,
        playery: DataTypes.INTEGER
        
 
 
    });
    User.associate = function(models) {
        models.user.belongsTo(models.Room);
    }
    return User;
 
}