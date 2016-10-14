var helperLogic = require("./helperLogic");

/* function TicTacToeState(grid) {
  this.row1 = grid.row1;
  this.row2 = grid.row2;
  this.row3 = grid.row3;
}*/

var logic = {
  /** gets the next move from the AI or from player input
    * @param {array} newGrid the state of the game
    * @param {string} rowName row player clicked on (1-3)
    * @param {number} colNum column player clicked on (0-2)
    * @param {number} currentTurn current turn
    * @param {array} aiStatus whether player is human or ai
    * @return {object} nextMoveResult contains winCondition, newGrid, currentTurn
    */
  getNextMove: function(newGrid, rowName, colNum, currentTurn, aiStatus) {
    var winCondition;
    if (aiStatus[currentTurn - 1]) {
      newGrid = logic.getAIMove(
        newGrid,
        currentTurn,
        aiStatus[currentTurn - 1]
      );
    } else {
      newGrid[rowName][colNum] = currentTurn;
    }
    winCondition = logic.checkWin(newGrid);
    return {winCondition, newGrid, currentTurn};
  },
  getAIMove: function(grid, turn, aiStatus) {
    var numLegalMoves;
    var legalMoves;
    var nextMoveIndex;
    var nextMove;
    var rowName;
    var col;
    var nearWin;
    legalMoves = helperLogic.getLegalMoves(grid);
    numLegalMoves = legalMoves.length;
    if (aiStatus === 1) {
      nextMoveIndex = Math.floor(Math.random() * numLegalMoves);
      nextMove = legalMoves[nextMoveIndex];
      rowName = "row" + nextMove[0].toString();
      col = nextMove[1] - 1;
      grid[rowName][col] = turn;
      return grid;
    } else if (aiStatus === 2) {
      nearWin = this.checkNearWin(grid);
      if (nearWin[0]) {
        nextMove = helperLogic.findBlankSquareFromPosition(grid, nearWin[2]);
        grid[nextMove[0]][nextMove[1]] = turn;
        return grid;
      }
      if (numLegalMoves > 0) {
        nextMoveIndex = Math.floor(Math.random() * numLegalMoves);
        nextMove = legalMoves[nextMoveIndex];
        rowName = "row" + nextMove[0].toString();
        col = nextMove[1] - 1;
        grid[rowName][col] = turn;
      }
      return grid;
    }
  },
  checkWin: function(grid) {
    var i;
    var j;
    var positionSummary = helperLogic.getPositionSummary(grid);
    var movesLeft = helperLogic.getLegalMoves(grid).length;
    console.log(movesLeft + " moves left.");
    // For each player, go through position summary
    for (i = 1; i < 3; i++) {
      for (j = 0; j < 8; j++) {
        if (positionSummary[j][i] === 3) {
          return [1, i, j];
        }
      }
    }
    if (movesLeft === 0) {
      return [-1, 0, 0];
    }
    return [0, 0, 0];
  },
  checkNearWin: function(grid) {
    var i;
    var j;
    var positionSummary = helperLogic.getPositionSummary(grid);
    // For each player, go through position summary
    for (i = 1; i < 3; i++) {
      for (j = 0; j < 8; j++) {
        if (positionSummary[j][0] === 1 && positionSummary[j][i] === 2) {
          return [true, i, j];
        }
      }
    }
    return [false, 0, 0];
  }
};

module.exports = logic;
