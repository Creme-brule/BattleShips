var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser =  require("body-parser");
//var passport = require("passport");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require("./app/routes/**INSERTPATH**")(app);

app.listen(PORT, function() {
    console.log("App listening at PORT: " + PORT);
});