var turn = -1;
var load = true;
$(function () {
    var path = window.location.pathname.split("/").pop();
    $("#RoomInfo").append(`<h5 id="dashboard">ROOM ${path}</h5>`);
    doPoll();
    function doPoll(){
        console.log("poll");
        $.get("/api/"+localStorage.getItem("userId"), function (data) {
            console.log(data);
            if (data == "Game Over") {
                location.href = "/lose"
            }
        }).then(function (data) {
            var directions = ["LEFT", "UP", "STAY", "DOWN", "RIGHT"];
            if (data.turns > turn) {
                turn = data.turns;
                moves = [`${data.playerx - 1},${data.playery}`,`${data.playerx},${data.playery - 1}`,`${data.playerx},${data.playery + 1}`,`${data.playerx + 1},${data.playery}`];
                console.log("run");
                $("#game-board").empty();
                if (data.playerx == data.width -1) {
                    directions.splice(4,1);
                };
                if (data.playery == data.height -1) {
                    directions.splice(3,1);
                };
                if (data.playery == 0) {
                    directions.splice(1,1);
                };
                if (data.playerx == 0) {
                    directions.splice(0,1);
                };
                var count = 0;
                var $board = $("<div>");
                var $move = $("<div>");
                var $moveul = $("<ul>");
                for (var x = 0; x < data.width; x++) {
                    var $ul = $("<ul>");
                    for (var y = 0; y < data.height; y++) {
                        let coords = `${x},${y}`;
                        let $li = $("<li>");
                        let $btn = $("<button>");
                        if (x === parseInt(data.playerx) && y === parseInt(data.playery)) {
                            $li.append($("<div id='ship'><div>"));
                            let $movebtn = $("<button>");
                            let $moveli = $("<li>");
                            $moveli.addClass("moveli");
                            $movebtn.addClass("move-btn");
                            $movebtn.attr("title", coords);
                            $movebtn.data("coord", coords);
                            $moveli.append($movebtn);
                            $moveul.append($moveli);
                            $movebtn.text(directions[count]);
                            count++;
                        }
                        else {
                            $btn.addClass("board-btn");
                            $btn.data("coord", coords);
                            $btn.addClass("water");
                            $btn.attr("title", coords);
                            $li.append($btn);
                            if (x == data.enemy_attackx && y == data.enemy_attacky) {
                                $btn.addClass("enemy-attack");
                            }
                            if (data.player_attack_close && (x == data.player_attackx || y == data.player_attacky)){
                                $btn.addClass("attack-close");
                            }
                            if (moves.includes(coords)) {
                                let $movebtn = $("<button>");
                                let $moveli = $("<li>");
                                $btn.attr("id", directions[count]);   
                                $btn.addClass("move-spot");                     
                                $movebtn.addClass("move-btn");
                                $movebtn.addClass(directions[count]);
                                $movebtn.attr("title", coords);
                                $moveli.addClass("moveli");
                                $movebtn.data("coord", coords);
                                $movebtn.data("dir", directions[count]);
                                $moveli.append($movebtn);
                                $moveul.append($moveli);
                                $movebtn.text(directions[count]);
                                count++;
                            }
                        }
                        $ul.append($li);
                    }
                    $board.append($ul);
                    $move.append($moveul);
                    $board.append($move);
                }
                $("#game-board").append($board);
                if (data.player_id == data.player_turn) {
                    if (data.waitFor2) {
                        setTimeout(doPoll, 5000);
                        return $("#game-board").append($("<button id='turn'>WAITING FOR PLAYER 2!</button>")); 
                    }
                    $("#game-board").append($("<button id='submit'>SUBMIT MOVE</button>"));                    
                }
                else {
                    $("#game-board").append($("<button id='turn'>NOT YOUR TURN</button>"));
                    setTimeout(doPoll, 5000);
                }
            } else {
                setTimeout(doPoll, 5000);
            }
        }).always(function() { 
            if (load) {
                $.get(`/enemy/${path}/${localStorage.getItem("userId")}`, function (data) {
                    if (data){
                        $("#RoomInfo").append(`<h6 id="textStyle">OPPONENT: ${data}</h6>`);
                        load = false;
                    }
                });
            }
            setTimeout(doPoll, 60000) 
        });
    }
    $(document).on("click", ".board-btn", function (event) {
        console.log($(this).data("coord"));
        $(".board-btn").not(this).removeClass("attack");
        $(this).toggleClass("attack");
        event.preventDefault();
    });
    $(document).on("click", ".move-btn", function (event) {
        var spot = $(this).data("dir");
        $(".move-spot").not(this).removeClass("chosen-move");
        $(`#${spot}`).toggleClass("chosen-move");
        $(".move-btn").not(this).removeClass("move");
        $(this).toggleClass("move");
        event.preventDefault();
    });
    $(document).on("click", "#submit", function (event) {
        var attack = $(".attack").data("coord");
        var move = $(".move").data("coord");
        console.log(move + "//" + attack);
        if (attack == undefined || move == undefined){
            console.log("You must select a move and an attack");
            doPoll();
        } else {
            $.ajax({
                url: "/api/turn", 
                type: "PUT",
                data: {
                    attack: attack,
                    move: move,
                    playerid: localStorage.getItem("userId")
                }
            }).then(function(data){
                console.log("test" + data);
                if (data == "Win") {
                    location.href = "/win"
                }
                else {
                    doPoll();
                }
            });
        }
    });
});