var React = require("react");
var ReactDOM = require("react-dom");

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
  handleClick: function(row, col) {
    var rowName = "row" + row.toString();
    var colNum = col - 1;
    var newGrid = this.state.grid;
    if (newGrid[rowName][colNum] === 0 && this.state.turn !== 0) {
      newGrid[rowName][colNum] = this.state.turn;
    }
    if (this.checkWin(newGrid)) {
      this.setState({
        win: true
      });
    } else {
      this.setState({
        grid: newGrid,
        turn: 2 - (++this.state.turn % 2)
      });
    }
  },
  checkWin: function() {
    var i;
    var j;
    var product;
    var rowName = "";
    var won;
    // Check rows
    for (i = 0; i < 3; i++) {
      rowName = "row" + (i + 1).toString();
      product = 1;
      for (j = 0; j < 3; j++) {
        product *= this.state.grid[rowName][j];
      }
      if (product === 1 ||  product === 8) {
        won = this.state.turn;
        this.setState({
          turn: 0,
          winner: won
        });
        return true;
      }
    }
    // Check cols
    for (i = 0; i < 3; i++) {
      product = 1;
      for (j = 0; j < 3; j++) {
        rowName = "row" + (j + 1).toString();
        product *= this.state.grid[rowName][i];
      }
      if (product === 1 ||  product === 8) {
        this.setState({
          turn: 0
        });
        return true;
      }
    }
    // Check diagonals
    product = this.state.grid.row1[0] * this.state.grid.row2[1] * this.state.grid.row3[2];
    if (product === 1 ||  product === 8) {
      this.setState({
        turn: 0
      });
      return true;
    }
    product = this.state.grid.row3[0] * this.state.grid.row2[1] * this.state.grid.row1[2];
    if (product === 1 ||  product === 8) {
      this.setState({
        turn: 0
      });
      return true;
    }
    return false;
  },
  /*
  displayRow: function(rowNum) {
    var htmlOutput = [];
    var cellString = "";
    var i;
    for (i = 1; i <= 3; i++) {
      cellString = "";
      cellString += '<td><TicTacToeBox row="';
      cellString += rowNum.toString() + '" col="';
      cellString += i.toString();
      cellString += '" grid={this.state.grid} click={this.handleClick} />';
      cellString += '</td>';
      htmlOutput[i - 1] = cellString;
    }
    return htmlOutput;
  },
  */
  render: function() {
    return (
      <div>
        <h1> Tic-Tac-Toe</h1>
        <table>
          <tbody>
          <tr>
            <td><TicTacToeBox row="1" col="1" grid={this.state.grid} click={
                this.handleClick
              } /></td>
            <td><TicTacToeBox row="1" col="2" grid={this.state.grid} click={
                this.handleClick
              } /></td>
            <td><TicTacToeBox row="1" col="3" grid={this.state.grid} click={
                this.handleClick
              } /></td>
          </tr>
          <tr>
            <td><TicTacToeBox row="2" col="1" grid={this.state.grid} click={
                this.handleClick
              } /></td>
            <td><TicTacToeBox row="2" col="2" grid={this.state.grid} click={
                this.handleClick
              } /></td>
            <td><TicTacToeBox row="2" col="3" grid={this.state.grid} click={
                this.handleClick
              } /></td>
          </tr>
          <tr>
            <td><TicTacToeBox row="3" col="1" grid={this.state.grid} click={
                this.handleClick
              } /></td>
            <td><TicTacToeBox row="3" col="2" grid={this.state.grid} click={
                this.handleClick
              } /></td>
            <td><TicTacToeBox row="3" col="3" grid={this.state.grid} click={
                this.handleClick
              } /></td>
          </tr>
          </tbody>
        </table>
        <StatusBar turn={this.state.turn} win={this.state.win} winner={this.state.winner} />
      </div>
    );
  }
});

var TicTacToeBox = React.createClass({
  render: function() {
    var rowName = "row" + this.props.row.toString();
    var colNum = this.props.col - 1;
    var output = ["", "O", "X"];
    var outputIndex = this.props.grid[rowName][colNum];
    return (
      <div className="TicTacToeBox" onClick={
          this.props.click.bind(null, this.props.row, this.props.col
      )}>
        {output[outputIndex]}
      </div>
    );
  }
});

var StatusBar = React.createClass({
  render: function() {
    return (
      <div>
        <p>
          Turn: {this.props.win ? "" : "Player " + this.props.turn.toString()}
        </p>
        <p>
          Winner: {this.props.win ? "Player " + this.props.winner.toString() : ""}
        </p>
      </div>
    )
  }
});

ReactDOM.render(
  <TicTacToeContainer />, document.getElementById("app")
);
