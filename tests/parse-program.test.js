const { parseProgram } = require('../src/parse-program');
const {
  TYPE_PARENTHESIS,
  TYPE_LETTER,
  TYPE_NUMBER
} = require('../src/constants');

describe(parseProgram, () => {
  it.skip('should return a program node', () => {
    const tokens = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'define' },
      { type: TYPE_LETTER, value: 'x' },
      { type: TYPE_NUMBER, value: 7 },
      { type: TYPE_PARENTHESIS, value: ')' },
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'add' },
      { type: TYPE_LETTER, value: 'x' },
      { type: TYPE_LETTER, value: 'x' },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    expect(parseProgram(tokens).type).toBe('Program');
  });

  it.skip('should have an array of expressions', () => {
    const tokens = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'define' },
      { type: TYPE_LETTER, value: 'x' },
      { type: TYPE_NUMBER, value: 7 },
      { type: TYPE_PARENTHESIS, value: ')' },
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'add' },
      { type: TYPE_LETTER, value: 'x' },
      { type: TYPE_LETTER, value: 'x' },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    const program = parseProgram(tokens);

    expect(Array.isArray(program.body)).toBe(true);
    expect(program.body.length).toBe(2);
  });
});
