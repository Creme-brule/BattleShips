var Sequelize = require ("sequelize");

var sequelize = require ("../config/connection.js");

    var Maps = sequelize.define("maps", {
      id: Sequelize.INTEGER,
      size: Sequelize.INTEGER,
      shrinkRate: Sequelize.INTEGER,
      powerUp: Sequelize.INTEGER,
      shape: Sequelize.CHAR
    });
  
module.exports = Maps;