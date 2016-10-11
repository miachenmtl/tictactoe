var React = require("react");

var StatusArea = React.createClass({
  render: function() {
    return (
      <div>
        <p>
          Turn: {this.props.win ? "" : "Player " + this.props.turn.toString()}
        </p>
        <p>
          Winner: {this.props.win ? "Player " + this.props.winner.toString() : ""}
        </p>
        <button type="button" onClick={this.props.onReset}>Reset</button>
      </div>
    );
  }
});

module.exports = StatusArea;