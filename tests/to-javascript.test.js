const { toJavaScript } = require('../src/to-javascript');
const {
  TYPE_CALL_EXPRESSION,
  TYPE_NUMERIC_LITERAL, TYPE_VARIABLE_DECLARATION, TYPE_IDENTIFIER
} = require('../src/constants');

describe(toJavaScript, () => {
  it('should reformate Dropbear to valid JavaScript', () => {
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

    expect(toJavaScript(ast)).toBe('add(2, 3, subtract(5, 4))');
  });

  it('should support variables', () => {
    const ast = {
      type: TYPE_VARIABLE_DECLARATION,
      identifier: {
        type: TYPE_IDENTIFIER,
        name: 'x'
      },
      assignment: {
        type: TYPE_NUMERIC_LITERAL,
        value: 2
      }
    };

    expect(toJavaScript(ast)).toBe('let x = 2;');
  });
});
