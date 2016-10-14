var React = require("react");

/** Stateless functional react component
  * @param {object} props Properties
  * @return {object} render
  */
function Header(props) {
  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <p>Click any blank square to prompt AI to play a move.</p>
    </div>
  );
}

module.exports = Header;
