// Finite Automaton to Regular Grammar Conversion
const automatonToRegularGrammar = (automaton) => {
  const { states, transitions } = automaton;
  let grammar = "";

  grammar += "S → " + states.join(" | ") + "\n";

  // generate production rules
  for (const state in transitions) {
    for (const symbol in transitions[state]) {
      const nextStates = transitions[state][symbol];
      const nonTerminal = state + symbol.toUpperCase();
      grammar +=
        nonTerminal + " → " + nextStates.map((s) => s + state).join(" | ");
      grammar += "\n";
    }
  }

  return grammar;
};

module.exports = { automatonToRegularGrammar };
