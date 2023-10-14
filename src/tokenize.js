const {
  isLetter,
  isWhitespace,
  isNumber,
  isParenthesis,
  isQuote,
} = require('./identify');
const {
  TYPE_PARENTHESIS,
  TYPE_NUMBER,
  TYPE_LETTER
} = require('./constants');

const tokenize = (input) => {
  const tokens = [];
  let cursor = 0;

  while (cursor < input.length) {
    const character = input[cursor];

    if (isParenthesis(character)) {
      tokens.push({
        type: TYPE_PARENTHESIS,
        value: character
      })
      cursor++;
      continue;
    }

    if (isWhitespace(character)) {
      cursor++;
      continue;
    }

    if (isNumber(character)) {
      tokens.push({
        type: TYPE_NUMBER,
        value: +character
      })
      cursor++;
      continue;
    }

    if (isLetter(character)) {
      tokens.push({
        type: TYPE_LETTER,
        value: character
      })
      cursor++;
      continue;
    }

    throw new Error(`Unknown character type: ${character}`)
  }

  return tokens;
};

module.exports = { tokenize };
