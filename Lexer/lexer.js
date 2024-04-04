class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class Lexer {
  constructor(input) {
    this.input = input;
    this.position = 0;
  }

  peek() {
    if (this.position < this.input.length) {
      return this.input[this.position];
    }
    return null;
  }

  advance() {
    this.position++;
  }

  isWhiteSpace(char) {
    return /\s/.test(char);
  }

  isDigit(char) {
    return /\d/.test(char);
  }

  isOperator(char) {
    return /[+\-*\/]/.test(char);
  }

  isParenthesis(char) {
    return /[()]/.test(char);
  }

  tokenize() {
    const tokens = [];

    while (this.position < this.input.length) {
      const char = this.peek();

      if (this.isWhiteSpace(char)) {
        this.advance();
      } else if (this.isDigit(char)) {
        let num = "";
        while (this.isDigit(this.peek())) {
          num += this.peek();
          this.advance();
        }
        tokens.push(new Token("NUMBER", parseInt(num)));
      } else if (this.isOperator(char)) {
        tokens.push(new Token("OPERATOR", char));
        this.advance();
      } else if (this.isParenthesis(char)) {
        tokens.push(new Token("PARENTHESIS", char));
        this.advance();
      } else {
        throw new Error(`Invalid character: ${char}`);
      }
    }

    return tokens;
  }
}

module.exports = Lexer;
