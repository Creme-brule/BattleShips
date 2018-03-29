var express = require("express");
var router = express.Router();

var User = require("../models")["User"];
var Room = require("../models")["Room"];

router.get("/", function(req, res){
    res.render("index");
});

router.get("/signup", function(req, res){
    res.render("signup");
});

router.post("/signup", function(req, res){
    console.log(req.body);

    User.create({
        user_name: req.body.name,
        user_password: req.body.password
    });
    res.redirect("login");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", function(req, res){
    console.log(req.body);

    User.findAll({
        where: {
            user_name: req.body.name,
            user_password: req.body.password
        }
    }).then(function(data){
        if(data != ""){
            res.redirect("/");
        }else{
            console.log("Invalid username & password");
            res.redirect("/login")
        }
    });
});
