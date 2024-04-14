class ChomskyNormalForm {
  constructor(grammar) {
    this.variables = grammar.variables;
    this.terminals = grammar.terminals;
    this.productions = grammar.productions;
    this.startSymbol = grammar.startSymbol;
  }

  eliminateEpsilonProductions() {
    let epsilonProducingVariables = [];

    for (let variable of this.variables) {
      if (this.productions[variable].includes("ε")) {
        epsilonProducingVariables.push(variable);
      }
    }

    let foundEpsilon = true;
    while (foundEpsilon) {
      foundEpsilon = false;
      for (let variable of this.variables) {
        let productions = this.productions[variable];
        for (let production of productions) {
          if (production === "ε") {
            this.productions[variable] = productions.filter((p) => p !== "ε");
            foundEpsilon = true;
            break;
          }
          for (let epsilonVariable of epsilonProducingVariables) {
            if (production.includes(epsilonVariable)) {
              let newProduction = production.replace(epsilonVariable, "");
              this.productions[variable].push(newProduction);
            }
          }
        }
      }
    }
  }

  eliminateRenaming() {
    for (let variable of this.variables) {
      let productions = this.productions[variable];
      let newProductions = [];
      let encounteredProductions = new Set();
      for (let production of productions) {
        if (production.length === 1 && this.variables.includes(production)) {
          for (let definition of this.productions[production]) {
            if (!encounteredProductions.has(definition)) {
              newProductions.push(definition);
              encounteredProductions.add(definition);
            }
          }
        } else {
          if (!encounteredProductions.has(production)) {
            newProductions.push(production);
            encounteredProductions.add(production);
          }
        }
      }

      this.productions[variable] = newProductions;
    }
  }

  eliminateInaccessibleSymbols() {
    let reachable = new Set();
    let queue = [this.startSymbol];

    while (queue.length > 0) {
      let current = queue.shift();
      reachable.add(current);
      for (let production of this.productions[current]) {
        let symbols = production
          .split("")
          .filter((symbol) => this.variables.includes(symbol));
        for (let symbol of symbols) {
          if (!reachable.has(symbol)) {
            queue.push(symbol);
          }
        }
      }
    }

    for (let variable of this.variables) {
      if (!reachable.has(variable)) {
        delete this.productions[variable];
      }
    }
  }

  eliminateNonProductiveSymbols() {
    let productive = new Set();

    this.terminals.forEach((terminal) => productive.add(terminal));

    let previousSize = 0;
    while (productive.size !== previousSize) {
      previousSize = productive.size;

      for (let variable in this.productions) {
        let productions = this.productions[variable];
        for (let production of productions) {
          let symbols = production.split("");
          let allProductive = true;
          for (let symbol of symbols) {
            if (!productive.has(symbol)) {
              allProductive = false;
              break;
            }
          }
          if (allProductive) {
            productive.add(variable);
          }
        }
      }
    }

    for (let variable in this.productions) {
      if (!productive.has(variable)) {
        delete this.productions[variable];
      }
    }
  }

  convertToCNF() {
    for (let variable in this.productions) {
      let productions = this.productions[variable];
      let newProductions = [];
      for (let production of productions) {
        let symbols = production.split("");
        if (symbols.length > 2) {
          // Replace production
          let newVariable = "X";
          this.variables.push(newVariable);
          this.productions[newVariable] = [symbols.slice(-2).join("")];
          newProductions.push(symbols.slice(0, -2).join("") + newVariable);
        } else {
          newProductions.push(production);
        }
      }
      this.productions[variable] = newProductions;
    }

    for (let variable in this.productions) {
      let productions = this.productions[variable];
      let newProductions = [];
      for (let production of productions) {
        if (
          production.length === 2 &&
          this.variables.includes(production[0]) &&
          this.terminals.includes(production[1])
        ) {
          // Convert the production into a single variable
          let newVariable = "X";
          this.variables.push(newVariable);
          this.productions[newVariable] = [production[1]];
          newProductions.push(production[0] + production[1]);
        } else {
          newProductions.push(production);
        }
      }
      this.productions[variable] = newProductions;
    }
  }

  normalizeGrammar() {
    this.eliminateEpsilonProductions();
    this.eliminateRenaming();
    this.eliminateInaccessibleSymbols();
    this.eliminateNonProductiveSymbols();
    this.convertToCNF();
  }
}

module.exports = ChomskyNormalForm;
