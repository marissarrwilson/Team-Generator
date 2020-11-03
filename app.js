const inquirer = require("inquirer");
const fs = require("fs");

//Constructors
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const teamMembers = [];
let manager;
let teamName;

function managerInfo() {
    inquirer.prompt([
        { // team name
            type: "input",
            message: "What is the name of this team?",
            name: "teamName"
        },
        { // manager
            type: "input",
            message: "Who is the team manager?",
            name: "managerName"
        },
        { // manager ID
            type: "input",
            message: "What is their ID?",
            name: "managerID"
        },
        { // manager email
            type: "input",
            message: "What is the manager's email?",
            name: "managerEmail"
        },
        { // manager phone
            type: "input",
            message: "What is the manager's phone number?",
            name: "managerPhone"
        }
    ]).then(managerResponse => {
        manager = new Manager (managerResponse.managerName, managerResponse.managerID, managerResponse.managerEmail, managerResponse.managerPhone);
        teamName = managerResponse.teamName;
        console.log("Responses recorded! We will now ask for your team's employee details.")
        employeeInfo();
    });
}

// repeat if need for more employees
function employeeInfo() {
    inquirer.prompt([
        { //role
            type: "list",
            message: "What is this employee's role?",
            name: "employeeRole",
            choices: ["Engineer", "Intern"]
        },
        { // employee name
            type: "input",
            message: "What is this employee's name?",
            name: "employeeName"
        },
        { // employee ID
            type: "input",
            message: "What is this employee's ID?",
            name: "employeeID"
        },
        { // employee email
            type: "input",
            message: "What is this employee's email?",
            name: "employeeEmail"
        },
        { // engineer github
            type: "input",
            message: "What is the engineer's GitHub username?",
            name: "github",
            when: (userInput) => userInput.employeeRole === "Engineer"
        },
        { // intern school
            type: "input",
            message: "What school is the intern attending?",
            name: "school",
            when: (userInput) => userInput.employeeRole === "Intern"
        },
        {
            type: "confirm",
            message: "Would you like to add another member to your team?",
            name: "newEmployee"
        }
    ]).then(response => {
        if (response.employeeRole === "Intern") {
            const employee = new Intern(response.employeeName, response.employeeID, response.employeeEmail, response.school);
            teamMembers.push(employee);
        } else if (response.employeeRole === "Engineer") {
            const employee = new Engineer(response.employeeName, response.employeeID, response.employeeEmail, response.github);
            teamMembers.push(employee)
        }
        if (response.newEmployee === true) {
            employeeInfo();
        } else {
            var main = fs.readFileSync('./templates/main.html', 'utf8');
            main = main.replace(/{{teamName}}/g, teamName);
            var managerCard = fs.readFileSync('templates/Manager.html', 'utf8');
            managerCard = managerCard.replace('{{name}}', manager.getName());
            managerCard = managerCard.replace('{{role}}', manager.getRole());
            managerCard = managerCard.replace('{{id}}', manager.getId());
            managerCard = managerCard.replace('{{email}}', manager.getEmail());
            managerCard = managerCard.replace('{{managerPhone}}', manager.getPhoneNumber());

            var cards = managerCard;
            for (var i = 0; i < teamMembers.length; i++) {
                var employee = teamMembers[i];
                cards += renderEmployee(employee);
            }
            main = main.replace('{{cards}}', cards);
            fs.writeFileSync('./output/team.html', main);
            console.log("Your team has been generated!")
        }

    });
}

function renderEmployee(employee) {
    if (employee.getRole() === "Intern") {
        var internCard = fs.readFileSync('./templates/Intern.html', 'utf8');
        internCard = internCard.replace('{{name}}', employee.getName());
        internCard = internCard.replace('{{role}}', employee.getRole());
        internCard = internCard.replace('{{id}}', employee.getId());
        internCard = internCard.replace('{{email}}', employee.getEmail());
        internCard = internCard.replace('{{school}}', employee.getSchool());
        return internCard;
    } else if (employee.getRole() === "Engineer") {
        var engineerCard = fs.readFileSync('./templates.Engineer.html', 'utf8');
        engineerCard = engineerCard.replace('{{name}}', employee.getName());
        engineerCard = engineerCard.replace('{{role}}', employee.getRole());
        engineerCard = engineerCard.replace('{{id}}', employee.getId());
        engineerCard = engineerCard.replace('{{email}}', employee.getEmail());
        engineerCard = engineerCard.replace('{{github}}', employee.getGithub());
        return engineerCard;
    }
}

managerInfo();

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
