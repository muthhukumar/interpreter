pub mod lexer;

#[cfg(test)]
mod test {
    use super::lexer::{Token, Tokenaizer};

    #[test]
    fn test_operators() {
        let input: String = "=+(){},;".to_string();

        let tokens: Vec<Token> = vec![
            Token::Assign,
            Token::Plus,
            Token::LParen,
            Token::RParen,
            Token::LSquirly,
            Token::RSquirly,
            Token::Comma,
            Token::SemiColon,
        ];

        let mut tokenaizer = Tokenaizer::new(input);

        for token in tokens {
            let next_token = tokenaizer.next_token();

            let message = format!("expect {:?} to be {:?}", next_token, token);

            assert_eq!(token, next_token, "{}", message);
        }
    }

    #[test]
    fn test_all_tokens() {
        let input: String = "\n
        let five = 5;
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
10 != 9;"
            .to_string();

        let tokens: Vec<Token> = vec![
            Token::Let,
            Token::Ident("five".to_string()),
            Token::Assign,
            Token::Int(5.to_string()),
            Token::SemiColon,
            Token::Let,
            Token::Ident("ten".to_string()),
            Token::Assign,
            Token::Int(10.to_string()),
            Token::SemiColon,
            Token::Let,
            Token::Ident("add".to_string()),
            Token::Assign,
            Token::Function,
            Token::LParen,
            Token::Ident("x".to_string()),
            Token::Comma,
            Token::Ident("y".to_string()),
            Token::RParen,
            Token::LSquirly,
            Token::Ident("x".to_string()),
            Token::Plus,
            Token::Ident("y".to_string()),
            Token::SemiColon,
            Token::RSquirly,
            Token::SemiColon,
            Token::Let,
            Token::Ident("result".to_string()),
            Token::Assign,
            Token::Ident("add".to_string()),
            Token::LParen,
            Token::Ident("five".to_string()),
            Token::Comma,
            Token::Ident("ten".to_string()),
            Token::RParen,
            Token::SemiColon,
            Token::Bang,
            Token::Minus,
            Token::ForwardSlash,
            Token::Asterisk,
            Token::Int(5.to_string()),
            Token::SemiColon,
            Token::Int(5.to_string()),
            Token::LessThan,
            Token::Int(10.to_string()),
            Token::GreaterThan,
            Token::Int(5.to_string()),
            Token::SemiColon,
            Token::If,
            Token::LParen,
            Token::Int(5.to_string()),
            Token::LessThan,
            Token::Int(10.to_string()),
            Token::RParen,
            Token::LSquirly,
            Token::Return,
            Token::True,
            Token::SemiColon,
            Token::RSquirly,
            Token::Else,
            Token::LSquirly,
            Token::Return,
            Token::False,
            Token::SemiColon,
            Token::RSquirly,
            Token::Int(10.to_string()),
            Token::Equal,
            Token::Int(10.to_string()),
            Token::SemiColon,
            Token::Int(10.to_string()),
            Token::NotEqual,
            Token::Int(9.to_string()),
            Token::SemiColon,
            Token::Eof,
        ];

        let mut tokenaizer = Tokenaizer::new(input);

        for token in tokens {
            let next_token = tokenaizer.next_token();
            let message = format!("expect {:?} to be {:?}", next_token, token);

            assert_eq!(token, next_token, "{}", message);
        }
    }
}
