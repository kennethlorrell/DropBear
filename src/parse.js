const { isOpeningParenthesis, isClosingParenthesis } = require('./identify');
const { specialForms } = require('./special-forms');
const { peek, pop } = require('./utilities');
const {
  TYPE_NUMBER,
  TYPE_NUMERIC_LITERAL,
  TYPE_STRING,
  TYPE_STRING_LITERAL,
  TYPE_LETTER,
  TYPE_IDENTIFIER,
  TYPE_CALL_EXPRESSION
} = require('./constants');

const parenthesize = (tokens) => {
  const currentToken = pop(tokens);

  if (isOpeningParenthesis(currentToken.value)) {
    const expression = [];

    while (!isClosingParenthesis(peek(tokens).value)) {
      expression.push(parenthesize(tokens));
    }

    pop(tokens);

    return expression;
  }

  return currentToken;
};

const parse = (tokens) => {
  if (Array.isArray(tokens)) {
    const [firstToken, ...rest] = tokens;

    return {
      type: TYPE_CALL_EXPRESSION,
      name: firstToken.value,
      arguments: rest.map((token) => parse(token))
    }
  }

  if (tokens.type === TYPE_NUMBER) {
    return {
      type: TYPE_NUMERIC_LITERAL,
      value: tokens.value
    }
  }

  if (tokens.type === TYPE_STRING) {
    return {
      type: TYPE_STRING_LITERAL,
      value: tokens.value
    }
  }

  if (tokens.type === TYPE_LETTER) {
    return {
      type: TYPE_IDENTIFIER,
      name: tokens.value
    }
  }
};

module.exports = { parse: tokens => parse(parenthesize(tokens)) };
