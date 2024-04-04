const Lexer = require("./lexer.js");

const input = "32 * (11 - 2)";
// const input = "32 * (11^2 - 2)";

const lexer = new Lexer(input);
const tokens = lexer.tokenize();
console.log(tokens);
