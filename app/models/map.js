module.exports = function(sequelize, DataTypes) {
  var Map = sequelize.define("Map", {
      id: Sequelize.INTEGER,
      size: Sequelize.INTEGER,
      shrinkRate: Sequelize.INTEGER,
      powerUp: Sequelize.INTEGER,
      shape: Sequelize.CHAR
  });

  return Map;
}


