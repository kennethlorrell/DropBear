const { toJavaScript } = require('../src/to-javascript');
const { TYPE_CALL_EXPRESSION, TYPE_NUMERIC_LITERAL } = require('../src/constants');

describe(toJavaScript, () => {
  it.skip('should reformate Dropbear to valid JavaScript', () => {
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
});
