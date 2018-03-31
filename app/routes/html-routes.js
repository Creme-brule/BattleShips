var db = require("../models");

module.exports = function(app) {
  app.get("/map/:Id", function(req, res) {
    res.render("gameboard", {});
  });

  app.get("/dashboard/rooms", function(req, res) {
    db.Room
      .findAll({
        where: {
          player2_id: null
        }
      })
      .then(function(data) {
        res.render("roomlist", { rooms:data });
      });
  });
};
