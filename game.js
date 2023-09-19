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

makeBoard(7, 7);

function placeTile1() {
  let position = this.id.split(",");
  let r = parseInt(position[0]);
  let c = parseInt(position[1]);
  r = lengthCol[c - 1];
  if (r == 0) {
    return;
  }
  let tile = document.getElementById(r + 1 + "," + c);
  if (currentPlayer == player1) {
    tile.style.backgroundColor = player1;
    tile.classList.add(player1);
    currentPlayer = player2;
    let turn = document.getElementById("turn");
    turn.innerHTML = " turn :" + currentPlayer;
  } else {
    tile.style.backgroundColor = player2;
    tile.classList.add(player2);
    currentPlayer = player1;
    let turn = document.getElementById("turn");
    turn.innerHTML = " turn :" + currentPlayer;
  }
  r--;
  lengthCol[c - 1] = r;
  tieCondition();
  checkWinCond(player1);
  checkWinCond(player2);
}
function tieCondition() {
  let red = document.getElementsByClassName(player1);
  let black = document.getElementsByClassName(player2);
  if (red.length + black.length == 6 * 7) {
    let result = document.getElementById("winner");
    result.innerHTML = " Tie!";
  }
}

// function placeTile(x, y, color, player) {
//   for (let r = 6; r >= 1; r--) {
//     let rowTile = document.getElementById(r + "," + y);
//     if (
//       rowTile.style.backgroundColor !== "black" &&
//       rowTile.style.backgroundColor !== "red"
//     ) {
//       rowTile.style.backgroundColor = color;
//       rowTile.setAttribute("class", player);
//       checkWinCond(player);
//       break;
//     }
//   }
// }

// function startPlayerMovement() {
//   let player1Tile = document.getElementById("1,1");
//   let player2Tile = document.getElementById("1,1");
//   let player1X = 1;
//   let player1Y = 1;
//   let player2X = 1;
//   let player2Y = 1;
//   player1Tile.style.backgroundColor = "black";
//   player2Tile.style.backgroundColor = "red";
//   let currentPlayer = 1;
//   document.onkeydown = function (e) {
//     switch (e.keyCode) {
//       case 32:
//         if (currentPlayer == 1) {
//           placeTile(player1X, player1Y, "black", "player1");
//           currentPlayer = 2;
//         } else {
//           placeTile(player2X, player2Y, "red", "player2");
//           currentPlayer = 1;
//         }
//         break;
//       case 37:
//         if (currentPlayer == 1) {
//           player1Tile.style.backgroundColor = "white";
//           player1Y--;
//           player1Tile = document.getElementById(player1X + "," + player1Y);
//           player1Tile.style.backgroundColor = "black";
//         } else {
//           player2Tile.style.backgroundColor = "white";
//           player2Y--;
//           player2Tile = document.getElementById(player2X + "," + player2Y);
//           player2Tile.style.backgroundColor = "red";
//         }
//         break;
//       case 39:
//         if (currentPlayer == 1) {
//           player1Tile.style.backgroundColor = "white";
//           player1Y++;
//           player1Tile = document.getElementById(player1X + "," + player1Y);
//           player1Tile.style.backgroundColor = "black";
//         } else {
//           player2Tile.style.backgroundColor = "white";
//           player2Y++;
//           player2Tile = document.getElementById(player2X + "," + player2Y);
//           player2Tile.style.backgroundColor = "red";
//         }
//         break;
//     }
//   };
// }
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
//startPlayerMovement();
