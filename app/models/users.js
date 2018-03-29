
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

        email: { 
            type:DataTypes.STRING,
            validate: {
                isEmail:true
            }
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

        user_wins: DataTypes.INTEGER,
        user_loss: DataTypes.INTEGER,
        user_inGame: DataTypes.BOOLEAN,
        
 
 
    });
    User.associate = function(models) {
        models.User.belongsTo(models.Room);
    }
    return User;
 
}