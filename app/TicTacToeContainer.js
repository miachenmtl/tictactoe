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
    var rowName = "row" + row.toString();
    var colNum = col - 1;
    var newGrid = grid;
    var nextMoveResult = {};
    var aiStatus = this.state.ai;
    var that = this;
    if (
        (newGrid[rowName][colNum] === 0 || aiStatus[currentTurn - 1] > 0) &&
        currentTurn > 0
      ) {
      nextMoveResult = logic.getNextMove(
        newGrid,
        rowName,
        colNum,
        currentTurn,
        aiStatus
      );
      if (nextMoveResult.winCondition[0] === 1) {
        this.handleWin(nextMoveResult.winCondition);
        this.setState({
          grid: nextMoveResult.newGrid
        });
        return;
      } else if (nextMoveResult.winCondition[0] === -1) {
        this.setState({
          grid: nextMoveResult.newGrid,
          turn: -1,
          winner: -1
        });
      } else {
        newGrid = nextMoveResult.newGrid;
        currentTurn = 2 - (++nextMoveResult.currentTurn % 2);
        this.setState({
          grid: newGrid,
          turn: currentTurn
        });
        if (aiStatus[currentTurn - 1] > 0) {
          window.setTimeout(function() {
            that.handleClick(newGrid, 1, 1, currentTurn);
          }, 250);
        }
      }
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
