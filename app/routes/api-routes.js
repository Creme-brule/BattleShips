var authController = require("../controllers/authcontrollers.js");
var db = require("../models");
var op = db.Sequelize.Op;
var test = {
  turns: 1,
  height: 5,
  width: 5,
  playerx: 4,
  playery: 3
};
module.exports = function(app, passport) {
  app.get("/api/:userId", isLoggedIn, function(req, res) {
    var userId = req.params.userId;
      db.Room.findOne({
        where: {
          gameover: false,
        [op.or]: [
            { player1_id: userId },
            { player2_id: userId }
            ]
        }
      }).then(function(dbRoom) {
          var response = {
              turns: dbRoom.turns,
              height: dbRoom.height,
              width: dbRoom.width,
          }
          if (userId == dbRoom.player1_id) {
                response["playerx"] = dbRoom.player1x;
                response["playery"] = dbRoom.player1y;
          }
          else if (userId == dbRoom.player2_id) {
            response["playerx"] = dbRoom.player2x;
            response["playery"] = dbRoom.player2y;
          }
        res.json(response);
      });
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
      player_turn: player1Id,
      player1x: player1Cords[0],
      player1y: player1Cords[1],
      player2x: player2Cords[0],
      player2y: player2Cords[1],
      player1_id: player1Id
    }).then(function(results) {
      db.user
        .update(
          {
            RoomId: results.id,
            playerx: player1Cords[0],
            playery: player1Cords[1]
          },
          { where: { id: player1Id } }
        )
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
        player2_id: req.body.joiner
      },
      {
        returning: true,
        where: {
          id: req.body.roomid
        }
      }
    ).then(function(data) {
      console.log("\n\n\n\njoining");
      console.log(data);
      db.Room.findOne({
        where: {
          id: req.body.roomid
        }
      }).then(function(results) {
        console.log("JOIN RESULTS:"+results);
        db.user
          .update(
            {
              RoomId: results.id,
              playerx: results.player2x,
              playery: results.player2y
            },
            {
              where: {
                id: req.body.joiner
              }
            }
          )
          .then(function(response) {
            console.log("RESPONSE:"+response);
            res.json(results.id);
          });
      });
    });
  });

  app.get("/inGame/:userId", isLoggedIn, function(req, res) {
    db.Room.findOne({
      where: {
        gameover: false,
        [op.or]: [
          { player1_id: req.params.userId },
          { player2_id: req.params.userId }
        ]
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/signin");
  }
};
