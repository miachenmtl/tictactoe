var expect = require("chai").expect;
var logic = require("../app/logic.js");

describe("Get Legal Moves", function() {
  var testGrid = {
    row1: [0, 1, 2],
    row2: [2, 1, 0],
    row3: [0, 0, 1]
  };
  it("returns an array having a length corresponding to number of remaining blank squares", function() {
    var resultArray = logic.getLegalMoves(testGrid);
    expect(resultArray.length).to.equal(4);
  });
  it("returns an array of coordinates of remaining blank squares", function() {
    var resultArray = logic.getLegalMoves(testGrid);
    expect(resultArray[0]).to.deep.equal([1, 1]);
    expect(resultArray[1]).to.deep.equal([2, 3]);
    expect(resultArray[2]).to.deep.equal([3, 1]);
    expect(resultArray[3]).to.deep.equal([3, 2]);
  });
});

describe("Check Rows", function() {
  it("returns number of blank, O, and X squares in each row", function() {
    var testGrid = {
      row1: [0, 1, 2],
      row2: [2, 1, 0],
      row3: [0, 0, 1]
    };
    var resultArray = logic.checkRows(testGrid);
    expect(resultArray[0]).to.deep.equal([1, 1, 1]);
    expect(resultArray[1]).to.deep.equal([1, 1, 1]);
    expect(resultArray[2]).to.deep.equal([2, 1, 0]);
  });
});
