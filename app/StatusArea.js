var React = require("react");
var SelectPlayerTable = require("./SelectPlayerTable");

var StatusArea = React.createClass({
  getWinnerText: function(winner) {
    var winnerText = "";
    if (winner > 0) {
      winnerText = "Player " + winner.toString();
    } else if (winner < 0) {
      winnerText = "Draw";
    }
    return winnerText;
  },
  render: function() {
    return (
      <div>
        <p>
          Turn: {this.props.winner ? "" :
          "Player " + this.props.turn.toString()}
        </p>
        <p>
          Winner: {this.getWinnerText(this.props.winner)}
        </p>
        <SelectPlayerTable
          onChangeP1={this.props.onChangeP1}
          onChangeP2={this.props.onChangeP2}
          aiStatus={this.props.aiStatus} />
        <button type="button" onClick={this.props.onReset}>Reset</button>
      </div>
    );
  }
});

module.exports = StatusArea;
