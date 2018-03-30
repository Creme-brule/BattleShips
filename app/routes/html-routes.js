module.exports = function(app) {
    app.get("/map/:Id", function(req, res) {
            res.render("gameboard", {});
    })
}