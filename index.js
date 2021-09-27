//DEPENDENCIES
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

const writefileAsync = util.promisify(fs.writeFile);

const questions = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "author",
      message: "what is the authors name?",
    },

    {
      type: "input",
      name: "username",
      message: "what is your github username?",
    },

    {
      type: "input",
      name: "email",
      message: "what is your email address?",
    },

    {
      type: "input",
      name: "project title",
      message: "What is the name of your project title?",
    },

    {
      type: "input",
      name: "project description",
      message: "please provide a brief description of your project",
    },

    {
      type: "input",
      name: "installation",
      message: "What command should be run to install dependencies?",
    },

    {
      type: "list",
      name: "license",
      message: "What kind of license should your project have?",
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3"],
    },

    {
      type: "input",
      name: "usage",
      message: "What does the user need to know about using the repo?",
    },

    {
      type: "input",
      name: "contribute",
      message:
        "What does the user need to know about contributing to the repo?",
    },

    {
      type: "input",
      name: "test",
      message: "What command should be run to run tests?",
    },
  ]);

function generateMD(data) {
  return `# ${data.title}

  ${data.description}
    ## Table of Contents:
    * [Installation](#installation)
    * [Usage](#usage)
    * [Licence](#license)
    * [Contributing] (#contributing)
    * [Tests] (#tests)
    * [Questions] (#questions)
    ### Installation:
    In order to install the necessary dependencies, open the console and run the following:
    \`\`\`${data.installations}\`\`\`
    ### Usage:
    ${data.usage}
    ### License:
    ${data.license}
    ### Contributing:
    ${data.contribute}
    ###Tests:
    In order to test, open the console and run 
    \`\`\`${data.tests}\`\`\`
    ### Questions:
    If you have any questions contact me on [Github](https://github.com/${data.username})
    or contact ${data.author} at ${data.email}
    `;
}

questions()
  .then((data) => writefileAsync(`generatedREADME.md`, generateMD(data)))
  .then(() => console.log("successfully wrote to index.html"))
  .catch((err) => console.error(err));
