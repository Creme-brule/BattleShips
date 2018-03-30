var authController = require("../controllers/authcontrollers.js");
var db = require("../models");
var test = {
    turns: 1,
    height: 5,
    width: 5,
    player1x: 3,
    player1y: 2
}
module.exports = function(app, passport) {

    app.get("/api/:mapId", function(req, res) {
        var mapId = req.params.mapId;
        if (mapId) {
            db.Room.findOne({
                where: {
                    id: mapId
                }
            }).then(function(dbRoom) {
                res.json(test);        
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