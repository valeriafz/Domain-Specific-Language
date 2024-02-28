const { isDeterministic } = require("./detOrNondet.js");

// NDFA to DFA Conversion
const convertNDFAtoDFA = (automaton) => {
  if (isDeterministic(automaton)) {
    return automaton;
  }

  let dfa = {
    states: [],
    alphabet: automaton.alphabet,
    initialState: automaton.initialState,
    finalStates: [],
    transitions: {},
  };

  let queue = [automaton.initialState];
  let visited = {};

  while (queue.length > 0) {
    let currentState = queue.shift();
    visited[currentState] = true;
    dfa.states.push(currentState);

    if (automaton.finalStates.includes(currentState)) {
      dfa.finalStates.push(currentState);
    }

    dfa.transitions[currentState] = {};

    for (const symbol of automaton.alphabet) {
      let nextState = [];
      for (const state of automaton.transitions[currentState][symbol] || []) {
        if (!nextState.includes(state)) {
          nextState.push(state);
        }
      }
      dfa.transitions[currentState][symbol] = nextState.sort().join("");
      if (
        !visited[dfa.transitions[currentState][symbol]] &&
        !queue.includes(dfa.transitions[currentState][symbol])
      ) {
        queue.push(dfa.transitions[currentState][symbol]);
      }
    }
  }

  return dfa;
};

module.exports = { convertNDFAtoDFA };
