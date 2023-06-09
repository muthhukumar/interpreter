use crate::lexer::Token;

pub trait Node {
    fn token_literal(&self) -> &Token;
}

pub trait Statement: Node {}

trait Expression: Node {}

pub struct Identifier {
    pub token: Token,
    pub value: String,
}

pub struct Expr {}

impl Identifier {
    pub fn new(token: Token, value: String) -> Identifier {
        Identifier { token, value }
    }
}

impl Node for Identifier {
    fn token_literal(&self) -> &Token {
        &self.token
    }
}

impl Expression for Identifier {}

pub struct LetStatement {
    pub token: Token,
    pub name: Option<Identifier>,
    pub value: Option<Expr>,
}

impl LetStatement {
    pub fn new(token: Token) -> LetStatement {
        LetStatement {
            token,
            name: None,
            value: None,
        }
    }
}

impl Node for LetStatement {
    fn token_literal(&self) -> &Token {
        &self.token
    }
}

impl Statement for LetStatement {}

pub struct Program<T: Statement> {
    pub statements: Vec<T>,
}

impl<T: Statement> Program<T> {
    pub fn new() -> Program<T> {
        Program { statements: vec![] }
    }
}

impl<T: Statement> Node for Program<T> {
    fn token_literal(&self) -> &Token {
        &Token::Eof // TODO - fix me
    }
}
