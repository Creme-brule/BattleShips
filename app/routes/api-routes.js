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

    app.post("/api/new", isLoggedIn,function(req,res) {
        db.Room.create({
            turns:1,
            height:5,
            width:5,
            gameover:false,
            player1x:0,
            player1y:0,
            player2x:1,
            player2y:1
        }).then(function(results){
        console.log("\n room created \n" );
        res.json(results);
        });
    });

    app.put("/api/new/:param?",isLoggedIn,function(req,res){
        db.Room.update({
            player1x:4,
            player1y:4
        },{
            where:{
                id:req.params.param
            }
        });
    });


  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }



};