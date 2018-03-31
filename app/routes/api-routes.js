var authController = require("../controllers/authcontrollers.js");
var db = require("../models");
var test = {
<<<<<<< HEAD
    turns: 1,
    height: 5,
    width: 5,
    playerx: 3,
    playery: 2,
    moves: ["3,1", "4,2", "3,3", "2,2"]
    //[up, right, down, left]
}
=======
  turns: 1,
  height: 5,
  width: 5,
  player1x: 3,
  player1y: 2
};
//TODO: FIND OUT WHY INSTEAD OF RES.RENDER YOU MUST DO REDIRECT FROM AJAX
>>>>>>> develop
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
  //create a new room
  app.post("/api/new", isLoggedIn, function(req, res) {
    starting = [[0, 0], [0, 4], [4, 0], [4, 4]];
    var rando = Math.floor(Math.random() * starting.length);
    var player1Cords = starting[rando];
    starting.splice(rando, 1);
    var player2Cords = starting[Math.floor(Math.random() * starting.length)];
    var player1Id = req.body.player1Id;
    db.Room.create({
      turns: 1,
      height: 5,
      width: 5,
      gameover: false,
      player1x: player1Cords[0],
      player1y: player1Cords[1],
      player2x: player2Cords[0],
      player2y: player2Cords[1],
      player1_id: player1Id
    }).then(function(results) { 
      db.user
        .update({ RoomId: results.id }, { where: { id: player1Id } })
        .then(function(result) {
          console.log("\n room created \n");
          res.json(results.id);
        });
    });
  });
  //join a room
  app.put("/api/room", isLoggedIn, function(req, res) {
      console.log("\n\n\nblehbleh\n\n\n");
    db.Room.update(
      {
        player2_id:req.body.joiner
      },
      {
        where: {
          id: req.body.roomid
        }
      }
    ).then(function(data){
        console.log(data);
        res.json(data);
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
