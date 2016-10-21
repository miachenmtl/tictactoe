var helperLogic = require("./helperLogic");

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
    var i;
    var numLegalMoves;
    var legalMoves;
    var nextMove;
    var nearWin;
    var numOfNearWins;
    var forcedWin;
    var candidateMoves;
    legalMoves = helperLogic.getLegalMoves(grid);
    numLegalMoves = legalMoves.length;
    if (aiStatus === 1) {
      grid = this.getRandomMove(grid, legalMoves, turn);
      return grid;
    } else if (aiStatus === 2) {
      nearWin = this.checkNearWin(grid);
      if (nearWin[0]) {
        numOfNearWins = nearWin.length / 3;
        for (i = 0; i < numOfNearWins; i++) {
          if (3 * i + 1 === turn) {
            nextMove = helperLogic.findBlankSquareFromPosition(
              grid,
              nearWin[3 * i + 2]);
            grid[nextMove[0]][nextMove[1]] = turn;
            return grid;
          }
        }
        nextMove = helperLogic.findBlankSquareFromPosition(grid, nearWin[2]);
        grid[nextMove[0]][nextMove[1]] = turn;
        return grid;
      }
      if (numLegalMoves > 0) {
        grid = this.getRandomMove(grid, legalMoves, turn);
      }
      return grid;
    }
    else if (aiStatus === 3) {
      // First, check for near win
      nearWin = this.checkNearWin(grid);
      if (nearWin[0]) {
        numOfNearWins = nearWin.length / 3;
        for (i = 0; i < numOfNearWins; i++) {
          if (3 * i + 1 === turn) {
            nextMove = helperLogic.findBlankSquareFromPosition(
              grid,
              nearWin[3 * i + 2]);
            console.log("Player " + turn + " moved at " + nextMove);
            grid[nextMove[0]][nextMove[1]] = turn;
            return grid;
          }
        }
        nextMove = helperLogic.findBlankSquareFromPosition(grid, nearWin[2]);
        console.log("Player " + turn + " moved at " + nextMove);
        grid[nextMove[0]][nextMove[1]] = turn;
        return grid;
      } else {
        // Second, check for immediate forced win
        forcedWin = this.checkForcedWin(grid, turn);
        if (forcedWin[0]) {
          forcedWin.shift();
          candidateMoves = forcedWin;
        } else {
          // Third, check if can get forced move on next move
          forcedWin = this.checkCanGetForcedWin(grid, turn);
          if (forcedWin[0]) {
            forcedWin.shift();
            candidateMoves = forcedWin;
          } else {
            // Finally, eliminate losing moves
            candidateMoves = this.eliminateLosingMoves(grid, turn);
          }
        }
        grid = this.getRandomMove(grid, candidateMoves, turn);
        return grid;
      }
    }
  },
  eliminateLosingMoves: function(grid, player) {
    var i;
    var aiGrid;
    var forcedWin;
    var canGetForcedWin;
    var result = [];
    var opp = 2 - ((player + 1) % 2);
    var legalMoves = helperLogic.getLegalMoves(grid);
    var numLegalMoves = legalMoves.length;
    var candidateMoveIndexArray = [];
    for (i = 0; i < numLegalMoves; i++) {
      aiGrid = JSON.parse(JSON.stringify(grid));
      aiGrid[legalMoves[i][0]][legalMoves[i][1]] = player;
      forcedWin = this.checkForcedWin(aiGrid, opp);
      canGetForcedWin = this.checkCanGetForcedWin(aiGrid, opp);
      if (forcedWin[0]) {
        candidateMoveIndexArray[i] = false;
      } else if (canGetForcedWin[0]) {
        candidateMoveIndexArray[i] = false;
      } else {
        candidateMoveIndexArray[i] = true;
      }
    }
    for (i = 0; i < numLegalMoves; i++) {
      if (candidateMoveIndexArray[i]) {
        result.push(legalMoves[i]);
      }
    }
    return result;
  },
  getRandomMove: function(grid, candidateMoves, turn) {
    var numCandidateMoves = candidateMoves.length;
    var nextMoveIndex = Math.floor(Math.random() * numCandidateMoves);
    var nextMove = candidateMoves[nextMoveIndex];
    console.log("Player " + turn + " moved at " + nextMove);
    grid[nextMove[0]][nextMove[1]] = turn;
    return grid;
  },
  checkWin: function(grid) {
    var i;
    var j;
    var positionSummary = helperLogic.getPositionSummary(grid);
    var movesLeft = helperLogic.getLegalMoves(grid).length;
    // For each player, go through position summary
    for (i = 1; i < 3; i++) {
      for (j = 0; j < 8; j++) {
        if (positionSummary[j][i] === 3) {
          console.log("Win");
          return [1, i, j];
        }
      }
    }
    if (movesLeft === 0) {
      console.log("Draw");
      return [-1, 0, 0];
    }
    return [0, 0, 0];
  },
  checkNearWin: function(grid) {
    var i;
    var j;
    var positionSummary = helperLogic.getPositionSummary(grid);
    var result = [];
    // For each player, go through position summary
    for (i = 1; i < 3; i++) {
      for (j = 0; j < 8; j++) {
        if (positionSummary[j][0] === 1 && positionSummary[j][i] === 2) {
          result = result.concat([true, i, j]);
        }
      }
    }
    if (result.length === 0) {
      result = [false, 0, 0];
    }
    return result;
  },
  checkForcedWin: function(grid, turn) {
    var i;
    var j;
    var aiGrid;
    var nearWin;
    var numOfNearWins;
    var result = [];
    var isForcedWin = [false];
    var oppTurn = 2 - ((turn + 1) % 2);
    var legalMoves = helperLogic.getLegalMoves(grid);
    var numLegalMoves = legalMoves.length;
    var candidateMoveIndexArray = [];
    for (i = 0; i < numLegalMoves; i++) {
      candidateMoveIndexArray[i] = true;
    }
    for (i = 0; i < numLegalMoves; i++) {
      // Make deep copy of grid
      aiGrid = JSON.parse(JSON.stringify(grid));
      aiGrid[legalMoves[i][0]][legalMoves[i][1]] = turn;
      nearWin = this.checkNearWin(aiGrid);
      if (nearWin.length > 3) {
        numOfNearWins = nearWin.length / 3;
        for (j = 0; j < numOfNearWins; j++) {
          if (nearWin[3 * j + 1] === oppTurn) {
            candidateMoveIndexArray[i] = false;
          }
        }
      } else {
        candidateMoveIndexArray[i] = false;
      }
    }
    for (i = 0; i < numLegalMoves; i++) {
      if (candidateMoveIndexArray[i]) {
        isForcedWin = [true];
        result.push(legalMoves[i]);
      }
    }
    if (isForcedWin[0]) {
      return (isForcedWin.concat(result));
    }
    return [false, ["", 0]];
  },
  checkCanGetForcedWin: function(grid, player) {
    var i;
    var aiGrid;
    var nearWin;
    var forcedWin;
    var result = [];
    var canGetForcedWin = [false];
    var oppMove;
    var opp = 2 - ((player + 1) % 2);
    var legalMoves = helperLogic.getLegalMoves(grid);
    var numLegalMoves = legalMoves.length;
    var candidateMoveIndexArray = [];
    for (i = 0; i < numLegalMoves; i++) {
      // Make deep copy of grid
      aiGrid = JSON.parse(JSON.stringify(grid));
      aiGrid[legalMoves[i][0]][legalMoves[i][1]] = player;
      nearWin = this.checkNearWin(aiGrid);
      if (nearWin[0]) {
        oppMove = helperLogic.findBlankSquareFromPosition(aiGrid, nearWin[2]);
        aiGrid[oppMove[0]][oppMove[1]] = opp;
        forcedWin = this.checkForcedWin(aiGrid, player);
        if (forcedWin[0]) {
          canGetForcedWin = [true];
          candidateMoveIndexArray[i] = true;
        } else {
          candidateMoveIndexArray[i] = false;
        }
      } else {
        candidateMoveIndexArray[i] = false;
      }
    }
    for (i = 0; i < numLegalMoves; i++) {
      if (candidateMoveIndexArray[i]) {
        result.push(legalMoves[i]);
      }
    }
    if (canGetForcedWin[0]) {
      return (canGetForcedWin.concat(result));
    }
    return [false, ["", 0]];
  }
};

module.exports = logic;
