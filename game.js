//set up the board
function makeBoard(row, column) {
  let newTable = document.createElement("table");

  for (r = 1; r <= row; r++) {
    let newRows = document.createElement("tr");
    if (r === 1) {
      // Add a class to the first row
      newRows.classList.add("ignoreCSSRow");
    }
    newTable.appendChild(newRows);
    for (c = 1; c <= column; c++) {
      let newCols = document.createElement("td");
      newCols.setAttribute("id", r + "," + c);
      newRows.appendChild(newCols);
    }
  }
  document.querySelector("body").appendChild(newTable);
}

makeBoard(7, 7);

function placeTile(x, y, color, player) {
  for (let r = 7; r >= 1; r--) {
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
  // Setting Both player 1 and 2 at the first tile (1,1)
  let player1Tile = document.getElementById("1,1");
  let player2Tile = document.getElementById("1,1");
  let player1R = 1;
  let player1C = 1;
  let player2R = 1;
  let player2C = 1;
  player1Tile.style.backgroundColor = "black"; // Player 1 is black & Player 2 is red
  let currentPlayer = 1; // player 1 starts

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 32: // When Space bar is pressed
        if (currentPlayer == 1) {
          placeTile(player1R, player1C, "black", "player1");
          player1Tile.style.backgroundColor = "white";
          currentPlayer = 2;
        } else {
          placeTile(player2R, player2C, "red", "player2");
          player2Tile.style.backgroundColor = "white";
          currentPlayer = 1;
        }
        break;
      case 37: // When left arrow is pressed
        if (currentPlayer == 1 && player1C > 1) {
          // (&& PLayer1C > 1) sets the boundary to the board.
          player1Tile.style.backgroundColor = "white";
          player1C--;
          player1Tile = document.getElementById(player1R + "," + player1C);
          player1Tile.style.backgroundColor = "black";
        } else if (currentPlayer == 2 && player2C > 1) {
          player2Tile.style.backgroundColor = "white";
          player2C--;
          player2Tile = document.getElementById(player2R + "," + player2C);
          player2Tile.style.backgroundColor = "red";
        }
        break;
      case 39: // When Right arrow is pressed
        if (currentPlayer == 1 && player1C < 7) {
          player1Tile.style.backgroundColor = "white";
          player1C++;
          player1Tile = document.getElementById(player1R + "," + player1C);
          player1Tile.style.backgroundColor = "black";
        } else if (currentPlayer == 2 && player2C < 7) {
          player2Tile.style.backgroundColor = "white";
          player2C++;
          player2Tile = document.getElementById(player2R + "," + player2C);
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
        if (
          document.getElementById(r + "," + (c + 1)) != null &&
          document.getElementById(r + "," + (c + 1)).className == player
        ) {
          checkHori(r, c, rowTile, player);
        }
        if (
          document.getElementById(r - 1 + "," + c) != null &&
          document.getElementById(r - 1 + "," + c).className == player
        ) {
          checkVert(r, c, rowTile, player);
        }
        if (
          document.getElementById(r - 1 + "," + (c + 1)) != null &&
          document.getElementById(r - 1 + "," + (c + 1)).className == player
        ) {
          checkDiag1(r, c, rowTile, player);
        }
        if (
          document.getElementById(r - 1 + "," + (c - 1)) != null &&
          document.getElementById(r - 1 + "," + (c - 1)).className == player
        ) {
          checkDiag2(r, c, rowTile, player);
        }
      }
    }
  }
}

//check horizontal
function checkHori(r, c, rowTile, player) {
  winCond++;
  for (i = 1; i < 3; i++) {
    rowTile = document.getElementById(r + "," + (c + i));
    if (rowTile != null && rowTile.className == player) {
      winCond++;
    }
  }
  winOrReset(player);
}

//check vertical
function checkVert(r, c, rowTile, player) {
  winCond++;
  for (i = 1; i < 3; i++) {
    rowTile = document.getElementById(r - i + "," + c);
    if (rowTile != null && rowTile.className == player) {
      winCond++;
    }
  }
  winOrReset(player);
}

function checkDiag1(r, c, rowTile, player) {
  winCond++;
  for (i = 1; i < 3; i++) {
    rowTile = document.getElementById(r - i + "," + (c + i));
    if (rowTile != null && rowTile.className == player) {
      winCond++;
    }
  }
  winOrReset(player);
}

function checkDiag2(r, c, rowTile, player) {
  winCond++;
  for (i = 1; i < 3; i++) {
    rowTile = document.getElementById(r - i + "," + (c - i));
    if (rowTile != null && rowTile.className == player) {
      winCond++;
    }
  }
  winOrReset(player);
}

function winOrReset(player) {
  if (winCond >= 3) {
    //player wins
    console.log(player + " Wins!");
  } else {
    winCond = 0;
  }
}

startPlayerMovement();