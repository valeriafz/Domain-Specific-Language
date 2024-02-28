// Finite Automaton to Regular Grammar Conversion
const automatonToRegularGrammar = (automaton) => {
  let regularGrammar = {};

  for (const state of automaton.states) {
    regularGrammar[state] = {};

    for (const symbol of automaton.alphabet) {
      if (automaton.transitions[state][symbol]) {
        if (!regularGrammar[state][symbol]) {
          regularGrammar[state][symbol] = [];
        }
        regularGrammar[state][symbol].push(
          automaton.transitions[state][symbol]
        );
      }
    }
  }

  return regularGrammar;
};

module.exports = { automatonToRegularGrammar };
