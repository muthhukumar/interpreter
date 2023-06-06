const EOF: u8 = 0;

#[derive(Debug, PartialEq)]
pub enum Token {
    Illegal,
    Eof,

    // IDENTIFIES + LITERALS
    Ident(String),
    Int(String),

    // Operators
    Assign,
    Plus,
    Minus,
    LessThan,
    GreaterThan,
    Bang,
    ForwardSlash,
    Asterisk,

    Equal,
    NotEqual,

    // Delimeters
    Comma,
    SemiColon,

    LParen,
    RParen,
    LSquirly,
    RSquirly,

    // keywords
    Function,
    Let,
    True,
    False,
    If,
    Else,
    Return,
}

#[derive(Debug)]
pub struct Tokenaizer {
    position: usize,
    read_position: usize,
    ch: u8,
    input: Vec<u8>,
}

pub fn look_up_ident(unknown_ident: &str) -> Token {
    match unknown_ident {
        "fn" => Token::Function,
        "let" => Token::Let,
        "true" => Token::True,
        "false" => Token::False,
        "if" => Token::If,
        "else" => Token::Else,
        "return" => Token::Return,
        _ => Token::Ident(unknown_ident.to_string()), // FIXME
    }
}

impl Tokenaizer {
    pub fn new(input: String) -> Tokenaizer {
        let mut tokenaizer = Tokenaizer {
            position: 0,
            read_position: 0,
            ch: 0,
            input: input.into_bytes(),
        };

        tokenaizer.init();

        tokenaizer
    }

    fn init(&mut self) {
        self.read_char();
    }

    pub fn read_char(&mut self) {
        self.ch = if self.read_position >= self.input.len() {
            EOF
        } else {
            self.input[self.read_position] // FIXME
        };

        self.position = self.read_position;
        self.read_position += 1;
    }

    pub fn next_token(&mut self) -> Token {
        self.skip_whitespace();

        let tok = match self.ch {
            b'=' => match self.peak() {
                b'=' => {
                    // TODO - maybe refactor this.
                    self.read_char();
                    Token::Equal
                }
                _ => Token::Assign,
            },
            b'!' => match self.peak() {
                b'=' => {
                    self.read_char();
                    Token::NotEqual
                }
                _ => Token::Bang,
            },
            b';' => Token::SemiColon,
            b'(' => Token::LParen,
            b')' => Token::RParen,
            b',' => Token::Comma,
            b'{' => Token::LSquirly,
            b'}' => Token::RSquirly,
            b'+' => Token::Plus,
            b'/' => Token::ForwardSlash,
            b'*' => Token::Asterisk,
            b'>' => Token::GreaterThan,
            b'<' => Token::LessThan,
            b'-' => Token::Minus,
            EOF => Token::Eof,
            _ => {
                if is_letter(self.ch) {
                    let result = self.read_identifier();

                    return look_up_ident(&result);
                } else if is_digit(self.ch) {
                    let result = self.read_number();

                    return Token::Int(result.into());
                } else {
                    Token::Illegal
                }
            }
        };

        self.read_char();

        tok
    }

    fn read_identifier(&mut self) -> String {
        let postion = self.position;

        while is_letter(self.ch) {
            self.read_char()
        }

        let mut result = String::new();

        // FIXME - there might be easier ways to do this
        for (idx, ch) in self.input.iter().enumerate() {
            if idx >= postion && idx < self.position {
                result.push((*ch).into())
            }
        }

        result
    }

    fn peak(&self) -> u8 {
        if self.read_position >= self.input.len() {
            return EOF;
        }

        self.input[self.read_position]
    }

    fn read_number(&mut self) -> String {
        let position = self.position;

        while is_digit(self.ch) {
            self.read_char();
        }

        let mut result = String::new();

        for (idx, ch) in self.input.iter().enumerate() {
            if idx >= position && idx < self.position {
                result.push((*ch).into())
            }
        }

        result
    }

    fn skip_whitespace(&mut self) {
        while is_white_space(self.ch) {
            self.read_char()
        }
    }
}

fn is_white_space(byte: u8) -> bool {
    byte == b' ' || byte == b'\t' || byte == b'\n' || byte == b'\r'
}

fn is_digit(ch: u8) -> bool {
    ch >= b'0' && ch <= b'9'
}

fn is_letter(ch: u8) -> bool {
    ch >= b'a' && ch <= b'z' || ch >= b'A' && ch <= b'Z' || ch == b'_'
}
