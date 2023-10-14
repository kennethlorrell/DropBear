const { transform } = require('../src/transform.js');
const {
  TYPE_CALL_EXPRESSION,
  TYPE_IDENTIFIER,
  TYPE_NUMERIC_LITERAL, TYPE_VARIABLE_DECLARATION
} = require('../src/constants');

describe(transform, () => {
  it.skip('should transform a "define" function to a variable declaration', () => {
    const callExpression = {
      type: TYPE_CALL_EXPRESSION,
      name: 'define',
      arguments: [
        { type: TYPE_IDENTIFIER, name: 'x' },
        { type: TYPE_NUMERIC_LITERAL, value: 3 },
      ],
    };

    const variableDeclaration = {
      type: TYPE_VARIABLE_DECLARATION,
      identifier: { type: TYPE_IDENTIFIER, name: 'x' },
      assignment: { type: TYPE_NUMERIC_LITERAL, value: 3 },
    };

    expect(transform(callExpression)).toEqual(variableDeclaration);
  });
});
