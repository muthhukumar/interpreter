import { Identifier, LetStatement, Program, Statement } from "../ast";
import { Lexer, Token, TokenType, Tokens } from "../lexer";

class Parser {
  l: Lexer;
  curToken: Token;
  peekToken: Token;

  constructor(l: Lexer) {
    this.l = l;

    this.nextToken();
    this.nextToken();
  }

  nextToken() {
    this.curToken = this.peekToken;
    this.peekToken = this.l.nextToken();
  }

  parseLetStatement(): Statement | null {
    const statement = new LetStatement({ token: this.curToken });

    if (!this.expectPeek(Tokens.Ident)) {
      return null;
    }

    statement.name = new Identifier({
      token: this.curToken,
      value: this.curToken.literal,
    });

    if (!this.expectPeek(Tokens.Assign)) {
      return null;
    }

    // For now skipping the expression till we encounter the semicolon
    while (!this.curTokenIs(Tokens.SemiColon)) {
      this.nextToken();
    }

    return statement;
  }

  curTokenIs(t: TokenType): boolean {
    return this.curToken.type === t;
  }

  peekTokenIs(t: TokenType): boolean {
    return this.peekToken.type === t;
  }

  expectPeek(t: TokenType): boolean {
    if (this.peekTokenIs(t)) {
      this.nextToken();
      return true;
    } else {
      return false;
    }
  }

  parseStatement(): Statement | null {
    switch (this.curToken.type) {
      case Tokens.Let: {
        return this.parseLetStatement();
      }
      default: {
        return null;
      }
    }
  }

  parseProgram(): Program {
    const program = new Program();

    while (this.curToken.type !== Tokens.Eof) {
      const statement = this.parseStatement();

      if (statement) {
        program.statements = program.statements.concat(statement);
      }

      this.nextToken();
    }

    return program;
  }
}

export { Parser };
