const zeroCharCode = "0".charCodeAt(0);
const nineCharCode = "9".charCodeAt(0);

function isDigit(char: string): boolean {
  const charCode = char.charCodeAt(0);

  return charCode >= zeroCharCode && charCode <= nineCharCode;
}

function isWhiteSpace(char: string): boolean {
  return char == " " || char == "\t" || char == "\n" || char == "\r";
}

function isLetter(ch: string): boolean {
  let aCharCode = "a".charCodeAt(0);
  let zCharCode = "z".charCodeAt(0);
  let ACharCode = "A".charCodeAt(0);
  let ZCharCode = "Z".charCodeAt(0);

  let underscoreCharCode = "_".charCodeAt(0);

  let charCode = ch.charCodeAt(0);

  return (
    (aCharCode <= charCode && charCode <= zCharCode) ||
    (ACharCode <= charCode && charCode <= ZCharCode) ||
    charCode === underscoreCharCode
  );
}

export { isLetter, isDigit, isWhiteSpace };
