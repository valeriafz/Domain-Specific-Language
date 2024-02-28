class Grammar {
  constructor() {
    this.VN = ["S", "B", "D"];
    this.VT = ["a", "b", "c"];
    this.P = {
      S: ["aB", "bB"],
      B: ["bD", "cB", "aS"],
      D: ["b", "aD"],
    };
  }

  classifyChomsky() {
    const { P } = this;

    let maxProductionLength = 0;
    for (const nonTerminal in P) {
      for (const production of P[nonTerminal]) {
        maxProductionLength = Math.max(maxProductionLength, production.length);
      }
    }

    if (maxProductionLength === 1) {
      console.log("The grammar is of Type 3 (Regular Grammar).");
    } else if (maxProductionLength === 2) {
      console.log("The grammar is of Type 2 (Context-Free Grammar).");
    } else if (maxProductionLength === 3) {
      console.log("The grammar is of Type 1 (Context-Sensitive Grammar).");
    } else {
      console.log("The grammar is of Type 0 (Unrestricted Grammar).");
    }
  }
}

const grammar = new Grammar();
grammar.classifyChomsky();
