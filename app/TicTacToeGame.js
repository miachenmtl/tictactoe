var React = require("react");
var ReactDOM = require("react-dom");
var StatusArea = require("./StatusArea");

var TicTacToeGame = React.createClass({
  render: function() {
    return (
      <table>
        <tbody>
          <TicTacToeRow row="1" grid={this.state.grid}
              click={this.handleClick} turn={this.state.turn} />
          <TicTacToeRow row="2" grid={this.state.grid}
              click={this.handleClick} turn={this.state.turn} />
          <TicTacToeRow row="3" grid={this.state.grid}
              click={this.handleClick} turn={this.state.turn} />
        </tbody>
      </table>
    );
  }
});

var TicTacToeRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td><TicTacToeBox {...this.props} col="1" /></td>
        <td><TicTacToeBox {...this.props} col="2" /></td>
        <td><TicTacToeBox {...this.props} col="3" /></td>
      </tr>
    )
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
          this.props.click.bind(null, this.props.grid, this.props.row, this.props.col,
              this.props.turn
      )}>
        {output[outputIndex]}
      </div>
    );
  }
});

module.exports = TicTacToeGame;
