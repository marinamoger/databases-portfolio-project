/*
* Project Step 3 Draft Data Definition Queries
* Project Name: Old Mike’s Car Full-Service Transaction Management System
* Project Group: 45
* Group Members: Lei Feng, Marina Moger
* Due Date: 11/06/2025
* Description: Create and populate tables for the project database.
* Citation: All code in this file without citation is original.
* Import: Please drop all existing tables before importing this file via
*         phpMyAdmin or the MySQL CLI using the source query.
*/

SET FOREGIN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS Locations, Employees, Customers, Services, Invoices, Invoices_Services;
DROP VIEW IF EXISTS v_locations, v_employees, v_customers, v_services, v_invoices, v_invoices_services;

/*
* Create tables
*/

-- Create table Locations
CREATE TABLE Locations (
  id_location int AUTO_INCREMENT UNIQUE NOT NULL,
  name varchar(45) UNIQUE NOT NULL,
  address varchar(45) UNIQUE NOT NULL,
  PRIMARY KEY (id_location)
);

-- Create table Employees
CREATE TABLE Employees (
  id_employee int AUTO_INCREMENT UNIQUE NOT NULL,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  date_of_birth date NOT NULL,
  phone_number varchar(15) NOT NULL,
  email_address varchar(45) UNIQUE NOT NULL,
  id_location int NOT NULL,
  PRIMARY KEY (id_employee),
  FOREIGN KEY (id_location) REFERENCES Locations (id_location)
  ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create table Customers
CREATE TABLE Customers (
  id_customer int AUTO_INCREMENT UNIQUE NOT NULL,
  first_name varchar(45) NOT NULL,
  last_name varchar(45) NOT NULL,
  date_of_birth date NOT NULL,
  phone_number varchar(15) NOT NULL,
  email_address varchar(45) UNIQUE,
  address varchar(45),
  PRIMARY KEY (id_customer)
);

-- Create table Services
CREATE TABLE Services (
  id_service int AUTO_INCREMENT UNIQUE NOT NULL,
  name varchar(45) UNIQUE NOT NULL,
  description varchar(255),
  price decimal(10,2) NOT NULL,
  PRIMARY KEY (id_service)
);

-- Create table Invoices
CREATE TABLE Invoices (
  id_invoice int AUTO_INCREMENT UNIQUE NOT NULL,
  id_customer int NOT NULL,
  id_employee int NOT NULL,
  id_location int NOT NULL,
  date datetime NOT NULL,
  total decimal(10,2) NOT NULL,
  PRIMARY KEY (id_invoice),
  FOREIGN KEY (id_customer) REFERENCES Customers (id_customer)
  ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (id_employee) REFERENCES Employees (id_employee)
  ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (id_location) REFERENCES Locations (id_location)
  ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create table Invoices_Services
CREATE TABLE Invoices_Services (
  id_invoice_service int AUTO_INCREMENT UNIQUE NOT NULL,
  id_invoice int NOT NULL,
  id_service int NOT NULL,
  sale_price decimal(10,2) NOT NULL,
  PRIMARY KEY (id_invoice_service),
  FOREIGN KEY (id_invoice) REFERENCES Invoices (id_invoice)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (id_service) REFERENCES Services (id_service)
  ON DELETE RESTRICT ON UPDATE CASCADE
);

/*
* Add data
*/

-- Add data to Locations
INSERT INTO Locations (name, address)
VALUES ("Broadway", "755 NW Broadway, Portland, OR 97208"),
("SE Powell", "4500 SE Powell Blvd, Portland, OR 97206"),
("SE 82nd Ave", "8120 SE 82nd Ave, Portland, OR 97266"),
("SW Lombard Ave", "4550 SW Lombard Ave, Beaverton, OR 97005"),
("SE McLoughlin Blvd", "16200 SE McLoughlin Blvd, Portland, OR 97267");

-- Add data to Employees
INSERT INTO Employees (first_name, last_name, date_of_birth, phone_number, email_address, id_location)
VALUES ("Luke", "Harris", "1983-12-05", "(503) 555-0001", "harrisl@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "Broadway")),
("Dylan", "Miller", "1980-04-10", "(503) 555-0002", "millerd@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "Broadway")),
("Mason", "Carter", "1994-11-25", "(503) 555-0003", "carterm@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "SE Powell")),
("Logan", "Kelly", "1979-08-03", "(503) 555-0004", "kellylo@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "SE Powell")),
("Henry", "Rogers", "1996-05-29", "(503) 555-0005", "rogersh@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "SE 82nd Ave")),
("Hunter", "Murphy", "1987-06-14", "(503) 555-0006", "murphyh@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "SE 82nd Ave")),
("Jordan", "Stewart", "1985-02-16", "(503) 555-0007", "stewarj@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "SW Lombard Ave")),
("Eric", "Stone", "1981-11-17", "(503) 555-0008", "stonee@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "SW Lombard Ave")),
("Austin", "Long", "1989-03-25", "(503) 555-0009", "longaus@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "SE McLoughlin Blvd")),
("Tyler", "Brooks", "1990-06-21", "(503) 555-0010", "brookst@oldmikescfs.com",
  (SELECT id_location FROM Locations WHERE name = "SE McLoughlin Blvd"));

-- Add data to Customers
INSERT INTO Customers (first_name, last_name, date_of_birth, phone_number, email_address, address)
VALUES ("Andrew", "Young", "1960-03-22", "(971) 555-0001", "young0322@fakemail.com", NULL),
("Ethan", "Turner", "1995-11-18", "(971) 555-0002", NULL, NULL),
("Amanda", "Thomas", "1975-02-15", "(971) 555-0003", NULL, "2100 SE Hawthorn Blvd, Portland, OR 97214"),
("Nicole", "Robinson", "2000-10-29", "(971) 555-0004", "robinnic@notreal.com", NULL),
("Samuel", "Davis", "1977-08-14", "(971) 555-0005", NULL, NULL);

-- Add data to Services
INSERT INTO Services (name, description, price)
VALUES ("oil change", "replace the engine oil and oil filter", 75.00),
("tire rotation", NULL, 35.00),
("engine filter replace", "replace the engine air filter", 89.00),
("battery replace", "replace the main battery", 250.00),
("brake pad replace", "for one axle", 350.00),
("safety check", "brakes, tires, lights, steering, suspension, and safety systems", 45.00),
("wiper blade replace", NULL, 65.00),
("coolant flush", "replace the coolant", 320.00),
("transmission flush", "replace the transmission fluid", 350.00),
("spark plug replace", "replace the ignition plug", 390.00);

-- Add data to Invoices
INSERT INTO Invoices (id_customer, id_employee, id_location, date, total)
VALUES ((SELECT id_customer FROM Customers WHERE first_name = "Andrew"),
  (SELECT id_employee FROM Employees WHERE first_name = "Logan"),
  (SELECT id_location FROM Locations WHERE name = "SE Powell"), "2024-05-10 14:05:38", 145.00),
((SELECT id_customer FROM Customers WHERE first_name = "Ethan"),
  (SELECT id_employee FROM Employees WHERE first_name = "Dylan"),
  (SELECT id_location FROM Locations WHERE name = "Broadway"), "2024-07-09 16:10:05", 250.00),
((SELECT id_customer FROM Customers WHERE first_name = "Amanda"),
  (SELECT id_employee FROM Employees WHERE first_name = "Hunter"),
  (SELECT id_location FROM Locations WHERE name = "SE 82nd Ave"), "2024-09-27 10:32:01", 350.00),
((SELECT id_customer FROM Customers WHERE first_name = "Nicole"),
  (SELECT id_employee FROM Employees WHERE first_name = "Austin"),
  (SELECT id_location FROM Locations WHERE name = "SE McLoughlin Blvd"), "2025-06-27 14:16:58", 390.00),
((SELECT id_customer FROM Customers WHERE first_name = "Andrew"),
  (SELECT id_employee FROM Employees WHERE first_name = "Logan"),
  (SELECT id_location FROM Locations WHERE name = "SE Powell"), "2025-10-08 15:38:54", 155.00);

-- Add data to Invoices_Services
INSERT INTO Invoices_Services (id_invoice, id_service, sale_price)
VALUES (1, (SELECT id_service FROM Services WHERE name = "oil change"), 75.00),
(1, (SELECT id_service FROM Services WHERE name = "tire rotation"), 35.00),
(1, (SELECT id_service FROM Services WHERE name = "safety check"), 35.00),
(2, (SELECT id_service FROM Services WHERE name = "battery replace"), 250.00),
(3, (SELECT id_service FROM Services WHERE name = "transmission flush"), 350.00),
(4, (SELECT id_service FROM Services WHERE name = "spark plug replace"), 390.00),
(5, (SELECT id_service FROM Services WHERE name = "oil change"), 75.00),
(5, (SELECT id_service FROM Services WHERE name = "tire rotation"), 35.00),
(5, (SELECT id_service FROM Services WHERE name = "safety check"), 45.00);

/*
* Create views for web app
*/

-- Create view for Locations
CREATE VIEW v_locations AS
SELECT * FROM Locations;

-- Create view for Employees
CREATE VIEW v_employees AS
SELECT
  Employees.id_employee,
  Employees.first_name,
  Employees.last_name,
  Employees.date_of_birth,
  Employees.phone_number,
  Employees.email_address,
  Locations.name AS name_location,
  Employees.id_location
FROM Employees
JOIN Locations
ON Employees.id_location = Locations.id_location
ORDER BY Employees.id_employee;

-- Create view for Customers
CREATE VIEW v_customers AS
SELECT * FROM Customers;

-- Create view for Services
CREATE VIEW v_services AS
SELECT * FROM Services;

-- Create view for Invoices
CREATE VIEW v_invoices AS
SELECT
  Invoices.id_invoice,
  CONCAT(Customers.first_name, ' ', Customers.last_name) AS name_customer,
  Invoices.id_customer,
  CONCAT(Employees.first_name, ' ', Employees.last_name) AS name_employee,
  Invoices.id_employee,
  Locations.name AS name_location,
  Invoices.id_location,
  Invoices.date,
  Invoices.total
FROM Invoices
JOIN Customers
ON Invoices.id_customer = Customers.id_customer
JOIN Employees
ON Invoices.id_employee = Employees.id_employee
JOIN Locations
ON Invoices.id_location = Locations.id_location
ORDER BY Invoices.id_invoice;

-- Create view for Invoices_Services
CREATE VIEW v_invoices_services AS
SELECT
  Invoices_Services.id_invoice_service,
  Invoices_Services.id_invoice,
  Services.name AS name_service,
  Invoices_Services.id_service,
  Services.price AS list_price,
  Invoices_Services.sale_price
FROM Invoices_Services
JOIN Services
ON Invoices_Services.id_service = Services.id_service
ORDER BY Invoices_Services.id_invoice_service;

