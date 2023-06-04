import { Tokenaizer, Tokens } from "..";

describe("test getNextToken()", () => {
  const input = `=+(){},;`;

  const tokens = [
    Tokens.Assign,
    Tokens.Plus,
    Tokens.LParen,
    Tokens.RParen,
    Tokens.LSquirly,
    Tokens.RSquirly,
    Tokens.Comma,
    Tokens.SemiColon,
  ];

  const tokenaizer = new Tokenaizer(input);

  for (const token of tokens) {
    const tokenType = tokenaizer.nextToken().type;

    test(`expect ${tokenType} to be ${token}`, () => {
      expect(tokenType).toBe(token);
    });
  }
});

describe("test all tokens", () => {
  const input = `let five = 5;
let ten = 10;

let add = fn(x, y) {
  x + y;
};

let result = add(five, ten);
!-/*5;
5 < 10 > 5;

if (5 < 10) {
    return true;
} else {
    return false;
}

10 == 10;
10 != 9;`;

  const tokens = [
    Tokens.Let,
    Tokens.Ident,
    Tokens.Assign,
    Tokens.Int,
    Tokens.SemiColon,
    Tokens.Let,
    Tokens.Ident,
    Tokens.Assign,
    Tokens.Int,
    Tokens.SemiColon,
    Tokens.Let,
    Tokens.Ident,
    Tokens.Assign,
    Tokens.Function,
    Tokens.LParen,
    Tokens.Ident,
    Tokens.Comma,
    Tokens.Ident,
    Tokens.RParen,
    Tokens.LSquirly,
    Tokens.Ident,
    Tokens.Plus,
    Tokens.Ident,
    Tokens.SemiColon,
    Tokens.RSquirly,
    Tokens.SemiColon,
    Tokens.Let,
    Tokens.Ident,
    Tokens.Assign,
    Tokens.Ident,
    Tokens.LParen,
    Tokens.Ident,
    Tokens.Comma,
    Tokens.Ident,
    Tokens.RParen,
    Tokens.SemiColon,
    Tokens.Bang,
    Tokens.Minus,
    Tokens.ForwardSlash,
    Tokens.Asterisk,
    Tokens.Int,
    Tokens.SemiColon,
    Tokens.Int,
    Tokens.LessThan,
    Tokens.Int,
    Tokens.GreaterThan,
    Tokens.Int,
    Tokens.SemiColon,
    Tokens.If,
    Tokens.LParen,
    Tokens.Int,
    Tokens.LessThan,
    Tokens.Int,
    Tokens.RParen,
    Tokens.LSquirly,
    Tokens.Return,
    Tokens.True,
    Tokens.SemiColon,
    Tokens.RSquirly,
    Tokens.Else,
    Tokens.LSquirly,
    Tokens.Return,
    Tokens.False,
    Tokens.SemiColon,
    Tokens.RSquirly,
    Tokens.Int,
    Tokens.Equal,
    Tokens.Int,
    Tokens.SemiColon,
    Tokens.Int,
    Tokens.NotEqual,
    Tokens.Int,
    Tokens.SemiColon,
    Tokens.Eof,
  ];

  let tokenaizer = new Tokenaizer(input);

  for (const token of tokens) {
    const nextToken = tokenaizer.nextToken();

    test(`expect ${nextToken.type} to be ${token}`, () => {
      expect(nextToken.type).toBe(token);
    });
  }
});
