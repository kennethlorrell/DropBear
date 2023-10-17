const { traverse } = require('./traverse');
const { TYPE_VARIABLE_DECLARATION } = require('./constants');

const transform = (node) => {
  traverse(node, {
    CallExpression: {
      enter({ node }) {
        if (specialForms[node.name]) {
          specialForms[node.name](node);
        }
      }
    }
  });

  return node;
};

const specialForms = {
  define(node) {
    const [identifier, assignment] = node.arguments;

    node.type = TYPE_VARIABLE_DECLARATION;
    node.identifier = identifier;
    node.assignment = assignment;

    delete node.name;
    delete node.arguments;

    return node;
  }
};

module.exports = { specialForms, transform };
