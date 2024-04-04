const { automatonToRegularGrammar } = require("./finiteToRegular.js");
const { isDeterministic } = require("./detOrNondet.js");
const { convertNDFAtoDFA } = require("./conversion.js");

const automaton = {
  states: ["q0", "q1", "q2", "q3"],
  alphabet: ["a", "b", "c"],
  finalStates: ["q3"],
  transitions: {
    q0: { a: ["q1"], b: ["q2"] },
    q1: { a: ["q3"], b: ["q2"] },
    q2: { c: ["q0", "q3"] },
    q3: { c: ["q3"] },
  },
};

console.log("Regular Grammar:");
console.log(automatonToRegularGrammar(automaton));
console.log("Is Deterministic?", isDeterministic(automaton));
console.log("Deterministic Finite Automaton:");
console.log(convertNDFAtoDFA(automaton));
