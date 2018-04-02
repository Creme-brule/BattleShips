var authController = require("../controllers/authcontrollers.js");
var db = require("../models");

module.exports = function(app) {
  app.get("/map/:Id", isLoggedIn,function(req, res) {
    res.render("gameboard", {});
  });

  app.get("/win", isLoggedIn, function(req, res) {
    res.render("win", {});
  });

  app.get("/lose", isLoggedIn, function(req, res) {
    res.render("lose", {});
  })

  app.get("/dashboard/rooms", isLoggedIn,function(req, res) {
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

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }

};
