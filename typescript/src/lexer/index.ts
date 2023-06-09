import { isDigit, isLetter, isWhiteSpace } from "./utils";
import { EOF } from "./constants";

const Tokens = {
  Illegal: "ILLEGAL",
  Eof: "EOF",

  // IDENTIFIES + LITERALS
  Ident: "IDENT",
  Int: "INT",

  // Operators
  Assign: "=",
  Plus: "+",
  Minus: "-",
  LessThan: "<",
  GreaterThan: ">",
  Bang: "!",
  ForwardSlash: "/",
  Asterisk: "*",

  Equal: "==",
  NotEqual: "!=",

  // Delimeters
  Comma: ",",
  SemiColon: ";",

  LParen: "(",
  RParen: ")",
  LSquirly: "{",
  RSquirly: "}",

  // keywords
  Function: "FUNCTION",
  Let: "LET",
  True: "TRUE",
  False: "FALSE",
  If: "IF",
  Else: "ELSE",
  Return: "RETURN",
} as const;

type TokenType = (typeof Tokens)[keyof typeof Tokens];

type Token = {
  type: TokenType;
  literal: string;
};

function createToken(tokenType: Token["type"], ch: Token["literal"]): Token {
  return {
    type: tokenType,
    literal: ch,
  };
}

const Keywords = {
  fn: Tokens.Function,
  let: Tokens.Let,
  true: Tokens.True,
  false: Tokens.False,
  if: Tokens.If,
  else: Tokens.Else,
  return: Tokens.Return,
} as const;

function lookUpIdent(word: string): Token["type"] {
  if (!Keywords[word]) {
    return Tokens.Ident;
  }

  return Keywords[word];
}

class Lexer {
  private position: number = 0;
  private readPosition: number = 0;
  private ch!: string;
  private input: string;

  constructor(input: string) {
    this.input = input;
    this.readChar();
  }

  readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.ch = EOF;
    } else {
      this.ch = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }

  nextToken(): Token {
    let tok: Token | undefined;

    this.skipWhiteSpace();

    switch (this.ch) {
      case "=": {
        if (this.peakChar() === "=") {
          const char = this.ch;
          this.readChar();
          const literal = `${char}${this.ch}`;

          tok = createToken(Tokens.Equal, literal);
        } else {
          tok = createToken(Tokens.Assign, this.ch);
        }
        break;
      }
      case ";": {
        tok = createToken(Tokens.SemiColon, this.ch);
        break;
      }
      case "(": {
        tok = createToken(Tokens.LParen, this.ch);
        break;
      }
      case ")": {
        tok = createToken(Tokens.RParen, this.ch);
        break;
      }
      case ",": {
        tok = createToken(Tokens.Comma, this.ch);
        break;
      }
      case "{": {
        tok = createToken(Tokens.LSquirly, this.ch);
        break;
      }
      case "}": {
        tok = createToken(Tokens.RSquirly, this.ch);
        break;
      }
      case "+": {
        tok = createToken(Tokens.Plus, this.ch);
        break;
      }
      case "!": {
        if (this.peakChar() === "=") {
          const char = this.ch;
          this.readChar();
          const literal = `${char}${this.ch}`;

          tok = createToken(Tokens.NotEqual, literal);
        } else {
          tok = createToken(Tokens.Bang, this.ch);
        }
        break;
      }
      case "/": {
        tok = createToken(Tokens.ForwardSlash, this.ch);
        break;
      }
      case "*": {
        tok = createToken(Tokens.Asterisk, this.ch);
        break;
      }
      case ">": {
        tok = createToken(Tokens.GreaterThan, this.ch);
        break;
      }
      case "<": {
        tok = createToken(Tokens.LessThan, this.ch);
        break;
      }
      case "-": {
        tok = createToken(Tokens.Minus, this.ch);
        break;
      }
      case EOF: {
        tok = createToken(Tokens.Eof, "eof");
        break;
      }

      default: {
        if (isLetter(this.ch)) {
          const result = this.readIdentifier();

          return createToken(lookUpIdent(result), result);
        } else if (isDigit(this.ch)) {
          const result = this.readNumber();

          return createToken(Tokens.Int, result);
        } else {
          tok = createToken(Tokens.Illegal, this.ch);
        }
      }
    }

    this.readChar();
    return tok as Token;
  }

  readIdentifier(): string {
    const position = this.position;

    while (isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  readNumber(): string {
    const position = this.position;

    while (isDigit(this.ch)) {
      this.readChar();
    }

    return this.input.slice(position, this.position);
  }

  skipWhiteSpace() {
    while (isWhiteSpace(this.ch)) {
      this.readChar();
    }
  }

  peakChar(): string {
    if (this.readPosition >= this.input.length) {
      return EOF;
    }

    return this.input[this.readPosition];
  }
}

export { Tokens, type TokenType, Lexer, type Token };
