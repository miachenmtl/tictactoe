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
    }
  },
  handleClick: function(grid, row, col, currentTurn) {
    var rowName = "row" + row.toString();
    var colNum = col - 1;
    var newGrid = grid;
    var winCondition;
    var aiStatus = this.state.ai[currentTurn - 1];
    if (newGrid[rowName][colNum] === 0 && currentTurn !== 0) {
      if (aiStatus) {
        newGrid = logic.getAIMove(newGrid, currentTurn, aiStatus);
      } else {
        newGrid[rowName][colNum] = currentTurn;
      }
      winCondition = logic.checkWin(newGrid);
      if (winCondition[0]) {
        this.handleWin(winCondition[1]);
        console.log("We have a winner")
      } else {
        console.log("the game continues")
        this.setState({
          grid: newGrid,
          turn: 2 - (++currentTurn % 2)
        });
      }
    }
  },
  handleWin: function(player) {
    this.setState({
      turn: 0,
      winner: player
    });
  },
  handleReset: function() {
    this.setState(this.getInitialState());
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
            onReset={this.handleReset} />
      </div>
    );
  }
});

module.exports = TicTacToeContainer;
