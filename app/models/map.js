module.exports = function(sequelize, DataTypes) {
    var Map = sequelize.define("Map", {
        size: DataTypes.INTEGER,
        shrinkRate: DataTypes.INTEGER,
        powerUp: DataTypes.INTEGER,
        shape: DataTypes.CHAR
    });
  
    return Map;
  }
  
  