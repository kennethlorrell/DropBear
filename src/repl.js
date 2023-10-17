const { prompt } = require('inquirer');
const chalk = require('chalk');

const { parseAndEvaluate } = require('./parse-and-evaluate');

const askQuestions = () => {
  const questions = [
    {
      name: 'COMMAND',
      type: 'input',
      message: chalk.green('>')
    }
  ];

  return prompt(questions);
};

const repl = async () => {
  try {
    const { COMMAND } = await askQuestions();

    if (COMMAND.trim()) {
      console.log(chalk.blue(parseAndEvaluate(COMMAND)));
    }
  } catch (error) {
    console.error(error);
  }

  repl();
};

if (require.main === module) {
  console.log(
    chalk.green(
      `Welcome to the ${chalk.bgYellow('Dropbear')} Programming Language`,
    ),
  );
  repl();
}

module.exports = repl;
