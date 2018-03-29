var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser =  require("body-parser");
var db = require("./app/models");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("app/public"))

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./app/routes/api-routes")(app);

db.sequelize.sync({force: true}).then(function(){
    app.listen(PORT, function() {
        console.log("App listening at PORT: " + PORT);
    });
});