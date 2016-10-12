var helperLogic = require("./helperLogic");

function TicTacToeState(grid) {
  this.row1 = grid.row1;
  this.row2 = grid.row2;
  this.row3 = grid.row3;
}

var logic = {
  checkWin: function(grid) {
    var i;
    var j;
    var positionSummary = helperLogic.getPositionSummary(grid);
    // For each player, go through position summary
    for (i = 1; i < 3; i++) {
      for (j = 0; j < 8; j++) {
        if (positionSummary[j][i] === 3) {
          return [true, i, j];
        }
      }
    }
    return [false, 0, 0];
  },
  /*  var i;
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
  }*/
};

module.exports = logic;
