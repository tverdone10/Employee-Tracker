DROP DATABASE IF EXISTS employees_database;
CREATE DATABASE employees_database;
USE employees_database;

CREATE TABLE department(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (30) UNIQUE NOT NULL
);


CREATE TABLE roles (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
title VARCHAR (30),
salary INTEGER,
department INTEGER 
);

CREATE TABLE employee(
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INTEGER
);

INSERT INTO employee AFTER last_name ()