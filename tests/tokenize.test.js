import { tokenize } from '../src/tokenize';
import {
  TYPE_LETTER,
  TYPE_NUMBER,
  TYPE_PARENTHESIS,
  TYPE_STRING
} from '../src/constants';

describe(tokenize, () => {
  it('should return an array', () => {
    expect(Array.isArray(tokenize(''))).toBe(true);
  });

  it('should be able to tokenize a pair of parentheses', () => {
    const input = '()';
    const result = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it('should ignore whitespace completely', () => {
    const input = '                  ';
    const result = [];

    expect(tokenize(input)).toEqual(result);
  });

  // Exercise 1 - Begin
  it('should correctly tokenize a single digit', () => {
    const input = '2';
    const result = [{ type: TYPE_NUMBER, value: 2 }];

    expect(tokenize(input)).toEqual(result);
  });

  it('should be able to handle single numbers in expressions', () => {
    const input = '(1 2)';

    const result = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_NUMBER, value: 1 },
      { type: TYPE_NUMBER, value: 2 },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it('should be able to handle single letters in expressions', () => {
    const input = '(a b)';

    const result = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'a' },
      { type: TYPE_LETTER, value: 'b' },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    expect(tokenize(input)).toEqual(result);
  });
  // Exercise 1: End

  it('should be able to handle multiple-digit numbers', () => {
    const input = '(11 22)';

    const result = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_NUMBER, value: 11 },
      { type: TYPE_NUMBER, value: 22 },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  // Exercise 2 Begin
  it('should correctly tokenize a simple expression', () => {
    const input = '(add 2 3)';
    const result = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'add' },
      { type: TYPE_NUMBER, value: 2 },
      { type: TYPE_NUMBER, value: 3 },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    expect(tokenize(input)).toEqual(result);
  });

  it('should ignore whitespace', () => {
    const input = '   (add    2 3)';
    const result = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'add' },
      { type: TYPE_NUMBER, value: 2 },
      { type: TYPE_NUMBER, value: 3 },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    expect(tokenize(input)).toEqual(result);
  });
  // Exercise 2 End

  it('should know about strings', () => {
    const input = '(log "hello" "world")';
    const result = [
      { type: TYPE_PARENTHESIS, value: '(' },
      { type: TYPE_LETTER, value: 'log' },
      { type: TYPE_STRING, value: 'hello' },
      { type: TYPE_STRING, value: 'world' },
      { type: TYPE_PARENTHESIS, value: ')' },
    ];

    expect(tokenize(input)).toEqual(result);
  });
});
