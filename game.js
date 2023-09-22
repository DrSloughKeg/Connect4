let player1 = "black";
let player2 = "red";
let currentPlayer = player1;
let BGColor = "transparent";
let lengthCol;
let gameOver = false;

//set up the board
function makeBoard(row, column) {
  lengthCol = [6, 6, 6, 6, 6, 6, 6, 6]; //Mouse
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
      newCols.addEventListener("click", placeTile1); //Mouse
      newRows.appendChild(newCols);
    }
  }
  document.querySelector("body").appendChild(newTable);
}

//set up
let display = document.createElement("h2");
let displayTxt = document.createTextNode("");
display.appendChild(displayTxt);
document.getElementById("display").appendChild(display);
display.textContent = "It's Black's turn to place a tile.";
makeBoard(7, 7);

function placeTile(x, y, color, player) {
  if (gameOver) {
    return;
  } else {
    // loop through the rows to check if tile is already placed
    for (let r = 7; r >= 1; r--) {
      let rowTile = document.getElementById(r + "," + y);
      if (
        rowTile.style.backgroundColor !== "black" &&
        rowTile.style.backgroundColor !== "red"
      ) {
        rowTile.style.backgroundColor = color;
        rowTile.setAttribute("class", player);
        checkWinCond(player);
        tieCondition();
        break;
      }
    }
  }
}

function placeTile1() {
  // Mouse
  let position = this.id.split(",");
  let c = parseInt(position[1]);
  let r = lengthCol[c];
  if (gameOver) {
    return;
  } else {
    while (r >= 1) {
      let tile = document.getElementById(r + 1 + "," + c);
      if (
        tile.style.backgroundColor !== "black" &&
        tile.style.backgroundColor !== "red"
      ) {
        if (currentPlayer == player1) {
          tile.style.backgroundColor = player1;
          tile.classList.add("player1");
          checkWinCond("player1");
          tieCondition();
          currentPlayer = player2;
          display.innerHTML = "It's <span>Red's</span> turn to place a tile.";
        } else {
          tile.style.backgroundColor = player2;
          tile.classList.add("player2");
          checkWinCond("player2");
          tieCondition();
          currentPlayer = player1;
          display.innerHTML = "It's Black's turn to place a tile.";
        }
        lengthCol[c] = r - 1;
        break;
      }
      r--;
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

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 32: // When Space bar is pressed
        e.preventDefault();
        if (currentPlayer == player1) {
          placeTile(player1R, player1C, "black", "player1");
          player1Tile.style.backgroundColor = BGColor;
          currentPlayer = player2;
          display.innerHTML = "It's <span>Red's</span> turn to place a tile.";
        } else {
          placeTile(player2R, player2C, "red", "player2");
          player2Tile.style.backgroundColor = BGColor;
          currentPlayer = player1;
          display.textContent = "It's Black's turn to place a tile.";
        }
        break;
      case 37: // When left arrow is pressed
        if (currentPlayer == player1 && player1C > 1) {
          // (&& PLayer1C > 1) sets the boundary to the board.
          player1Tile.style.backgroundColor = BGColor;
          player1C--;
          player1Tile = document.getElementById(player1R + "," + player1C);
          player1Tile.style.backgroundColor = "black";
        } else if (currentPlayer == player2 && player2C > 1) {
          player2Tile.style.backgroundColor = BGColor;
          player2C--;
          player2Tile = document.getElementById(player2R + "," + player2C);
          player2Tile.style.backgroundColor = "red";
        }
        break;
      case 39: // When Right arrow is pressed
        if (currentPlayer == player1 && player1C < 7) {
          player1Tile.style.backgroundColor = BGColor;
          player1C++;
          player1Tile = document.getElementById(player1R + "," + player1C);
          player1Tile.style.backgroundColor = "black";
        } else if (currentPlayer == player2 && player2C < 7) {
          player2Tile.style.backgroundColor = BGColor;
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
  for (r = 7; r > 0; r--) {
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
  for (i = 1; i < 4; i++) {
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
  for (i = 1; i < 4; i++) {
    rowTile = document.getElementById(r - i + "," + c);
    if (rowTile != null && rowTile.className == player) {
      winCond++;
    }
  }
  winOrReset(player);
}

//check Diagonal /
function checkDiag1(r, c, rowTile, player) {
  winCond++;
  for (i = 1; i < 4; i++) {
    rowTile = document.getElementById(r - i + "," + (c + i));
    if (rowTile != null && rowTile.className == player) {
      winCond++;
    }
  }
  winOrReset(player);
}

//check Diagonal \
function checkDiag2(r, c, rowTile, player) {
  winCond++;
  for (i = 1; i < 4; i++) {
    rowTile = document.getElementById(r - i + "," + (c - i));
    if (rowTile != null && rowTile.className == player) {
      winCond++;
    }
  }
  winOrReset(player);
}

function winOrReset(player) {
  if (winCond >= 4) {
    //player wins
    console.log(player + "wins");
    victory(player);
    gameOver = true;
  } else {
    winCond = 0;
  }
}

function victory(player) {
  let display = document.getElementById("display");
  if (player == "player1") {
    display.innerHTML = "<h2>Black Wins!</h2><br>";
  } else if (player == "player2") {
    display.innerHTML = "<h2><span>Red</span> Wins!</h2><br>";
  }
  return playAgainButton();
}
function tieCondition() {
  let red = document.getElementsByClassName("player1");
  let black = document.getElementsByClassName("player2");
  if (red.length + black.length == 6 * 7) {
    let result = document.getElementById("display");
    result.innerHTML = "<h2>It's a Tie!</h2>";
    playAgainButton();
  }
}

// Display button when called
function playAgainButton() {
  let playAgainButton = document.createElement("button");
  playAgainButton.type = "button";
  playAgainButton.class = "btn";
  playAgainButton.innerHTML = "Play Again";
  playAgainButton.addEventListener("click", reset);
  document.getElementById("display").appendChild(playAgainButton);
}

// Refreshes page when clicked
function reset() {
  let playAgainButton = document.getElementById("display");
  playAgainButton.addEventListener("click", window.location.reload());
}

// Allow player movement
startPlayerMovement();
