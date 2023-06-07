// type Parser struct {
//     l *lexer.Lexer
//
//     curToken  token.Token
//     peekToken token.Token
// }
//
// func New(l *lexer.Lexer) *Parser {
//     p := &Parser{l: l}
//
//     // Read two tokens, so curToken and peekToken are both set
//     p.nextToken()
//     p.nextToken()
//
//     return p
// }
//
// func (p *Parser) nextToken() {
//     p.curToken = p.peekToken
//     p.peekToken = p.l.NextToken()
// }
//
// func (p *Parser) ParseProgram() *ast.Program {
//     return nil

import { Program } from "../ast";
import { Lexer, Token } from "../lexer";

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

  parseProgram(): Program | null {
    // TODO
    return null;
  }
}
