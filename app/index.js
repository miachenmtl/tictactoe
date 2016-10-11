var React = require("react");
var ReactDOM = require("react-dom");
var TicTacToeContainer = require("./TicTacToeContainer");

var AppWrapper = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Tic-Tac-Toe</h1>
        <TicTacToeContainer />
      </div>
    );
  }
});

ReactDOM.render(
  <AppWrapper />, document.getElementById("app")
);
