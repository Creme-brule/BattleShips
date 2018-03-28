var db = require("../models");

module.exports = function(app) {
    app.get("/api/:map", function(req, res) {
        var mapId = req.params.map;
        if (mapId) {
            db.Room.findOne({
                where: {
                    id: mapId
                }
            }).then(function(dbRoom) {
                res.json(dbRoom)        
            });
        }
    });

}