/*
* Project Procedure Language Queries
* Project Name: Old Mike’s Car Full-Service Transaction Management System
* Project Group: 45
* Group Members: Lei Feng, Marina Moger
* Description: Create views and stored procedures for the project database.
* Citation: All code in this file without citation is original.
* Import: Please drop all existing views and stored procedures before
*         importing this file via phpMyAdmin or the MySQL CLI using the
*         source query.
*/

-- Clean up the database
SET FOREIGN_KEY_CHECKS = 0;
DROP VIEW IF EXISTS v_locations, v_employees, v_customers, v_services, v_invoices, v_invoices_services;

/*
* Create Views for Web App
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
  DATE_FORMAT(Employees.date_of_birth, '%m/%d/%Y') AS date_of_birth,
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
SELECT
  id_customer,
  first_name,
  last_name,
  DATE_FORMAT(date_of_birth, '%m/%d/%Y') AS date_of_birth,
  phone_number,
  email_address,
  address
FROM Customers;

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

/*
* Create Procedures
*/

DELIMITER //

-- RESET Procedure

-- Create prodedure sp_load_database
DROP PROCEDURE IF EXISTS sp_load_database //
CREATE PROCEDURE sp_load_database ()
BEGIN
  -- Clean up the database
  SET FOREIGN_KEY_CHECKS = 0;
  DROP TABLE IF EXISTS Locations, Employees, Customers, Services, Invoices, Invoices_Services;
  -- Create table Locations
  CREATE TABLE Locations (
    id_location INT AUTO_INCREMENT UNIQUE NOT NULL,
    name VARCHAR(45) UNIQUE NOT NULL,
    address VARCHAR(45) UNIQUE NOT NULL,
    PRIMARY KEY (id_location)
  );
  -- Create table Employees
  CREATE TABLE Employees (
    id_employee INT AUTO_INCREMENT UNIQUE NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    date_of_birth DATE NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    email_address VARCHAR(45) UNIQUE NOT NULL,
    id_location INT NOT NULL,
    PRIMARY KEY (id_employee),
    FOREIGN KEY (id_location) REFERENCES Locations (id_location)
    ON DELETE RESTRICT ON UPDATE CASCADE
  );
  -- Create table Customers
  CREATE TABLE Customers (
    id_customer INT AUTO_INCREMENT UNIQUE NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    date_of_birth DATE NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    email_address VARCHAR(45) UNIQUE,
    address VARCHAR(45),
    PRIMARY KEY (id_customer)
  );
  -- Create table Services
  CREATE TABLE Services (
    id_service INT AUTO_INCREMENT UNIQUE NOT NULL,
    name VARCHAR(45) UNIQUE NOT NULL,
    description VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_service)
  );
  -- Create table Invoices
  CREATE TABLE Invoices (
    id_invoice INT AUTO_INCREMENT UNIQUE NOT NULL,
    id_customer INT NOT NULL,
    id_employee INT NOT NULL,
    id_location INT NOT NULL,
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
    id_invoice_service INT AUTO_INCREMENT UNIQUE NOT NULL,
    id_invoice INT NOT NULL,
    id_service INT NOT NULL,
    sale_price decimal(10,2) NOT NULL,
    PRIMARY KEY (id_invoice_service),
    FOREIGN KEY (id_invoice) REFERENCES Invoices (id_invoice)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_service) REFERENCES Services (id_service)
    ON DELETE RESTRICT ON UPDATE CASCADE
  );
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
  -- Finish
  SET FOREIGN_KEY_CHECKS = 1;
END //

-- SELECT Procedures

-- Create procedure sp_show_locations
DROP PROCEDURE IF EXISTS sp_show_locations //
CREATE PROCEDURE sp_show_locations ()
BEGIN
  SELECT * FROM v_locations;
END //

-- Create procedure sp_show_employees
DROP PROCEDURE IF EXISTS sp_show_employees //
CREATE PROCEDURE sp_show_employees ()
BEGIN
  SELECT * FROM v_employees;
END //

-- Create procedure sp_show_customers
DROP PROCEDURE IF EXISTS sp_show_customers //
CREATE PROCEDURE sp_show_customers ()
BEGIN
  SELECT * FROM v_customers;
END //

-- Create procedure sp_show_services
DROP PROCEDURE IF EXISTS sp_show_services //
CREATE PROCEDURE sp_show_services ()
BEGIN
  SELECT * FROM v_services;
END //

-- Create procedure sp_show_invoices
DROP PROCEDURE IF EXISTS sp_show_invoices //
CREATE PROCEDURE sp_show_invoices ()
BEGIN
  SELECT * FROM v_invoices;
END //

-- Create procedure sp_show_invoices_services
DROP PROCEDURE IF EXISTS sp_show_invoices_services //
CREATE PROCEDURE sp_show_invoices_services ()
BEGIN
  SELECT * FROM v_invoices_services;
END //

-- Create procedure sp_find_location
DROP PROCEDURE IF EXISTS sp_find_location //
CREATE PROCEDURE sp_find_location (
  IN input_id INT
)
BEGIN
  SELECT * FROM v_locations WHERE id_location = input_id;
END //

-- Create procedure sp_find_employee
DROP PROCEDURE IF EXISTS sp_find_employee //
CREATE PROCEDURE sp_find_employee (
  IN input_id INT
)
BEGIN
  SELECT * FROM v_employees WHERE id_employee = input_id;
END //

-- Create procedure sp_find_customer
DROP PROCEDURE IF EXISTS sp_find_customer //
CREATE PROCEDURE sp_find_customer (
  IN input_id INT
)
BEGIN
  SELECT * FROM v_customers WHERE id_customer = input_id;
END //

-- Create procedure sp_find_service
DROP PROCEDURE IF EXISTS sp_find_service //
CREATE PROCEDURE sp_find_service (
  IN input_id INT
)
BEGIN
  SELECT * FROM v_services WHERE id_service = input_id;
END //

-- Create procedure sp_find_invoice
DROP PROCEDURE IF EXISTS sp_find_invoice //
CREATE PROCEDURE sp_find_invoice (
  IN input_id INT
)
BEGIN
  SELECT * FROM v_invoices WHERE id_invoice = input_id;
END //

-- Create procedure sp_find_invoice_service
DROP PROCEDURE IF EXISTS sp_find_invoice_service //
CREATE PROCEDURE sp_find_invoice_service (
  IN input_id INT
)
BEGIN
  SELECT
    v_invoices_services.id_invoice_service,
    v_invoices.name_customer,
    v_invoices.name_employee,
    v_invoices.date,
    v_invoices_services.id_invoice,
    v_invoices_services.name_service,
    v_invoices_services.id_service,
    v_invoices_services.list_price,
    v_invoices_services.sale_price
    FROM v_invoices_services
    JOIN v_invoices
    ON v_invoices_services.id_invoice = v_invoices.id_invoice
    WHERE v_invoices_services.id_invoice_service = input_id;
END //

-- CREATE Procedures

-- Create procedure sp_create_location
DROP PROCEDURE IF EXISTS sp_create_location //
CREATE PROCEDURE sp_create_location (
  IN p_name VARCHAR(45),
  IN p_address VARCHAR(45),
  OUT p_id_location INT
)
BEGIN
  INSERT INTO Locations (name, address)
  VALUES (p_name, p_address);
  SELECT LAST_INSERT_ID() INTO p_id_location;
  SELECT LAST_INSERT_ID() AS new_id_location;
END //

-- Create procedure sp_create_employee
DROP PROCEDURE IF EXISTS sp_create_employee //
CREATE PROCEDURE sp_create_employee (
  IN p_first_name VARCHAR(45),
  IN p_last_name VARCHAR(45),
  IN p_date_of_birth DATE,
  IN p_phone_number VARCHAR(15),
  IN p_email_address VARCHAR(45),
  IN p_id_location INT,
  OUT p_id_employee INT
)
BEGIN
  INSERT INTO Employees (first_name, last_name, date_of_birth, phone_number, email_address, id_location)
  VALUES (p_first_name, p_last_name, p_date_of_birth, p_phone_number, p_email_address, p_id_location);
  SELECT LAST_INSERT_ID() INTO p_id_employee;
  SELECT LAST_INSERT_ID() AS new_id_employee;
END //

-- Create procedure sp_create_customer
DROP PROCEDURE IF EXISTS sp_create_customer //
CREATE PROCEDURE sp_create_customer (
  IN p_first_name VARCHAR(45),
  IN p_last_name VARCHAR(45),
  IN p_date_of_birth DATE,
  IN p_phone_number VARCHAR(15),
  IN p_email_address VARCHAR(45),
  IN p_address VARCHAR(45),
  OUT p_id_customer INT
)
BEGIN
  INSERT INTO Customers (first_name, last_name, date_of_birth, phone_number, email_address, address)
  VALUES (p_first_name, p_last_name, p_date_of_birth, p_phone_number, p_email_address, p_address);
  SELECT LAST_INSERT_ID() INTO p_id_customer;
  SELECT LAST_INSERT_ID() AS new_id_customer;
END //

-- Create procedure sp_create_service
DROP PROCEDURE IF EXISTS sp_create_service //
CREATE PROCEDURE sp_create_service (
  IN p_name VARCHAR(45),
  IN p_description VARCHAR(255),
  IN p_price DECIMAL(10,2),
  OUT p_id_service INT
)
BEGIN
  INSERT INTO Services (name, description, price)
  VALUES (p_name, p_description, p_price);
  SELECT LAST_INSERT_ID() INTO p_id_service;
  SELECT LAST_INSERT_ID() AS new_id_service;
END //

-- Create procedure sp_create_invoice
DROP PROCEDURE IF EXISTS sp_create_invoice //
CREATE PROCEDURE sp_create_invoice (
  IN p_id_customer INT,
  IN p_id_employee INT,
  IN p_id_location INT,
  IN p_date DATETIME,
  OUT p_id_invoice INT
)
BEGIN
  INSERT INTO Invoices (id_customer, id_employee, id_location, date, total)
  VALUES (p_id_customer, p_id_employee, p_id_location, p_date, 0);
  SELECT LAST_INSERT_ID() INTO p_id_invoice;
  SELECT LAST_INSERT_ID() AS new_id_invoice;
END //

-- Create procedure sp_create_invoice_service
DROP PROCEDURE IF EXISTS sp_create_invoice_service //
CREATE PROCEDURE sp_create_invoice_service (
  IN p_id_invoice INT,
  IN p_id_service INT,
  IN p_sale_price DECIMAL(10,2),
  OUT p_id_invoice_service INT
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    SELECT 'Create Error!' AS result;
    ROLLBACK;
  END;
  START TRANSACTION;
    -- Insert a row into Invoices_Services
    INSERT INTO Invoices_Services (id_invoice, id_service, sale_price)
    VALUES (
      p_id_invoice,
      p_id_service,
      IFNULL(p_sale_price, (SELECT price FROM Services WHERE id_service = p_id_service))
    );
    SELECT LAST_INSERT_ID() INTO p_id_invoice_service;
    SELECT LAST_INSERT_ID() AS new_id_invoice_service;
    -- Update the total in Invoices
    UPDATE Invoices
    SET total = (
        SELECT SUM(sale_price)
        FROM Invoices_Services
        WHERE id_invoice = p_id_invoice
      )
    WHERE id_invoice = p_id_invoice;
  COMMIT;
END //

-- UPDATE Procedures

-- Create procedure sp_update_location
DROP PROCEDURE IF EXISTS sp_update_location //
CREATE PROCEDURE sp_update_location (
  IN p_id_location INT,
  IN p_name VARCHAR(45),
  IN p_address VARCHAR(45)
)
BEGIN
  -- Update a row in Locations
  UPDATE Locations
  SET name = p_name,
    address = p_address
  WHERE id_location = p_id_location;
END //

-- Create procedure sp_update_employee
DROP PROCEDURE IF EXISTS sp_update_employee //
CREATE PROCEDURE sp_update_employee (
  IN p_id_employee INT,
  IN p_first_name VARCHAR(45),
  IN p_last_name VARCHAR(45),
  IN p_date_of_birth DATE,
  IN p_phone_number VARCHAR(15),
  IN p_email_address VARCHAR(45),
  IN p_id_location INT
)
BEGIN
  -- Update a row in Employees
  UPDATE Employees
  SET first_name = p_first_name,
    last_name = p_last_name,
    date_of_birth = p_date_of_birth,
    phone_number = p_phone_number,
    email_address = p_email_address,
    id_location = p_id_location
  WHERE id_employee = p_id_employee;
END //

-- Create procedure sp_update_customer
DROP PROCEDURE IF EXISTS sp_update_customer //
CREATE PROCEDURE sp_update_customer (
  IN p_id_customer INT,
  IN p_first_name VARCHAR(45),
  IN p_last_name VARCHAR(45),
  IN p_date_of_birth DATE,
  IN p_phone_number VARCHAR(15),
  IN p_email_address VARCHAR(45),
  IN p_address VARCHAR(45)
)
BEGIN
  -- Update a row in Customers
  UPDATE Customers
  SET first_name = p_first_name,
    last_name = p_last_name,
    date_of_birth = p_date_of_birth,
    phone_number = p_phone_number,
    email_address = p_email_address,
    address = p_address
  WHERE id_customer = p_id_customer;
END //

-- Create procedure sp_update_service
DROP PROCEDURE IF EXISTS sp_update_service //
CREATE PROCEDURE sp_update_service (
  IN p_id_service INT,
  IN p_name VARCHAR(45),
  IN p_description VARCHAR(255),
  IN p_price DECIMAL(10,2)
)
BEGIN
  -- Update a row in Services
  UPDATE Services
  SET name = p_name,
    description = p_description,
    price = p_price
  WHERE id_service = p_id_service;
END //

-- Create procedure sp_update_invoice
DROP PROCEDURE IF EXISTS sp_update_invoice //
CREATE PROCEDURE sp_update_invoice (
  IN p_id_invoice INT,
  IN p_id_customer INT,
  IN p_id_employee INT,
  IN p_id_location INT,
  IN p_date DATETIME
)
BEGIN
  -- Update a row in Invoices
  UPDATE Invoices
  SET id_customer = p_id_customer,
    id_employee = p_id_employee,
    id_location = p_id_location,
    date = p_date,
    total = (
      SELECT SUM(sale_price)
      FROM Invoices_Services
      WHERE id_invoice = p_id_invoice
    )
  WHERE id_invoice = p_id_invoice;
END //

-- Create procedure sp_update_invoice_service
DROP PROCEDURE IF EXISTS sp_update_invoice_service //
CREATE PROCEDURE sp_update_invoice_service (
  IN p_id_invoice_service INT,
  IN p_id_invoice INT,
  IN p_id_service INT,
  IN p_sale_price DECIMAL(10,2)
)
BEGIN
  DECLARE stored_id_invoice INT;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    SELECT 'UPDATE ERROR!' AS result;
    ROLLBACK;
  END;
  START TRANSACTION;
    -- Store the original id_invoice
    SELECT id_invoice INTO stored_id_invoice
    FROM Invoices_Services
    WHERE id_invoice_service = p_id_invoice_service; 
    -- Update a row in Invoices_Services and update the total in Invoices
    UPDATE Invoices_Services
    SET id_invoice = p_id_invoice,
      id_service = p_id_service,
      sale_price = IFNULL(p_sale_price, (SELECT price FROM Services WHERE id_service = p_id_service))
    WHERE id_invoice_service = p_id_invoice_service;
    -- Update the total in Invoices
    UPDATE Invoices
    SET total = (
        SELECT SUM(sale_price)
        FROM Invoices_Services
        WHERE id_invoice = p_id_invoice
      )
    WHERE id_invoice = p_id_invoice;
    -- Update the total in original invoice if id_invoice changed
    IF stored_id_invoice != p_id_invoice THEN
      UPDATE Invoices
      SET total = (
          SELECT IFNULL(SUM(sale_price), 0)
          FROM Invoices_Services
          WHERE id_invoice = stored_id_invoice
        )
      WHERE id_invoice = stored_id_invoice;
    END IF;
  COMMIT;
END //

-- DELETE Procedures

-- Create procedure sp_delete_location
DROP PROCEDURE IF EXISTS sp_delete_location //
CREATE PROCEDURE sp_delete_location (
  IN p_id_location INT
)
BEGIN
  DELETE FROM Locations WHERE id_location = p_id_location;
END //

-- Create procedure sp_delete_employee
DROP PROCEDURE IF EXISTS sp_delete_employee //
CREATE PROCEDURE sp_delete_employee (
  IN p_id_employee INT
)
BEGIN
  DELETE FROM Employees WHERE id_employee = p_id_employee;
END //

-- Create procedure sp_delete_customer
DROP PROCEDURE IF EXISTS sp_delete_customer //
CREATE PROCEDURE sp_delete_customer (
  IN p_id_customer INT
)
BEGIN
  DELETE FROM Customers WHERE id_customer = p_id_customer;
END //

-- Create procedure sp_delete_service
DROP PROCEDURE IF EXISTS sp_delete_service //
CREATE PROCEDURE sp_delete_service (
  IN p_id_service INT
)
BEGIN
  DELETE FROM Services WHERE id_service = p_id_service;
END //

-- Create procedure sp_delete_invoice
DROP PROCEDURE IF EXISTS sp_delete_invoice //
CREATE PROCEDURE sp_delete_invoice (
  IN p_id_invoice INT
)
BEGIN
  DELETE FROM Invoices WHERE id_invoice = p_id_invoice;
END //

-- Create procedure sp_delete_invoice_service
DROP PROCEDURE IF EXISTS sp_delete_invoice_service //
CREATE PROCEDURE sp_delete_invoice_service (
  IN p_id_invoice_service INT
)
BEGIN
  DECLARE stored_id_invoice INT;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    SELECT 'DELETE ERROR!' AS result;
    ROLLBACK;
  END;
  START TRANSACTION;
    -- Store the id_invoice
    SELECT id_invoice INTO stored_id_invoice
    FROM Invoices_Services
    WHERE id_invoice_service = p_id_invoice_service;
    -- Delete a row in Invoices_Services
    DELETE FROM Invoices_Services WHERE id_invoice_service = p_id_invoice_service;
    -- Update the total in Invoices
    UPDATE Invoices
    SET total = (
      SELECT IFNULL(SUM(sale_price), 0)
      FROM Invoices_Services
      WHERE id_invoice = stored_id_invoice
      )
    WHERE id_invoice = stored_id_invoice;
  COMMIT;
END //

DELIMITER ;

-- Finish
SET FOREIGN_KEY_CHECKS = 1;

