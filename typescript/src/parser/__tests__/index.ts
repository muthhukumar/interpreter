import { Parser } from "..";
import { LetStatement, Program } from "../../ast";
import { Lexer } from "../../lexer";

const input = `let x = 5;
let y = 10;
let foobar = 838383;`;

describe("Parses the let statement", () => {
  let lexer: Lexer;
  let parser: Parser;
  let program: Program;

  beforeEach(() => {
    lexer = new Lexer(input);

    parser = new Parser(lexer);

    program = parser.parseProgram();
  });

  test("Parse program should not return null if valid statements are passed", () => {
    expect(program).toBeTruthy();
  });

  test("should return 3 statements", () => {
    expect(program?.statements.length).toBe(3);
  });

  describe("should return valid identifiers", () => {
    const lexer = new Lexer(input);

    const parser = new Parser(lexer);

    const program = parser.parseProgram();

    const expectedIdentifiers = ["x", "y", "foobar"];

    for (let i = 0; i < expectedIdentifiers.length - 1; i++) {
      const statement = program.statements[i];

      const letTokenLiteral = statement?.tokenLiteral();

      test(`expect to have 'let' token literal on statement.tokenLiteral() for ${JSON.stringify(
        statement
      )}`, () => {
        expect(letTokenLiteral).toBe("let");
      });

      test(`expect let statement instance`, () => {
        expect(statement).toBeInstanceOf(LetStatement);
      });

      const expectedIdentifier = expectedIdentifiers[i];

      const resultedIdentifier =
        statement instanceof LetStatement ? statement.name.value : null;

      test(`expect identifier ${resultedIdentifier} to be ${expectedIdentifier}`, () => {
        expect(resultedIdentifier).toBe(expectedIdentifier);
      });

      const resultedTokenLiteral =
        statement instanceof LetStatement
          ? statement.name.tokenLiteral()
          : null;

      test(`expect letStmt.name.tokenLiteral() '${expectedIdentifier}'. got=${resultedTokenLiteral}`, () => {
        expect(resultedTokenLiteral).toBe(expectedIdentifier);
      });
    }
  });

  test("There should be no parser error", () => {
    expect(parser.errors.length).toBe(0);
  });

  describe("it should show parser error for invalid let statements", () => {
    const input = `“let x 5;
let = 10;
let 838383;`;

    let lexer: Lexer;
    let parser: Parser;

    beforeEach(() => {
      lexer = new Lexer(input);

      parser = new Parser(lexer);

      parser.parseProgram();
    });

    test("There should be 3 errros", () => {
      expect(parser.errors.length).toBe(3);
    });

    const errors = [
      "expected next token to be =, got INT instead",
      "expected next token to be IDENT, got = instead",
      "expected next token to be IDENT, got INT instead",
    ];

    errors.forEach((error, i) => {
      test(`expect reuslt to be ${error}`, () => {
        const result = parser?.errors[i];

        expect(result).toBe(error);
      });
    });
  });
});
