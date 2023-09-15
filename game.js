//set up the board
function makeBoard(size) {
  let newTable = document.createElement("table");

  for (r = 1; r <= size; r++) {
    let newRows = document.createElement("tr");
    newTable.appendChild(newRows);
    for (c = 1; c <= size; c++) {
      let newCols = document.createElement("td");
      newCols.setAttribute("id", r + "," + c);
      newRows.appendChild(newCols);
    }
  }
  document.querySelector("body").appendChild(newTable);
}

function placeTile(x, y) {
  let selectedTile = document.getElementById(x + "," + y);
  selectedTile.style.backgroundColor = "black";
}

function startPlayerMovement() {
  let playerTile = document.getElementById("1,1");
  let playerX = 1;
  let playerY = 1;
  playerTile.style.backgroundColor = "red";
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 37:
        playerTile.style.backgroundColor = "white";
        playerY--;
        playerTile = document.getElementById(playerX + "," + playerY);
        playerTile.style.backgroundColor = "red";
        break;
      case 38:
        playerTile.style.backgroundColor = "white";
        playerX--;
        playerTile = document.getElementById(playerX + "," + playerY);
        playerTile.style.backgroundColor = "red";
        break;
      case 39:
        playerTile.style.backgroundColor = "white";
        playerY++;
        playerTile = document.getElementById(playerX + "," + playerY);
        playerTile.style.backgroundColor = "red";
        break;
      case 40:
        playerTile.style.backgroundColor = "white";
        playerX++;
        playerTile = document.getElementById(playerX + "," + playerY);
        playerTile.style.backgroundColor = "red";
        break;
    }
  };
}
