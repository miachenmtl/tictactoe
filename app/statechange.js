exports.getNewState = function(grid, row, col, currentTurn) {
  var rowName = "row" + row.toString();
  var colNum = col - 1;
  var newGrid = grid;
  var newTurn;
  console.log("User clicked");
  console.log("Current turn is " + currentTurn)
  if (newGrid[rowName][colNum] === 0 && currentTurn !== 0) {
    newGrid[rowName][colNum] = currentTurn;
    console.log("And the square should change");
    if (checkWin(newGrid)) {
      console.log("Somebody won!");
      return {
        win: true
      };
    } else {
      console.log("the game continues");
      newTurn = 2 - (++currentTurn % 2);
      console.log(newTurn);
      return {
        grid: newGrid,
        turn: newTurn
      };
    }
  }
};

function checkWin(grid) {
  var i;
  var j;
  var product;
  var rowName = "";
  // Check rows
  for (i = 0; i < 3; i++) {
    rowName = "row" + (i + 1).toString();
    product = 1;
    for (j = 0; j < 3; j++) {
      product *= grid[rowName][j];
    }
    if (product === 1 ||  product === 8) {
      this.handleWin();
      return true;
    }
  }
  // Check cols
  for (i = 0; i < 3; i++) {
    product = 1;
    for (j = 0; j < 3; j++) {
      rowName = "row" + (j + 1).toString();
      product *= grid[rowName][i];
    }
    if (product === 1 ||  product === 8) {
      this.handleWin();
      return true;
    }
  }
  // Check diagonals
  product = grid.row1[0] * grid.row2[1] * grid.row3[2];
  if (product === 1 ||  product === 8) {
    this.handleWin();
    return true;
  }
  product = grid.row3[0] * grid.row2[1] * grid.row1[2];
  if (product === 1 ||  product === 8) {
    this.handleWin();
    return true;
  }
  return false;
}
