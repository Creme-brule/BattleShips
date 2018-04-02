var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true });

var page = nightmare
  .goto("https://battleship-brulee.herokuapp.com/")
  .wait("#button1")
  .type('input[name=username]', "dewis")
  .type('input[name=password]', "dewis")
  .click("#button1")
  .wait("#createRoom")
  .evaluate(function() {
    return document.querySelector("#createRoom");
  })
  .end()
  .then(function(result) {
    console.log("Test Success");
  })
  .catch(function(error) {
    console.error("Login Failed:", error);
  });
