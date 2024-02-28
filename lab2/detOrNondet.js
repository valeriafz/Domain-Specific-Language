// if Finite Automaton is Deterministic or Non-Deterministic
const isDeterministic = (automaton) => {
  for (const state of automaton.states) {
    for (const symbol of automaton.alphabet) {
      if (Array.isArray(automaton.transitions[state][symbol])) {
        return false;
      }
    }
  }
  return true;
};

module.exports = { isDeterministic };
