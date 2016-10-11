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
      win: false,
      winner: 0
    }
  },
  handleClick: function(grid, row, col, currentTurn) {
    var rowName = "row" + row.toString();
    var colNum = col - 1;
    var newGrid = this.state.grid;
    if (newGrid[rowName][colNum] === 0 && this.state.turn !== 0) {
      newGrid[rowName][colNum] = this.state.turn;
      if (logic.checkWin(newGrid)) {
        this.handleWin();
      } else {
        this.setState({
          grid: newGrid,
          turn: 2 - (++this.state.turn % 2)
        });
      }
    }
  },
  handleWin: function() {
    won = this.state.turn;
    this.setState({
      turn: 0,
      winner: won
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
