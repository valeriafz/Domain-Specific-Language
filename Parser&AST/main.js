const Lexer = require("../Lexer/lexer");
const Parser = require("./parser");

const input = "10 + 4 % 5";
const lexer = new Lexer(input);
const tokens = lexer.tokenize();

const parser = new Parser(tokens);
const ast = parser.parse();
console.log(ast);
