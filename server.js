var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser =  require("body-parser");
//var passport = require("passport");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* PASSPORT EXAMPLEㄴ
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    userNameField: "username",
    passwordField: "password"
},
function(username, password, done){
    User.find({
        where: {username: username}})
        .then(function(user){
        if(!user)
            return done(null, false, {message: "Please enter valid username."});
        else if(!hashing.compare(password, user.password)) 
        return done (null, false, {message: "Incorrect password."});
        else 
        return done(null, user);
    });
}
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(user, done){
    User.find(id)
    .success(function(user){
        done(null, user);
    }).error(function(err){
        done(new Error("The user " + id + "does not exit."));
    });
});
*/

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require("./app/routes/**INSERTPATH**")(app);

app.listen(PORT, function() {
    console.log("App listening at PORT: " + PORT);
});