const TokenType = {
  NUMBER: "NUMBER",
  OPERATOR: "OPERATOR",
  PARENTHESIS: "PARENTHESIS",
};

class ASTNode {
  constructor(type) {
    this.type = type;
  }
}

class NumberNode extends ASTNode {
  constructor(value) {
    super("NUMBER");
    this.value = value;
  }
}

class OperatorNode extends ASTNode {
  constructor(operator, left, right) {
    super("OPERATOR");
    this.operator = operator;
    this.left = left;
    this.right = right;
  }
}

module.exports = { TokenType, NumberNode, OperatorNode };
