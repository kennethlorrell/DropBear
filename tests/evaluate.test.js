import { evaluate } from '../src/evaluate';
import {
  TYPE_CALL_EXPRESSION,
  TYPE_IDENTIFIER,
  TYPE_NUMERIC_LITERAL,
  TYPE_STRING_VALUE
} from '../src/constants';

describe(evaluate, () => {
  it('should fall back to returning a primitive numeric value', () => {
    const ast = { type: TYPE_NUMERIC_LITERAL, value: 2 };

    expect(evaluate(ast)).toBe(2);
  });

  it('should fall back to returning a primitive string value', () => {
    const ast = { type: TYPE_STRING_VALUE, value: 'Hello' };

    expect(evaluate(ast)).toBe('Hello');
  });

  it('should be able to evaluate a single expression', () => {
    const ast = {
      type: TYPE_CALL_EXPRESSION,
      name: 'add',
      arguments: [
        { type: TYPE_NUMERIC_LITERAL, value: 2 },
        { type: TYPE_NUMERIC_LITERAL, value: 3 },
      ],
    };

    const result = evaluate(ast);

    expect(result).toBe(5);
  });

  it('should be able to evaluate a nested expression', () => {
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
            { type: TYPE_NUMERIC_LITERAL, value: 5 },
            { type: TYPE_NUMERIC_LITERAL, value: 4 },
          ],
        },
      ],
    };

    const result = evaluate(ast);

    expect(result).toBe(6);
  });

  it('should be able to lookup identifiers in the environment', () => {
    const ast = { type: TYPE_IDENTIFIER, name: 'pi' };
    expect(evaluate(ast)).toBe(Math.PI);
  });

  it('should be able to determine the lowest number in a range', () => {
    const ast = {
      type: TYPE_CALL_EXPRESSION,
      name: 'min',
      arguments: [
        { type: TYPE_NUMERIC_LITERAL, value: 2 },
        { type: TYPE_NUMERIC_LITERAL, value: 3 },
        { type: TYPE_NUMERIC_LITERAL, value: 10 },
      ],
    };

    expect(evaluate(ast)).toBe(2);
  });

  it('should be able to determine the highest number in a range', () => {
    const ast = {
      type: TYPE_CALL_EXPRESSION,
      name: 'max',
      arguments: [
        { type: TYPE_NUMERIC_LITERAL, value: 2 },
        { type: TYPE_NUMERIC_LITERAL, value: 3 },
        { type: TYPE_NUMERIC_LITERAL, value: 10 },
      ],
    };

    expect(evaluate(ast)).toBe(10);
  });
});
