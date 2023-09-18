//set up the board
function makeBoard(row, column) {
  let newTable = document.createElement("table");

  for (r = 1; r <= row; r++) {
    let newRows = document.createElement("tr");
    newTable.appendChild(newRows);
    for (c = 1; c <= column; c++) {
      let newCols = document.createElement("td");
      newCols.setAttribute("id", r + "," + c);
      newRows.appendChild(newCols);
    }
  }
  document.querySelector("body").appendChild(newTable);
}

makeBoard(6, 7);

function placeTile(x, y, color) {
  for (let r = 6; r >= 1; r--) {
    let rowTile = document.getElementById(r + "," + y);
    if (
      rowTile.style.backgroundColor !== "black" &&
      rowTile.style.backgroundColor !== "red"
    ) {
      rowTile.style.backgroundColor = color;
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
          placeTile(player1X, player1Y, "black");
          currentPlayer = 2;
        } else {
          placeTile(player2X, player2Y, "red");
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

startPlayerMovement();
