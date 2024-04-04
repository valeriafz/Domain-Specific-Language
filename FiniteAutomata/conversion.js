const convertNDFAtoDFA = (automaton) => {
  const epsilonClosure = (states) => {
    const closure = new Set(states);
    let added = true;

    while (added) {
      added = false;
      for (const state of closure) {
        if (automaton.transitions[state] && automaton.transitions[state]["ε"]) {
          automaton.transitions[state]["ε"].forEach((s) => {
            if (!closure.has(s)) {
              closure.add(s);
              added = true;
            }
          });
        }
      }
    }

    return Array.from(closure);
  };

  const move = (states, symbol) => {
    let reachable = new Set();

    for (const state of states) {
      if (
        automaton.transitions[state] &&
        automaton.transitions[state][symbol]
      ) {
        automaton.transitions[state][symbol].forEach((s) => reachable.add(s));
      }
    }

    return Array.from(reachable);
  };

  const dfa = {
    states: [],
    alphabet: automaton.alphabet,
    transitions: {},
    initialState: [],
    finalStates: [],
  };

  const initialEpsilonClosure = epsilonClosure([automaton.states[0]]);
  dfa.initialState.push(initialEpsilonClosure.join(","));
  dfa.states.push(initialEpsilonClosure);

  const queue = [initialEpsilonClosure];
  const processed = new Set();

  while (queue.length > 0) {
    const currentState = queue.shift();
    processed.add(currentState);

    for (const finalState of automaton.finalStates) {
      if (currentState.includes(finalState)) {
        dfa.finalStates.push(currentState.join(","));
        break;
      }
    }

    for (const symbol of automaton.alphabet) {
      const nextState = epsilonClosure(move(currentState, symbol));

      if (nextState.length > 0) {
        dfa.transitions[currentState.join(",") + "|" + symbol] =
          nextState.join(",");

        if (!processed.has(nextState.join(","))) {
          queue.push(nextState);
          dfa.states.push(nextState);
        }
      }
    }
  }

  // console.log("DFA States:");
  // console.log(dfa.states.map((s) => s.join(",")));

  // console.log("DFA Transitions:");
  // console.log(dfa.transitions);

  // console.log("DFA Final States:");
  // console.log(dfa.finalStates);

  return dfa;
};

module.exports = { convertNDFAtoDFA };
