var inq = require("inquirer");
var map = {
  width: 5,
  height: 5,
  playerLocations: [null, null],
  turns: 1,
  powerUp: [null, null]
};
function initializePositions() {
  starting = [[0, 0], [0, 4], [4, 0], [4, 4]];
  let rando = Math.floor(Math.random() * starting.length);
  map.playerLocations[0] = starting[rando];
  starting.splice(rando, 1);
  map.playerLocations[1] =
    starting[Math.floor(Math.random() * starting.length)];
}
initializePositions();
console.log(map);
action();
function action() {
  move();
  map.turns++;
  function move() {
    var x;
    if (map.turns % 2 != 0) {
      x = 0;
    } else {
      x = 1;
    }
    var possible = [
      map.playerLocations[x],
      [map.playerLocations[x][0], map.playerLocations[x][1] + 1],
      [map.playerLocations[x][0], map.playerLocations[x][1] - 1],
      [map.playerLocations[x][0] + 1, map.playerLocations[x][1]],
      [map.playerLocations[x][0] - 1, map.playerLocations[x][1]]
    ];
    let remove = [];
    for (var i = 0; i < 5; i++) {
      if (
        possible[i][0] < 0 ||
        possible[i][0] > 4 ||
        possible[i][1] < 0 ||
        possible[i][1] > 4
      ) {
        remove.push(i);
      }
    }
    for (var i = remove.length - 1; i > -1; i--) {
      possible.splice(remove[i], 1);
    }
    var arr = [];
    possible.forEach(function(data) {
      let string = data.join(",");
      arr.push(string);
    });
    inq
      .prompt([
        {
          type: "list",
          message: "Where you wanna go?",
          name: "location",
          choices: arr
        }
      ])
      .then(function(movement) {
        map.playerLocations[x] = movement.location.split(",");
        // console.log(map.playerLocations[x][0]);
        // console.log(typeof map.playerLocations[x][1]);
        map.playerLocations[x][0] = parseInt(map.playerLocations[x][0]);
        map.playerLocations[x][1] = parseInt(map.playerLocations[x][1]);
        if(map.playerLocations[0][0]==map.playerLocations[1][0]&&map.playerLocations[0][1]==map.playerLocations[1][1]){
          console.log("\n collision BITCH! \n");
          initializePositions();
        }
        console.log(typeof map.playerLocations[x][0]);
        console.log(typeof map.playerLocations[x][1]);
        console.log(map);
        
      });
  }

  function attack() {
    var target;
    inq
      .prompt([
        {
          type: "input",
          message:
            "where to attack? please enter in the format of (number,number)",
          name: "target"
        }
      ])
      .then(function(attack) {
        console.log(attack.target);
        console.log(typeof attack.target);
        
        if (map.turns % 2 != 0) {
          if (target === map.playerLocations[1]) {
            gameover(1);
          } else {
          }
        } else {
          if (target === map.playerLocations[0]) {
            gameover();
          } else {
          }
        }
      });
  }
}
