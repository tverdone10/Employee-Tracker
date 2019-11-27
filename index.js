var inquirer = require("inquirer");
var mysql = require("mysql");
var figlet=require('figlet')

figlet('Employee-Portal', function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees_database"
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
        message: "What would you like to do?",
        choices: [
          {
            name: "Would you like to add a department to the company?",
            value: "add-department"
          },

          {
            name: "Would you like to add roles to the company?",
            value: "add-roles"
          },

          { name: "Would you like to add employees?", 
          value: "add-employees" },

          {
            name: "Would you like to view the departments?",
            value: "view-department"
          },

          {
            name: "Would you like to view the roles in the company?",
            value: "view-roles"
          },

          {
            name: "Would you like to view all employees?",
            value: "view-employees"
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
         
        'INSERT INTO department SET ? ',
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

function addRoles (){
  inquirer
  .prompt([
    {
      type: "input",
      name: "newrole",
      message: "What role would you like to create?"
    },
    {
      type: "input",
      name: "newsalary",
      message: "What is the starting salary for this position?"
    },
    {type: "input",
    name: "depid",
    message:"What is the department ID number?"
  }
  ])
  .then(answers => {
      console.log(answers.newsalary)
      console.log(answers.newrole)
    connection.query(
       
      `INSERT INTO roles (title, salary, department) 
      VALUE ("${answers.newrole}", "${answers.newsalary}", "${answers.depid}") `,
      function(error, results) {
        if (error) throw error;
        console.log( " has been added");
        menu();
      }
    )
    })
  }


function addEmployee (){
  inquirer
  .prompt([
    {
      type: "input",
      name: "firstname",
      message: "What is the first name of the new employee?"
    },
    {
      type: "input",
      name: "lastname",
      message: "What is the last name of the new employee?"
    },{
    type: "input",
    name: "roleid",
    message: "What is the ID number for this employee?"
    }
  ])
  .then(answers =>{
    console.log(answers.firstname)
    console.log(answers.lastname)
    connection.query(
         
      `INSERT INTO employee (first_name, last_name) 
      VALUE 
      ("${answers.firstname}", "${answers.lastname}")`,
      function(error, results) {
        if (error) throw error;
        console.log(answers.firstname + answers.lastname + " has been added");
        menu();
      }
    );


  })
}

function viewEmployees(){
  connection.query("SELECT * FROM employee", function(error, results) {
    if (error) throw error;
    console.table(results);
    menu()
  });
}

function viewRoles(){
  connection.query("SELECT * FROM roles", function(error, results) {
    if (error) throw error;
    console.table(results);
    menu()
  });
}

function viewDepartment() {
  connection.query("SELECT * FROM department", function(error, results) {
    if (error) throw error;
    console.table(results);
    menu()
  });
}

function updateEmployee() {
    


}
