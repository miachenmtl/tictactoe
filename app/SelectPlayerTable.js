var React = require("react");

/** Stateless functional react component
  * @param {object} props Properties
  * @return {object} render
  */
function SelectPlayerTable(props) {
  var playerSelect = ["Human", "Clueless AI", "Dumb AI", "Smart AI"];
  return (
    <table>
      <tbody>
        <tr>
          <th>Player 1</th>
          <th>Player 2</th>
        </tr>
        <tr>
          <td>
            <select
              id="P1Status"
              size="4"
              onChange={props.onChangeP1}
              value={playerSelect[props.aiStatus[0]]}>
              <option>Human</option>
              <option>Clueless AI</option>
              <option>Dumb AI</option>
              <option disabled>Smart AI</option>
            </select>
          </td>
          <td>
            <select
              id="P2Status"
              size="4"
              onChange={props.onChangeP2}
              value={playerSelect[props.aiStatus[1]]}>
              <option>Human</option>
              <option>Clueless AI</option>
              <option>Dumb AI</option>
              <option disabled>Smart AI</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

module.exports = SelectPlayerTable;
