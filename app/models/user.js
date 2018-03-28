module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    wins:
  });


  return Users;
};