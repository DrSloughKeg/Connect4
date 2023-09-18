let player1 = "red";
let player2 = "black";
let currentPlayer = player1;
let lengthCol;
//set up the board
function makeBoard(row, column) {
  lengthCol = [6, 6, 6, 6, 6, 6, 6];
  let newTable = document.createElement("table");

  for (r = 1; r <= row; r++) {
    let newRows = document.createElement("tr");
    newTable.appendChild(newRows);
    for (c = 1; c <= column; c++) {
      let newCols = document.createElement("td");
      newCols.setAttribute("id", r + "," + c);
      newCols.addEventListener("click", placeTile1);
      newRows.appendChild(newCols);
    }
  }
  document.querySelector("body").appendChild(newTable);
}

makeBoard(6, 7);
function placeTile1() {
  let position = this.id.split(",");
  let r = parseInt(position[0]);
  let c = parseInt(position[1]);
  r = lengthCol[c];
  if (r == 0) {
    return;
  }
  let tile = document.getElementById(r + "," + c);
  if (currentPlayer == player1) {
    tile.style.backgroundColor = player1;
    tile.classList.add("player1");
    currentPlayer = player2;
  } else {
    tile.style.backgroundColor = player2;
    tile.classList.add("player2");
    currentPlayer = player1;
  }
  r--;
  lengthCol[c] = r;
  checkWinCond(player1);
  checkWinCond(player2);
}

function placeTile(x, y, color, player) {
  for (let r = 6; r >= 1; r--) {
    let rowTile = document.getElementById(r + "," + y);
    if (
      rowTile.style.backgroundColor !== "black" &&
      rowTile.style.backgroundColor !== "red"
    ) {
      rowTile.style.backgroundColor = color;
      rowTile.setAttribute("class", player);
      checkWinCond(player);
      break;
    }
  }
}

function startPlayerMovement() {
  let player1Tile = document.getElementById("1,1");
  let player2Tile = document.getElementById("1,1");
  let player1X = 1;
  let player1Y = 1;
  let player2X = 1;
  let player2Y = 1;
  player1Tile.style.backgroundColor = "black";
  player2Tile.style.backgroundColor = "red";
  let currentPlayer = 1;
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 32:
        if (currentPlayer == 1) {
          placeTile(player1X, player1Y, "black", "player1");
          currentPlayer = 2;
        } else {
          placeTile(player2X, player2Y, "red", "player2");
          currentPlayer = 1;
        }
        break;
      case 37:
        if (currentPlayer == 1) {
          player1Tile.style.backgroundColor = "white";
          player1Y--;
          player1Tile = document.getElementById(player1X + "," + player1Y);
          player1Tile.style.backgroundColor = "black";
        } else {
          player2Tile.style.backgroundColor = "white";
          player2Y--;
          player2Tile = document.getElementById(player2X + "," + player2Y);
          player2Tile.style.backgroundColor = "red";
        }
        break;
      case 39:
        if (currentPlayer == 1) {
          player1Tile.style.backgroundColor = "white";
          player1Y++;
          player1Tile = document.getElementById(player1X + "," + player1Y);
          player1Tile.style.backgroundColor = "black";
        } else {
          player2Tile.style.backgroundColor = "white";
          player2Y++;
          player2Tile = document.getElementById(player2X + "," + player2Y);
          player2Tile.style.backgroundColor = "red";
        }
        break;
    }
  };
}

function checkWinCond(player) {
  winCond = 0;
  for (r = 1; r <= 6; r++) {
    for (c = 1; c <= 7; c++) {
      let rowTile = document.getElementById(r + "," + c);
      if (rowTile.className == player) {
        winCond++;
        //check 4 horizontal
        for (i = 1; i < 4; i++) {
          rowTile = document.getElementById(r + "," + (c + i));
          if (rowTile != null && rowTile.className == player) {
            winCond++;
          }
        }
        if (winCond >= 4) {
          //player wins
          console.log(player + " Wins!");
        } else {
          winCond = 1;
        }
        //check vertical
        for (i = 1; i < 4; i++) {
          rowTile = document.getElementById(r - i + "," + c);
          if (rowTile != null && rowTile.className == player) {
            winCond++;
          }
        }
        if (winCond >= 4) {
          //player wins
          console.log(player + " Wins!");
        } else {
          winCond = 0;
        }
      }
    }
  }
  /*for (r = 1; r <= 6; r++) {
    for (c = 1; c <= 7; c++) {
      let rowTile = document.getElementById(r + "," + c);
      dia1 = document.getElementById(r - 1 + "," + (c + 1));
      if (dia1 != null && dia1 == player) {
        dia2 = document.getElementById(r - 2 + "," + (c + 2));
        if (dia2 != null && dia2 == player) {
          dia3 = document.getElementById(r - 3 + "," + (c + 3));
          if (dia3 != null && dia3 == player) {
            console.log(player + " Wins!");
          }
        }
      }
    }
  }*/
}

startPlayerMovement();
