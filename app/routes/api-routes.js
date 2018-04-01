var authController = require("../controllers/authcontrollers.js");
var db = require("../models");
var op = db.Sequelize.Op;
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
          if(!dbRoom) return res.send("Game Over");
          var response = {
              turns: dbRoom.turns,
              height: dbRoom.height,
              width: dbRoom.width,
              player_turn: dbRoom.player_turn
          }
          if (userId == dbRoom.player1_id) {
                response["player_id"] = dbRoom.player1_id;
                response["playerx"] = dbRoom.player1x;
                response["playery"] = dbRoom.player1y;
          }
          else if (userId == dbRoom.player2_id) {
                response["player_id"] = dbRoom.player2_id;
                response["playerx"] = dbRoom.player2x;
                response["playery"] = dbRoom.player2y;
          }
        res.json(response);
      });
  });

  app.put("/api/turn", isLoggedIn, function(req, res) {
    var attack = req.body.attack.split(",");
    console.log(attack);
    var move = req.body.move.split(",");
    console.log(move);
        db.Room.findOne({
            where: {
                player_turn: req.body.playerid
            }
        }).then(function(data) {
            if (data.player1_id == data.player_turn) {
                if (move[0] == data.player2x && move[1] == data.player2y) {
                    starting = [[0, 0], [0, 4], [4, 0], [4, 4]];
                    var rando = Math.floor(Math.random() * starting.length);
                    var player1Cords = starting[rando];
                    starting.splice(rando, 1);
                    var player2Cords = starting[Math.floor(Math.random() * starting.length)];
                    db.Room.update({
                        player1x: player1Cords[0],
                        player1y: player1Cords[1],
                        player2x: player2Cords[0],
                        player2y: player2Cords[1],
                        player_turn: data.player2_id,
                        turns: db.Sequelize.literal("turns + 1")
                    },{
                        where: {
                            id: data.id
                        }
                    });
                    res.end();
                } else {
                    db.Room.update({
                        player1x: move[0],
                        player1y: move[1]
                    },{
                        where: {
                            id: data.id
                        }
                    }).then(function(results) {
                        if (attack[0] == data.player2x && attack[1] == data.player2y) {
                            db.Room.update({
                                gameover: true
                            },{
                                where: {
                                    id: data.id
                                }
                            }).then(function() {
                                db.user.update({
                                    user_wins: db.Sequelize.literal("user_wins + 1"),
                                    RoomId: null

                                },{
                                    where: {
                                        id: data.player1_id
                                    }
                                }).then(function() {
                                    db.user.update({
                                        user_loss: db.Sequelize.literal("user_loss + 1"),
                                        RoomId: null
                                    },{
                                        where: {
                                            id: data.player2_id
                                        }
                                    });
                                    res.end();
                                });
                            });
                        } else {
                            db.Room.update({
                                turns: db.Sequelize.literal("turns + 1"),
                                player_turn: data.player2_id
                            },{
                                where: { 
                                    id: data.id
                                }
                            });
                            res.end();
                        }
                    });
                }
            } else if (data.player2_id == data.player_turn) {
                if (move[0] == data.player1x && move[1] == data.player1y) {
                    starting = [[0, 0], [0, 4], [4, 0], [4, 4]];
                    var rando = Math.floor(Math.random() * starting.length);
                    var player1Cords = starting[rando];
                    starting.splice(rando, 1);
                    var player2Cords = starting[Math.floor(Math.random() * starting.length)];
                    db.Room.update({
                        player1x: player1Cords[0],
                        player1y: player1Cords[1],
                        player2x: player2Cords[0],
                        player2y: player2Cords[1],
                        player_turn: data.player1_id,
                        turns: db.Sequelize.literal("turns + 1")
                    },{
                        where: {
                            id: data.id
                        }
                    });
                    res.end();
                } else {
                    db.Room.update({
                        player2x: move[0],
                        player2y: move[1]
                    },{
                        where: {
                            id: data.id
                        }
                    }).then(function(results) {
                        if (attack[0] == data.player1x && attack[1] == data.player1y) {
                            db.Room.update({
                                gameover: true
                            },{
                                where: {
                                    id: data.id
                                }
                            }).then(function() {
                                db.user.update({
                                    user_wins: db.Sequelize.literal("user_wins + 1"),
                                    RoomId: null

                                },{
                                    where: {
                                        id: data.player2_id
                                    }
                                }).then(function() {
                                    db.user.update({
                                        user_loss: db.Sequelize.literal("user_loss + 1"),
                                        RoomId: null
                                    },{
                                        where: {
                                            id: data.player1_id
                                        }
                                    });
                                    res.end();
                                });
                            });
                        } else {
                            db.Room.update({
                                turns: db.Sequelize.literal("turns + 1"),
                                player_turn: data.player1_id
                            },{
                                where: { 
                                    id: data.id
                                }
                            });
                            res.end();
                        }
                    });
                }
            }

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
        console.log("JOIN RESULTS:"+ results);
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
