const productionsObj = require("../main");

describe("CNFConverter", () => {
  it("normalized the grammar to Chomsky Normal Form", () => {
    expect(productionsObj).toEqual({
      S: "bA | AC | bS | BC | AbX | B",
      A: "bS | BC | AbX | BbX | a | bX",
      B: "BbX | a | bX",
      X: "Sa",
    });
  });
});
