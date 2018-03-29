var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require("express-session");
var env = require("dotenv").load();
var app = express();

var path = require('path');
var PORT = process.env.PORT || 8080;

//Body Parser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport Setup
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.set('views','./app/public/assets/views');
app.engine("handlebars", exphbs({ 
    defaultLayout: "main",
    partialsDir: path.join(__dirname, 'app/public/assets/views/partials'),
    layoutsDir: path.join(__dirname, 'app/public/assets/views/layouts')
}));
app.set("view engine", "handlebars");   


//Routes 
//require("./app/routes/api-routes.js")(app);
var models = require('./app/models');
var authRoute = require('./app/routes/auth.js')(app, passport);
//var newRoute = require('myfile.js')(app,passport);
//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

app.get("/", function(req, res) {   
  res.send("Welcome to Passport with Sequelize");
});

models.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening at PORT: " + PORT);
  });
});
