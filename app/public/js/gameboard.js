var moves = ["Up", "Left", "Stay", "Right", "Down"]
$(function () {
    $.get("/api/1", function (data) {
        console.log(data);
    }).then(function (data) {
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
                    $movebtn.data(coords);
                    $moveli.append($movebtn);
                    $moveul.append($moveli);
                    $movebtn.text(moves[count]);
                    count++;
                }
                else {
                    $btn.addClass("board-btn");
                    $btn.data("coord", coords);
                    $btn.addClass("water");
                    $li.append($btn);
                    if (data.moves.includes(coords)) {
                        let $movebtn = $("<button>");
                        let $moveli = $("<li>");
                        $movebtn.addClass("move-btn");
                        $moveli.addClass("moveli");
                        $movebtn.data(coords);
                        $moveli.append($movebtn);
                        $moveul.append($moveli);
                        $movebtn.text(moves[count]);
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
    });
    $(document).on("click", ".board-btn", function (event) {
        $(".board-btn").not(this).removeClass("attack");
        $(this).toggleClass("attack");
        event.preventDefault();
    });
    $(document).on("click", ".board-btn", function (event) {
        console.log($(this));
        $(".board-btn").not(this).removeClass("attack");
        $(this).toggleClass("attack");
        event.preventDefault();
    });
});
