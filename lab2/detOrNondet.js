const isDeterministic = (automaton) => {
  const { transitions } = automaton;

  for (const state in transitions) {
    const stateTransitions = transitions[state];

    for (const symbol in stateTransitions) {
      const nextStates = stateTransitions[symbol];

      if (nextStates.length > 1) {
        return false;
      }
    }
  }

  return true;
};

module.exports = { isDeterministic };
