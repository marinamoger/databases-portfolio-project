/*
* Project Step 3 Draft Data Manipulation Queries
* Project Name: Old Mike’s Car Full-Service Transaction Management System
* Project Group: 45
* Group Members: Lei Feng, Marina Moger
* Due Date: 11/06/2025
* Description: Data Manipulation Queries for the project web app.
* Citation: All code in this file without citation is original.
*/

/*
* SELECT
*/

-- Select all from Locations
SELECT * FROM Locations;

-- Select all from Employees
SELECT * FROM Employees;

-- Select all from Customers
SELECT * FROM Customers;

-- Select all from Services
SELECT * FROM Services;

-- Select all from Invoices
SELECT * FROM Invoices;

-- Select all from Invoices_Services
SELECT * FROM Invoices_Services;

/*
* INSERT
*/

-- Insert a row into Invoices
INSERT INTO Invoices (id_customer, id_employee, id_location, date, total)
VALUES (:id_customer_from_dropdown_input, :id_employee_from_dropdown_input, :id_location_from_dropdown_input, :date_input, 0);

-- Insert a row into Invoices_Services and update the total in Invoices
INSERT INTO Invoices_Services (id_invoice, id_service, sale_price)
VALUES (:id_invoice_from_dropdown_input, :id_service_from_dropdown_input,
(SELECT sale_price FROM Services WHERE id_service = id_service_from_dropdown_input));

UPDATE Invoices (total)
VALUES (SELECT SUM(sale_price)
  FROM Invoices_Services
  GROUP BY id_invoice
  WHERE id_invoice = id_invoice_from_dropdown_input);

/*
* UPDATE
*/

-- Update a row in Invoices
UPDATE Invoices
SET id_customer = :id_customer_from_dropdown_input,
id_employee = :id_employee_from_dropdown_input,
id_location = :id_location_from_dropdown_input,
date = :date_input,
total = (SELECT SUM(sale_price)
  FROM Invoices_Services
  GROUP BY id_invoice
  WHERE id_invoice = :id_invoice_from_update_form);

-- Update a row in Invoices_Service and update the total in Invoices
UPDATE Invoices_Services
SET id_invoice = :id_invoice_from_dropdown_input,
id_service = :id_service_from_dropdown_input,
sale_price = (SELECT sale_price
  FROM Services
  WHERE id_service = :id_service_from_dropdown_input);

UPDATE Invoices (total)
VALUES (SELECT SUM(sale_price)
  FROM Invoices_Services
  GROUP BY id_invoice
  WHERE id_invoice = :id_invoice_from_dropdown_input);

/*
* DELETE
*/

-- Delete a row in Invoices
DELETE FROM Invoices WHERE id_invoice = :id_invoice_from_dropdown_input;

-- Delete a row in Invoices_Services and update the total in Invoices
SELECT id_invoice FROM Invoices_Services WHERE id_invoice_service = :id_invoice_service_from_dropdown_input;

DELETE FROM Invoices_Services WHERE id_invoice_service = :id_invoice_service_from_dropdown_input;

UPDATE Invoices (total)
VALUES (SELECT SUM(sale_price)
  FROM Invoices_Services
  GROUP BY id_invoice
  WHERE id_invoice = :id_invoice_get_before_delete);
