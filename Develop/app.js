const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// const util = require('util');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// const writeFileAsync = util.promisify(fs.writeFile);
const render = require("./lib/htmlRenderer");

const employeeArray = []
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const createManager = () => {
inquirer.prompt ([
    {
        type: 'input',
        message: 'Name',
        name: 'name',
        
      },
      {
        type: 'input',
        message: 'ID',
        name: 'ID',
          
        },
      {
          type: 'input',
          message: 'Email',
          name: 'email',
          
        },
        {
          type: 'input',
          message: 'Enter your team members office number',
          name: 'officeNumber',
          
          
        },
]).then (answers => {
    const manager = new Manager (answers.name, answers.ID, answers.email, answers.officeNumber) ;
    employeeArray.push(manager);
    choices ();
})
}
const choices = () => {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What is the role of the employee',
      name: 'role',
      choices: ['Engineer', 'Intern']
    
      },
    {
      type: 'input',
      message: 'Name',
      name: 'name',
      
    },
    {
      type: 'input',
      message: 'ID',
      name: 'ID',
        
      },
    {
        type: 'input',
        message: 'Email',
        name: 'email',
        
      },
     
      {
        type: 'input',
        message: 'Enter the Github account',
        name: 'github',
        when: (choices) => choices.role === 'Engineer',
        
      },
      {
        type: 'input',
        message: 'Enter the school name',
        name: 'school',
        when: (choices) => choices.role === 'Intern',
        
      },
      {
        type: 'list',
        message: 'Would you like to add a new employee?',
        name: 'continue',
        choices: ['Yes', 'No'],
        
      },
      
  ])



.then((answers) => { 
    let employee;
    if (answers.role === 'Engineer') {
        employee = new Engineer (answers.name, answers.ID, answers.email, answers.github)
    } else {
        employee = new Intern (answers.name, answers.ID, answers.email, answers.school)
    }
    employeeArray.push(employee);
    if (answers.continue === "Yes") {
        choices()
    } else {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(employeeArray), 'utf-8')
    }
    
})
.catch((err) => console.error(err));
}

createManager ();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
