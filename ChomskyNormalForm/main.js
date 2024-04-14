const ChomskyNormalForm = require("./CNFConverter");

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

console.log(productionsObj);

module.exports = productionsObj;
