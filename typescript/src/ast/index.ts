import type { Token } from "../lexer";

interface AstNode {
  tokenLiteral: () => string;
}

interface Statement extends AstNode {
  statementNode: () => void;
}

interface Expression extends AstNode {
  expressionNode: () => void;
}

class Identifier implements Expression {
  token: Token;
  value: string;

  expressionNode() {}

  tokenLiteral(): string {
    return this.token.literal;
  }
}

class LetStatement implements Statement {
  token: Token;
  name: Identifier;
  value: Expression;

  statementNode() {}

  tokenLiteral(): string {
    return this.token.literal;
  }
}

class Program implements AstNode {
  statements: Array<Statement> = [];

  tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral();
    }

    return "";
  }
}

export { Program, Identifier, LetStatement };
