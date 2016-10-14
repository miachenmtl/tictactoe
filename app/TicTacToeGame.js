var React = require("react");

var TicTacToeGame = React.createClass({
  render: function() {
    return (
      <table className="TicTacToeGame">
        <tbody>
          <TicTacToeRow {...this.props} row="1" />
          <TicTacToeRow {...this.props} row="2" />
          <TicTacToeRow {...this.props} row="3" />
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
          this.props.onUserClick.bind(
            null,
            this.props.grid,
            this.props.row,
            this.props.col,
            this.props.turn
      )}>
        {output[outputIndex]}
      </div>
    );
  }
});

module.exports = TicTacToeGame;
