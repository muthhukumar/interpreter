use crate::{
    ast::Program,
    lexer::{Lexer, Token},
};

pub struct Parser {
    pub l: Lexer,
    pub cur_token: Token,
    pub peek_token: Token,
    pub errors: Vec<String>,
}

impl Parser {
    pub fn new(l: Lexer) -> Parser {
        let mut parser = Parser {
            l,
            peek_token: Token::Eof,
            cur_token: Token::Eof,
            errors: vec![],
        };

        parser.next_token();
        parser.next_token();

        parser
    }

    pub fn next_token(&mut self) {
        self.cur_token = self.peek_token.clone(); // TODO
        self.peek_token = self.l.next_token().clone(); // TODO
    }

    pub fn parse_program() -> Option<Program> {
        // TODO rmeove the option from here
        None
    }
}
