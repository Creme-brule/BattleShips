$(function() {
    $.get("/api/1", function(data) {
        console.log(data);
    }).then(function(data) {
        var $board = $("<div>");
        for (var x = 0; x < data.height; x++) {
            var $ul = $("<ul>");
            for(var y = 0; y < data.width; y++) {
                let $li = $("<li>");
                $li.addClass("board");
                let $btn = $("<button>");
                $btn.data("coord", `${x},${y}`);
                if (x === parseInt(data.player1x) && y === parseInt(data.player1y)) {
                    $btn.attr("id", "ship");
                }
                else {
                    $btn.addClass("water");
                }
                $ul.append($li);
                $li.append($btn);
            }
            $board.append($ul);
        }
        $("#game-board").append($board);
    });
    $(document).on("click","button", function (data) {
        console.log(this);
    })
});
