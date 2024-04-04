const ChomskyNormalForm = require("../CNFConverter");

describe("CNFConverter", () => {
  it("normalized the grammar to Chomsky Normal Form", () => {
    const grammar = {
      variables: ["S", "A", "B", "C", "D"],
      terminals: ["a", "b"],
      productions: {
        S: ["bA", "AC"],
        A: ["bS", "BC", "AbAa"],
        B: ["BbaA", "a", "bSa"],
        C: ["ε"],
        D: ["AB"],
      },
      startSymbol: "S",
    };

    const cnfConverter = new ChomskyNormalForm(grammar);
    cnfConverter.normalizeGrammar();

    const productionsObj = {};
    for (let variable in cnfConverter.productions) {
      let productions = cnfConverter.productions[variable];
      productionsObj[variable] = productions.join(" | ");
    }

    expect(productionsObj).toEqual({
      S: "bA | AC | bS | BC | AbX | B",
      A: "bS | BC | AbX | BbX | a | bX",
      B: "BbX | a | bX",
      X: "Sa",
    });
  });
});
