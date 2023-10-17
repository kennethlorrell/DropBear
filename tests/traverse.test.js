const { traverse } = require('../src/traverse');
const {
  TYPE_NUMERIC_LITERAL,
  TYPE_CALL_EXPRESSION
} = require('../src/constants');

describe(traverse, () => {
  it('should travel to all the nodes in the tree and reverse the math', () => {
    const ast = {
      type: TYPE_CALL_EXPRESSION,
      name: 'add',
      arguments: [
        { type: TYPE_NUMERIC_LITERAL, value: 12 },
        { type: TYPE_NUMERIC_LITERAL, value: 6 },
      ],
    };

    const visitor = {
      CallExpression: {
        enter({ node }) {
          if (node.name === 'add') {
            node.name = 'subtract';
          }
        },
      },
      NumericLiteral: {
        exit({ node }) {
          node.value = node.value * 2;
        },
      },
    };

    traverse(ast, visitor);

    expect(ast.name).toBe('subtract');
  });

  it('should travel to all the nodes in the tree and double all of the numbers', () => {
    const ast = {
      type: TYPE_CALL_EXPRESSION,
      name: 'add',
      arguments: [
        { type: TYPE_NUMERIC_LITERAL, value: 12 },
        { type: TYPE_NUMERIC_LITERAL, value: 6 },
      ],
    };

    const visitor = {
      NumericLiteral: {
        exit({ node }) {
          node.value = node.value * 2;
        },
      },
    };

    traverse(ast, visitor);

    expect(ast.arguments[0].value).toBe(24);
    expect(ast.arguments[1].value).toBe(12);
  });
});
