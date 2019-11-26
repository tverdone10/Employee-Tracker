var inquirer = require("inquirer");
var mysql = require("mysql");
require('console.table')

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mypassword",
  database: "employees_db"
});

connection.connect(function(error) {
  menu();
});

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "what do you want?",
        choices: [
          {
            name: "Would you like to add a department?",
            value: "add-department"
          },

          {
            name: "Would you like to add roles to the department?",
            value: "add-roles"
          },

          { name: "Would you like to add employees?", value: "add-employees" },

          {
            name: "Would you like to view a department?",
            value: "view-department"
          },

          {
            name: "Would you like to view roles in the department?",
            value: "view-roles"
          },

          {
            name: "Would you like to view employees?",
            value: "view-employees"
          },

          {
            name: "Would you like to update an employee's role?",
            value: "update-employee"
          }
        ]
      }
    ])
    .then(answers => {
      console.log(answers);
      switch (answers.choice) {
        case "add-department":
          addDepartment();
          break;

        case "add-roles":
          addRoles();
          break;

        case "add-employees":
          addEmployee();
          break;

        case "view-department":
          viewDepartment();
          break;

        case "view-roles":
          viewRoles();
          break;

        case "view-employees":
          viewEmployees();
          break;

        case "update-employee":
          updateEmployee();
          break;

        default:
          console.log("something went wrong");
      }
    });
}

//
function addDepartment() {
  // inquiere
  inquirer
    .prompt([
      {
        type: "input",
        name: "newdept",
        message: "What department do you want to create?"
      }
    ])
    .then(answers => {
        console.log(answers.newdept)
      connection.query(
         
        `INSERT INTO department SET ? `,
        {
        name: answers.newdept
        },
        function(error, results) {
          if (error) throw error;
          console.log(answers.newdept + " has been added");
          menu();
        }
      );
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", function(error, results) {
    if (error) throw error;
    console.table(results);
    menu()
  });
}

function updateEmployee() {}
