var db = require("../models")
var test = {
    turns: 1,
    height: 5,
    width: 5,
    player1x: 0,
    player1y: 0
}
module.exports = function(app) {
    app.get("/map/:Id", function(req, res) {
            res.render("gameboard", {});
    })
}