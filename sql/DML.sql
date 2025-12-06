/*
* Project Data Manipulation Queries
* Project Name: Old Mike’s Car Full-Service Transaction Management System
* Project Group: 45
* Group Members: Lei Feng, Marina Moger
* Description: Data Manipulation Queries for the CS340 Portfolio Project.
* Citation: All code in this file without citation is original.
*/

/*
* SELECT
*/

-- Select all from Locations
SELECT * FROM Locations;

-- Select all from Employees
SELECT
  Employees.id_employee,
  Employees.first_name,
  Employees.last_name,
  DATE_FORMAT(Employees.date_of_birth, '%m/%d/%Y') AS date_of_birth,
  Employees.phone_number,
  Employees.email_address,
  Locations.name AS name_location,
  Employees.id_location
FROM Employees
JOIN Locations
ON Employees.id_location = Locations.id_location
ORDER BY Employees.id_employee;

-- Select all from Customers
SELECT
  id_customer,
  first_name,
  last_name,
  DATE_FORMAT(date_of_birth, '%m/%d/%Y') AS date_of_birth,
  phone_number,
  email_address,
  address
FROM Customers;

-- Select all from Services
SELECT * FROM Services;

-- Select all from Invoices
SELECT
  Invoices.id_invoice,
  CONCAT(Customers.first_name, ' ', Customers.last_name) AS name_customer,
  Invoices.id_customer,
  CONCAT(Employees.first_name, ' ', Employees.last_name) AS name_employee,
  Invoices.id_employee,
  Locations.name AS name_location,
  Invoices.id_location,
  DATE_FORMAT(Invoices.date, '%m/%d/%Y %H:%i:%s') AS date,
  Invoices.total
FROM Invoices
JOIN Customers
ON Invoices.id_customer = Customers.id_customer
JOIN Employees
ON Invoices.id_employee = Employees.id_employee
JOIN Locations
ON Invoices.id_location = Locations.id_location
ORDER BY Invoices.id_invoice;

-- Select all from Invoices_Services
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

/*
* INSERT
*/

-- Insert a row into Locations
INSERT INTO Locations (name, address)
VALUES (@create_name, @create_address);

-- Insert a row into Employees
INSERT INTO Employees (first_name, last_name, date_of_birth, phone_number, email_address, id_location)
VALUES (@create_first_name, @create_last_name, @create_date_of_birth, @create_phone_number, @create_email_address, @create_id_location);

-- Insert a row into Customers
INSERT INTO Customers (first_name, last_name, date_of_birth, phone_number, email_address, address)
VALUES (@create_first_name, @create_last_name, @create_date_of_birth, @create_phone_number, @create_email_address, @create_address);

-- Insert a row into Services
INSERT INTO Services (name, description, price)
VALUES (@create_name, @create_description, @create_price);

-- Insert a row into Invoices
INSERT INTO Invoices (id_customer, id_employee, id_location, date, total)
VALUES (@create_id_customer, @create_id_employee, @create_id_location, @create_date, 0);

-- Insert a row into Invoices_Services and update the total in Invoices
INSERT INTO Invoices_Services (id_invoice, id_service, sale_price)
VALUES (
  @create_id_invoice,
  @create_id_service,
  IFNULL(@create_sale_price, (SELECT price FROM Services WHERE id_service = @create_id_service))
);

UPDATE Invoices
SET total = (
    SELECT SUM(sale_price)
    FROM Invoices_Services
    WHERE id_invoice = @create_id_invoice
  )
WHERE id_invoice = @create_id_invoice;

/*
* UPDATE
*/

-- Update a row in Locations
UPDATE Locations
SET name = @update_name,
  address = @update_address
WHERE id_location = @update_id_location;

-- Update a row in Employees
UPDATE Employees
SET first_name = @update_first_name,
  last_name = @update_last_name,
  date_of_birth = @update_date_of_birth,
  phone_number = @update_phone_number,
  email_address = @update_email_address,
  id_location = @update_id_location
WHERE id_employee = @update_id_employee;

-- Update a row in Customers
UPDATE Customers
SET first_name = @update_first_name,
  last_name = @update_last_name,
  date_of_birth = @update_date_of_birth,
  phone_number = @update_phone_number,
  email_address = @update_email_address,
  address = @update_address
WHERE id_customer = @update_id_customer;

-- Update a row in Services
UPDATE Services
SET name = @update_name,
  description = @update_description,
  price = @update_price
WHERE id_service = @update_id_service;

-- Update a row in Invoices
UPDATE Invoices
SET id_customer = @update_id_customer,
  id_employee = @update_id_employee,
  id_location = @update_id_location,
  date = @update_date,
  total = (
    SELECT SUM(sale_price)
    FROM Invoices_Services
    GROUP BY id_invoice
    WHERE id_invoice = @update_id_invoice
  )
WHERE id_invoice = @update_id_invoice;

-- Update a row in Invoices_Service and update the total in Invoices
SELECT id_invoice INTO @stored_id_invoice
FROM Invoices_Services
WHERE id_invoice_service = @update_id_invoice_service;

UPDATE Invoices_Services
SET id_invoice = @update_id_invoice,
  id_service = @update_id_service,
  sale_price = IFNULL(@update_sale_price, (SELECT price FROM Services WHERE id_service = @update_id_service))
WHERE id_invoice_service = @update_id_invoice_service;

UPDATE Invoices
SET total = (
    SELECT SUM(sale_price)
    FROM Invoices_Services
    WHERE id_invoice = @update_id_invoice
  )
WHERE id_invoice = @update_id_invoice;

IF @stored_id_invoice != @update_id_invoice THEN
  UPDATE Invoices
  SET total = (
      SELECT IFNULL(SUM(sale_price), 0)
      FROM Invoices_Services
      WHERE id_invoice = @stored_id_invoice
    )
  WHERE id_invoice = @stored_id_invoice;
END IF;

/*
* DELETE
*/

-- Delete a row in Locations
DELETE FROM Locations WHERE id_location = @delete_id_location;

-- Delete a row in Employees
DELETE FROM Employees WHERE id_employee = @delete_id_employee;

-- Delete a row in Customers
DELETE FROM Customers WHERE id_customer = @delete_id_customer;

-- Delete a row in Services
DELETE FROM Services WHERE id_service = @delete_id_service;

-- Delete a row in Invoices
DELETE FROM Invoices WHERE id_invoice = @delete_id_invoice;

-- Delete a row in Invoices_Services and update the total in Invoices
SELECT id_invoice INTO @stored_id_invoice
FROM Invoices_Services
WHERE id_invoice_service = @delete_id_invoice_service;

DELETE FROM Invoices_Services WHERE id_invoice_service = @delete_id_invoice_service;

UPDATE Invoices
SET total = (
  SELECT IFNULL(SUM(sale_price), 0)
  FROM Invoices_Services
  WHERE id_invoice = @stored_id_invoice
  )
WHERE id_invoice = @stored_id_invoice;
