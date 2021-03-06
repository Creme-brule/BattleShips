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
              player_turn: dbRoom.player_turn,
              waitFor2: false
          }
          if (dbRoom.turns == 0) {
              response.waitFor2 = true;
          }
          if (userId == dbRoom.player1_id) {
                response["player_id"] = dbRoom.player1_id;
                response["playerx"] = dbRoom.player1x;
                response["playery"] = dbRoom.player1y;
                response["player_attackx"] = dbRoom.player1_attackx;
                response["player_attacky"] = dbRoom.player1_attacky;
                response["player_attack_close"] = dbRoom.player1_attack_close;
                response["enemy_attackx"] = dbRoom.player2_attackx;
                response["enemy_attacky"] = dbRoom.player2_attacky;
          }
          else if (userId == dbRoom.player2_id) {
                response["player_id"] = dbRoom.player2_id;
                response["playerx"] = dbRoom.player2x;
                response["playery"] = dbRoom.player2y;
                response["player_attackx"] = dbRoom.player2_attackx;
                response["player_attacky"] = dbRoom.player2_attacky;
                response["player_attack_close"] = dbRoom.player2_attack_close;
                response["enemy_attackx"] = dbRoom.player1_attackx;
                response["enemy_attacky"] = dbRoom.player1_attacky;
          }
        res.json(response);
      });
  });

  app.get("/enemy/:RoomId/:UserId", isLoggedIn, function(req, res) {
      var room = req.params.RoomId;
      var user = req.params.UserId;
      db.user.findOne({
          where: {
              RoomId: room,
              id: {
                  [op.ne]: user
              }
          }
      }).then(function(enemy) {
          if (!enemy) {
              res.send(false);
          } else {
            res.send(enemy.username);
          }
      })
  });

  app.put("/api/turn", isLoggedIn, function(req, res) {
    var attack = req.body.attack.split(",");
    var move = req.body.move.split(",");
        db.Room.findOne({
            where: {
                player_turn: req.body.playerid,
                gameover: false
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
                        if (data.turns > 2 && attack[0] == data.player2x && attack[1] == data.player2y) {
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
                                    res.send("Win");
                                });
                            });
                        } else if (data.turns > 2 && (attack[0] == data.player2x || attack[1] == data.player2y)){
                            db.Room.update({
                                turns: db.Sequelize.literal("turns + 1"),
                                player_turn: data.player2_id,
                                player1_attackx: attack[0],
                                player1_attacky: attack[1],
                                player1_attack_close: true
                            },{
                                where: {
                                    id: data.id
                                }
                            });
                            res.end();
                        }else {
                            db.Room.update({
                                turns: db.Sequelize.literal("turns + 1"),
                                player_turn: data.player2_id,
                                player1_attackx: attack[0],
                                player1_attacky: attack[1],
                                player1_attack_close: false
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
                }else {
                    db.Room.update({
                        player2x: move[0],
                        player2y: move[1]
                    },{
                        where: {
                            id: data.id
                        }
                    }).then(function(results) {
                        if (data.turns > 2 && attack[0] == data.player1x && attack[1] == data.player1y) {
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
                                    res.send("Win");
                                });
                            });
                        } else if (data.turns > 2 && (attack[0] == data.player1x || attack[1] == data.player1y)){
                            db.Room.update({
                                turns: db.Sequelize.literal("turns + 1"),
                                player_turn: data.player1_id,
                                player2_attackx: attack[0],
                                player2_attacky: attack[1],
                                player2_attack_close: true
                            },{
                                where: {
                                    id: data.id
                                }
                            });
                            res.end();
                        } else {
                            db.Room.update({
                                turns: db.Sequelize.literal("turns + 1"),
                                player_turn: data.player1_id,
                                player2_attackx: attack[0],
                                player2_attacky: attack[1],
                                player2_attack_close: false
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
      turns: 0,
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
        player2_id: req.body.joiner,
        turns: 1
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
  //get leaderboard info
  app.get("/stats",isLoggedIn, function(req,res){
    db.sequelize.query(`
    SELECT *
    FROM users
    ORDER BY user_wins DESC
    LIMIT 3
    `).then(function(data){
      res.json(data);
    });
  })

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
