var directions = ["Left", "Up", "Stay", "Down", "Right"]
var turn = 0;
$(function () {
    doPoll();
    function doPoll(){
        console.log("poll");
        $.get("/api/1", function (data) {
            console.log(data);
        }).then(function (data) {
            if (data.turns > turn) {
                turn = data.turns;
                moves = [`${data.playerx - 1},${data.playery}`,`${data.playerx},${data.playery - 1}`,`${data.playerx},${data.playery + 1}`,`${data.playerx + 1},${data.playery}`];
                console.log("run");
                $("#game-board").empty();
                switch (data.playerx) {
                    case 0:
                        moves.splice(1, 1);
                        break;
                    case data.width:
                        moves.splice(3, 1);
                }
                switch (data.playery) {
                    case 0:
                        moves.splice(0, 1);
                        break;
                    case data.width:
                        moves.splice(4, 1);
                }
                var count = 0;
                var $board = $("<div>");
                var $move = $("<div>");
                var $moveul = $("<ul>");
                for (var x = 0; x < data.height; x++) {
                    var $ul = $("<ul>");
                    for (var y = 0; y < data.width; y++) {
                        let coords = `${x},${y}`;
                        let $li = $("<li>");
                        $li.addClass("board");
                        let $btn = $("<button>");
                        if (x === parseInt(data.playerx) && y === parseInt(data.playery)) {
                            $li.append($("<div id='ship'><div>"));
                            let $movebtn = $("<button>");
                            let $moveli = $("<li>");
                            $moveli.addClass("moveli");
                            $movebtn.addClass("move-btn");
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
                            $li.append($btn);
                            if (moves.includes(coords)) {
                                let $movebtn = $("<button>");
                                let $moveli = $("<li>");
                                $btn.attr("id", directions[count]);   
                                $btn.addClass("move-spot");                     
                                $movebtn.addClass("move-btn");
                                $movebtn.addClass(directions[count]);
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
                $("#game-board").append($("<button id='submit'>Submit Move</button>"))
            }
        }).always(function() { setTimeout(doPoll, 5000) });
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
        console.log($(".attack").data("coord"));
        console.log($(".move").data("coord"));
    });
});