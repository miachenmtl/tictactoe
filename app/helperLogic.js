var helperLogic = {
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
  /** Returns an 8 * 3 array of arrays: for each row,
    * column, and diagonal, list number of blank, O,
    * and X squares
    */
  getPositionSummary: function(grid) {
    var rowSummary = this.checkRows(grid);
    var colSummary = this.checkCols(grid);
    var diagSummary = this.checkDiags(grid);
    return rowSummary.concat(colSummary, diagSummary);
  },
  /** Returns a 3 * 3 array of arrays: for each row,
    * it lists number of blank squares, number of O
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
      rowName = "row" + (i + 1).toString();
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
  /** Returns a 3 * 3 array of arrays: for each column,
    * it lists number of blank squares, number of O
    * squares, number of X squares
    * @param {object} grid The state of the grid
    * @return {array} colInfo Number of blank, O, and X squares for each column
    */
  checkCols: function(grid) {
    var i;
    var j;
    var k;
    var colInfo = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
    var rowName = "";
    // For each column...
    for (i = 0; i < 3; i++) {
      // ... go through the rows...
      for (j = 0; j < 3; j++) {
        rowName = "row" + (j + 1).toString();
        // ... and count number of blanks, Os, and Xs
        for (k = 0; k < 3; k++) {
          if (grid[rowName][i] === k) {
            colInfo[i][k]++;
          }
        }
      }
    }
    return colInfo;
  },
  /** Returns a 2 * 3 array of arrays: for each diagonal,
    * it lists number of blank squares, number of O
    * squares, number of X squares
    * @param {object} grid The state of the grid
    * @return {array} rowInfo Number of blank, O, and X squares for each diagonal
    */
  checkDiags: function(grid) {
    var i;
    var j;
    var diagInfo = [
      [0, 0, 0],
      [0, 0, 0]
    ];
    var rowName = "";
    //For the diagonal from 1, 1 to 3, 3
    for (i = 0; i < 3; i++) {
      rowName = "row" + (i + 1).toString();
      // Count number of blank, O, and X squares
      for (j = 0; j < 3; j++) {
        if (grid[rowName][i] === j) {
          diagInfo[0][j]++;
        }
      }
    }
    // For the diagonal from 1, 3 to 3, 1
    for (i = 0; i < 3; i++) {
      rowName = "row" + (i + 1).toString();
      // Count number of blank, O, and X squares
      for (j = 0; j < 3; j++) {
        if (grid[rowName][2 - i] === j) {
          diagInfo[1][j]++;
        }
      }
    }
    return diagInfo;
  }
};


module.exports = helperLogic;
/*
var subLogic = {
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
  }/*,
  /*getPositionSummary: function(grid) {
    var rowSummary = this.checkRows(grid);
    var colSummary = this.checkCols(grid);
    var diagSummary = this.checkDiags(grid);
    return rowSummary.concat(colSummary, diagSummary);
  },
  /** Returns a 3 * 3 array of arrays: for each row,
    * it lists number of blank squares, number of O
    * squares, number of X squares
    * @param {object} grid The state of the grid
    * @return {array} rowInfo Number of blank, O, and X squares for each row
    *
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
};*/
