const generate = require('@babel/generator').default;
const { traverse } = require('./traverse');
const { TYPE_IDENTIFIER } = require('./constants');

const babelVisitor = {
  CallExpression: {
    enter({ node }) {
      node.callee = {
        type: TYPE_IDENTIFIER,
        name: node.name
      }
    }
  },
  VariableDeclaration: {
    enter({ node }) {
      node.kind = 'let';
      node.declarations = [
        {
          type: 'VariableDeclarator',
          id: node.identifier,
          init: node.assignment
        }
      ];
    }
  }
};

const toJavaScript = (ast) => {
  traverse(ast, babelVisitor);

  return generate(ast).code;
};

module.exports = {
  toJavaScript,
};
