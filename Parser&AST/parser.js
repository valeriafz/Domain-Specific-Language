const { TokenType, OperatorNode, NumberNode } = require("./types");

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
  }

  parse() {
    return this.expression();
  }

  expression() {
    let node = this.term();

    while (this.match(TokenType.OPERATOR)) {
      const operator = this.peek().value;
      this.advance();
      const right = this.term();
      node = new OperatorNode(operator, node, right);
    }

    return node;
  }

  term() {
    const token = this.peek();

    if (token.type === TokenType.NUMBER) {
      this.advance();
      return new NumberNode(token.value);
    } else if (token.type === TokenType.PARENTHESIS && token.value === "(") {
      this.advance(); // Consume the '(' token
      const expr = this.expression(); // Parse the enclosed expression
      this.consume(TokenType.PARENTHESIS, ")"); // Ensure matching ')'
      return expr;
    } else {
      throw new Error(`Unexpected token: ${token.value}`);
    }
  }

  advance() {
    return this.tokens[this.current++];
  }

  match(expectedType) {
    if (this.isAtEnd()) return false;
    return this.peek().type === expectedType;
  }

  consume(expectedType, value) {
    const token = this.advance();
    if (token.type !== expectedType || token.value !== value) {
      throw new Error(`Expected ${expectedType} '${value}'`);
    }
  }

  peek() {
    return this.tokens[this.current];
  }

  isAtEnd() {
    return this.current >= this.tokens.length;
  }
}

module.exports = Parser;
