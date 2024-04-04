class FiniteAutomaton {
  states = new Set();
  transitions = {};
  initialState = "";
  acceptStates = new Set();

  canBeGenerated(inputString) {
    let currentState = this.initialState;

    for (let i = 0; i < inputString.length; i++) {
      const currentSymbol = inputString[i];

      if (!this.transitions[currentState].includes(currentSymbol)) {
        return false;
      }

      currentState = currentSymbol;
    }

    return this.acceptStates.has(currentState);
  }
}

module.exports = FiniteAutomaton;
