var authController = require("../controllers/authcontrollers.js");
var db = require("../models");
module.exports = function(app, passport) {

    app.get("/api/:map", function(req, res) {
        var mapId = req.params.map;
        if (mapId) {
            db.Room.findOne({
                where: {
                    id: mapId
                }
            }).then(function(dbRoom) {
                res.json(dbRoom)        
            });
        }
    });
//   app.get("/signup", authController.signup);
//   app.get("/dashboard", isLoggedIn, authController.dashboard);
//   app.get("/signin", authController.signin);
//   app.get("/logout", authController.logout);

//   app.post(
//     "/signup",
//     passport.authenticate("local-signup", {
//       successRedirect: "/dashboard",

//       failureRedirect: "/signup"
//     })
//   );

//   app.post(
//     "/signin",
//     passport.authenticate("local-signin", {
//       successRedirect: "/dashboard",

//       failureRedirect: "/signin"
//     })
//   );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }



};