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
      turn: 1
    }
  },
  handleClick: function(row, col) {
    var rowName = "row" + row.toString();
    var colNum = col - 1;
    var newGrid = this.state.grid;
    if (newGrid[rowName][colNum] === 0) {
      newGrid[rowName][colNum] = this.state.turn;
    }
    this.setState({
      grid: newGrid,
      turn: 2 - (++this.state.turn % 2)
    });
  },
  render: function() {
    return (
      <div>
        <h1> Tic-Tac-Toe</h1>
        <table>
          <tbody>
            <tr>
              <td>
                <TicTacToeBox row="1" col="1" grid={this.state.grid} click={
                  this.handleClick
                } />
              </td>
              <td>
                <TicTacToeBox row="1" col="2" grid={this.state.grid} click={
                  this.handleClick
                } />
              </td>
              <td>
                <TicTacToeBox row="1" col="3" grid={this.state.grid} click={
                  this.handleClick
                } />
              </td>
            </tr>
            <tr>
              <td>
                <TicTacToeBox row="2" col="1" grid={this.state.grid} click={
                  this.handleClick
                } />
              </td>
              <td>
                <TicTacToeBox row="2" col="2" grid={this.state.grid} click={
                  this.handleClick
                } />
              </td>
              <td>
                <TicTacToeBox row="2" col="3" grid={this.state.grid} click={
                  this.handleClick
                } />
              </td>
            </tr>
            <tr>
              <td>
                <TicTacToeBox row="3" col="1" grid={this.state.grid} click={
                  this.handleClick
                } />
              </td>
              <td>
                <TicTacToeBox row="3" col="2" grid={this.state.grid} click={
                  this.handleClick
                } />
              </td>
              <td>
                <TicTacToeBox row="3" col="3" grid={this.state.grid} click={
                  this.handleClick
                } />
              </td>
            </tr>
          </tbody>
        </table>
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
})

ReactDOM.render(
  <TicTacToeContainer />, document.getElementById("app")
);
