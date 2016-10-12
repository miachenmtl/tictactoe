var React = require("react");
var ReactDOM = require("react-dom");
var Header = require("./Header")
var TicTacToeContainer = require("./TicTacToeContainer");

var AppWrapper = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        <TicTacToeContainer />
      </div>
    );
  }
});

ReactDOM.render(
  <AppWrapper />, document.getElementById("app")
);
