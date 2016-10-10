var logic = {
  TicTacToeState(grid) {
    this.row1 = grid.row1;
    this.row2 = grid.row2;
    this.row3 = grid.row3;
  },
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
  /** Returns a 3 * 3 array of arrays, first coordinate corresponding to row
    * number, second coordinate listing number of blank squares, number of O
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
