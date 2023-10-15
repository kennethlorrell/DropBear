import { parse } from '../src/parse';
import {
  TYPE_CALL_EXPRESSION,
  TYPE_IDENTIFIER, TYPE_LETTER,
  TYPE_NUMBER,
  TYPE_NUMERIC_LITERAL,
  TYPE_PARENTHESIS,
  TYPE_STRING,
  TYPE_STRING_LITERAL,
} from '../src/constants';

describe(parse, () => {
  it('should return a token with the type of NumericLiteral for number tokens', () => {
    const tokens = [{ type: TYPE_NUMBER, value: 2 }];

    const ast = { type: TYPE_NUMERIC_LITERAL, value: 2 };

    expect(parse(tokens)).toEqual(ast);
  });

  // Exercise 3 Begin
  it('should return a token with the type of StringLiteral for string tokens', () => {
    const tokens = [{ type: TYPE_STRING, value: 'hello' }];

    const ast = { type: TYPE_STRING_LITERAL, value: 'hello' };

    expect(parse(tokens)).toEqual(ast);
  });

  it('should return a token with the type of Identifier for name tokens', () => {
    const tokens = [{ type: TYPE_LETTER, value: 'x' }];

    const ast = { type: TYPE_IDENTIFIER, name: 'x' };

    expect(parse(tokens)).toEqual(ast);
  });
  // Exercise 3 End

  it('should return an AST for a basic data structure', () => {
    const tokens = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'add' },
      { type: TYPE_NUMBER, value: 2 },
      { type: TYPE_NUMBER, value: 3 },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    const ast = {
      type: TYPE_CALL_EXPRESSION,
      name: 'add',
      arguments: [
        { type: TYPE_NUMERIC_LITERAL, value: 2 },
        { type: TYPE_NUMERIC_LITERAL, value: 3 },
      ],
    };

    const result = parse(tokens);

    expect(result).toEqual(ast);
  });

  it('should return an AST for a nested data structure', () => {
    const tokens = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'add' },
      { type: TYPE_NUMBER, value: 2 },
      { type: TYPE_NUMBER, value: 3 },
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'subtract' },
      { type: TYPE_NUMBER, value: 4 },
      { type: TYPE_NUMBER, value: 2 },
      { type: TYPE_PARENTHESIS, value: ')' },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    const ast = {
      type: TYPE_CALL_EXPRESSION,
      name: 'add',
      arguments: [
        { type: TYPE_NUMERIC_LITERAL, value: 2 },
        { type: TYPE_NUMERIC_LITERAL, value: 3 },
        {
          type: TYPE_CALL_EXPRESSION,
          name: 'subtract',
          arguments: [
            { type: TYPE_NUMERIC_LITERAL, value: 4 },
            { type: TYPE_NUMERIC_LITERAL, value: 2 },
          ],
        },
      ],
    };

    const result = parse(tokens);

    expect(result).toEqual(ast);
  });
});
