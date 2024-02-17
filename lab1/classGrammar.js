const FiniteAutomaton = require("../lab1/classFiniteAutomation.js");

class Grammar {
  VN = ["S", "B", "D"];
  VT = ["a", "b", "c"];
  P = {
    S: ["aB", "bB"],
    B: ["bD", "cB", "aS"],
    D: ["b", "aD"],
  };

  generateStrings() {
    const strings = [];

    for (let i = 0; i < 5; i++) {
      let string = this.generateStringHelper("S");
      strings.push(string);
    }

    return strings;
  }

  generateStringHelper(symbol) {
    if (this.VT.includes(symbol)) {
      return symbol;
    }

    const productions = this.P[symbol];
    const chosenProduction =
      productions[Math.floor(Math.random() * productions.length)];
    let generatedString = "";

    for (let i = 0; i < chosenProduction.length; i++) {
      generatedString += this.generateStringHelper(chosenProduction[i]);
    }

    return generatedString;
  }

  toFiniteAutomaton() {
    const automaton = new FiniteAutomaton();

    automaton.states = new Set([...this.VN, ...this.VT]);

    for (const symbol in this.P) {
      automaton.transitions[symbol] = this.P[symbol];
    }

    automaton.initialState = "S";
    automaton.acceptStates.add("D");

    return automaton;
  }
}

module.exports = Grammar;
