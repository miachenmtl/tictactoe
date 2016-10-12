var expect = require("chai").expect;
var logic = require("../app/logic");
var helperLogic = require("../app/helperLogic");

describe("Helper Logic Module", function() {
  describe("Get Legal Moves", function() {
    var testGrid = {
      row1: [0, 1, 2],
      row2: [2, 1, 0],
      row3: [0, 0, 1]
    };
    it("returns an array having a length corresponding to number of remaining blank squares", function() {
      var resultArray = helperLogic.getLegalMoves(testGrid);
      expect(resultArray.length).to.equal(4);
    });
    it("returns an array of coordinates of remaining blank squares", function() {
      var resultArray = helperLogic.getLegalMoves(testGrid);
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
      var resultArray = helperLogic.checkRows(testGrid);
      expect(resultArray[0]).to.deep.equal([1, 1, 1]);
      expect(resultArray[1]).to.deep.equal([1, 1, 1]);
      expect(resultArray[2]).to.deep.equal([2, 1, 0]);
    });
  });
  describe("Check Cols", function() {
    it("returns number of blank, O, and X squares in each column", function() {
      var testGrid = {
        row1: [0, 1, 2],
        row2: [2, 1, 0],
        row3: [0, 0, 1]
      };
      var resultArray = helperLogic.checkCols(testGrid);
      expect(resultArray[0]).to.deep.equal([2, 0, 1]);
      expect(resultArray[1]).to.deep.equal([1, 2, 0]);
      expect(resultArray[2]).to.deep.equal([1, 1, 1]);
    });
  });
  describe("Check Diags", function() {
    it("returns number of blank, O, and X squares in both diagonals", function() {
      var testGrid = {
        row1: [0, 1, 2],
        row2: [2, 1, 0],
        row3: [0, 0, 1]
      };
      var resultArray = helperLogic.checkDiags(testGrid);
      expect(resultArray[0]).to.deep.equal([1, 2, 0]);
      expect(resultArray[1]).to.deep.equal([1, 1, 1]);
    });
  });
  describe("Get Position Summary", function() {
    it("concatenates results from checkRows, checkCols, and checkDiags", function() {
      var testGrid = {
        row1: [1, 2, 0],
        row2: [0, 2, 1],
        row3: [2, 1, 0]
      };
      var resultArray = helperLogic.getPositionSummary(testGrid);
      expect(resultArray[1]).to.deep.equal([1, 1, 1]);
      expect(resultArray[5]).to.deep.equal([2, 1, 0]);
      expect(resultArray[7]).to.deep.equal([1, 0, 2]);
    });
  });
});

describe("Logic Module", function() {
  describe("Check Win", function() {
    it("looks for a win condition and returns a bool, the winner, and location code", function() {
      var testGrid1 = {
        row1: [1, 2, 0],
        row2: [2, 1, 0],
        row3: [2, 0, 1]
      };
      var testGrid2 = {
        row1: [1, 2, 0],
        row2: [0, 2, 1],
        row3: [2, 1, 0]
      };
      var resultArray1 = logic.checkWin(testGrid1);
      var resultArray2 = logic.checkWin(testGrid2);
      expect(resultArray1).to.deep.equal([true, 1, 6]);
      expect(resultArray2).to.deep.equal([false, 0, 0]);
    });
  });
});
