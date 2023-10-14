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
  TYPE_LETTER,
  TYPE_STRING
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
      let number = character;

      while (isNumber(input[++cursor])) {
        number += input[cursor];
      }

      tokens.push({
        type: TYPE_NUMBER,
        value: parseInt(number, 10)
      })

      continue;
    }

    if (isLetter(character)) {
      let symbol = character;

      while (isLetter(input[++cursor])) {
        symbol += input[cursor];
      }

      tokens.push({
        type: TYPE_LETTER,
        value: symbol
      })

      continue;
    }

    if (isQuote(character)) {
      let string = '';

      while (!isQuote(input[++cursor])) {
        string += input[cursor];
      }

      tokens.push({
        type: TYPE_STRING,
        value: string
      })

      cursor++;
      continue;
    }

    throw new Error(`Unknown character type: ${character}`)
  }

  return tokens;
};

module.exports = { tokenize };
