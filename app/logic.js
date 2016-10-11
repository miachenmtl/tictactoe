function TicTacToeState(grid) {
  this.row1 = grid.row1;
  this.row2 = grid.row2;
  this.row3 = grid.row3;
}

var logic = {
  /** Returns an array of coordinates of remaining blank squares
    * @param {object} grid The state of the grid
    * @return {array} coords The array of coordinates of legal moves
    */
  getLegalMoves: function(grid) {
    var i;
    var j;
    var coords = [];
    var rowName = "";
    for (i = 0; i < 3; i++) {
      rowName = "row" + (i+1).toString();
      for (j = 0; j < 3; j++) {
        if (grid[rowName][j] === 0) {
          coords.push([i + 1, j + 1]);
        }
      }
    }
    return coords;
  },
  checkWin(grid) {
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
        return true;
      }
    }
    // Check diagonals
    product = grid.row1[0] * grid.row2[1] * grid.row3[2];
    if (product === 1 ||  product === 8) {
      return true;
    }
    product = grid.row3[0] * grid.row2[1] * grid.row1[2];
    if (product === 1 ||  product === 8) {
      return true;
    }
    return false;
  },
  /** Returns a 3 * 3 array of arrays, for each row,
    * lists number of blank squares, number of O
    * squares, number of X squares
    * @param {object} grid The state of the grid
    * @return {array} rowInfo Number of blank, O, and X squares for each row
    */
  checkRows: function(grid) {
    var i;
    var j;
    var k;
    var rowInfo = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    var rowName = "";
    // For each row...
    for (i = 0; i < 3; i++) {
      rowName = "row" + (i+1).toString();
      // ... go through the columns...
      for (j = 0; j < 3; j++) {
        // ... and count number of blanks, Os, and Xs
        for (k = 0; k < 3; k++) {
          if (grid[rowName][j] === k) {
            rowInfo[i][k]++;
          }
        }
      }
    }
    return rowInfo;
  },
  checkCols: function(grid) {

  },
  checkDiags: function(grid) {

  }
}

// So that the file can be both tested and run in the browser
if ((typeof module !== "undefined") && (typeof module.exports !== "undefined")) {
  module.exports = logic;
}
