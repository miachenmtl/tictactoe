var React = require("react");
var TicTacToeGame = require("./TicTacToeGame");
var logic = require("./logic");
var StatusArea = require("./StatusArea");

var TicTacToeContainer = React.createClass({
  getInitialState: function() {
    return {
      grid: {
        row1: [0, 0, 0],
        row2: [0, 0, 0],
        row3: [0, 0, 0]
      },
      turn: 1,
      winner: 0,
      ai: [0, 1]
    };
  },
  handleClick: function(grid, row, col, currentTurn) {
    var i = 0;
    var rowName = "row" + row.toString();
    var colNum = col - 1;
    var newGrid = grid;
    var nextMoveResult = {};
    var waitForHuman = false;
    var aiStatus = this.state.ai;
    if (newGrid[rowName][colNum] === 0 && currentTurn !== 0) {
      do {
        i++;
        nextMoveResult = logic.getNextMove(newGrid, rowName, colNum, currentTurn, aiStatus);
        if (nextMoveResult.winCondition[0] === 1) {
          this.handleWin(nextMoveResult.winCondition);
          this.setState({
            grid: nextMoveResult.newGrid
          });
          return;
        } else if (nextMoveResult.winCondition[0] === -1) {
          this.setState({
            grid: nextMoveResult.newGrid,
            winner: -1
          });
        } else {
          newGrid = nextMoveResult.newGrid;
          currentTurn = 2 - (++nextMoveResult.currentTurn % 2);
          this.setState({
            grid: newGrid,
            turn: currentTurn
          });
          if (aiStatus[currentTurn - 1] === 0) {
            waitForHuman = true;
          }
        }
      } while (!waitForHuman && i < 10);
    }
  },
  handleWin: function(winCondition) {
    this.setState({
      turn: 0,
      winner: winCondition[1]
    });
  },
  handleReset: function() {
    this.setState({
      grid: {
        row1: [0, 0, 0],
        row2: [0, 0, 0],
        row3: [0, 0, 0]
      },
      turn: 1,
      winner: 0
    });
  },
  handleChangeP1: function() {
    var newAIStatus = this.state.ai;
    newAIStatus[0] = document.getElementById("P1Status").selectedIndex;
    this.setState({
      ai: newAIStatus
    });
  },
  handleChangeP2: function() {
    var newAIStatus = this.state.ai;
    newAIStatus[1] = document.getElementById("P2Status").selectedIndex;
    console.log(newAIStatus);
    this.setState({
      ai: newAIStatus
    });
  },
  render: function() {
    return (
      <div>
          <TicTacToeGame
            grid={this.state.grid}
            turn={this.state.turn}
            onUserClick={this.handleClick} />
          <StatusArea
            turn={this.state.turn}
            win={this.state.win}
            winner={this.state.winner}
            onReset={this.handleReset}
            onChangeP1={this.handleChangeP1}
            onChangeP2={this.handleChangeP2}
            aiStatus={this.state.ai} />
      </div>
    );
  }
});

module.exports = TicTacToeContainer;
