/*
* Project Name: Old Mike’s Car Full-Service Transaction Management System
* Project Group: 45
* Group Members: Lei Feng, Marina Moger
* Description: The entry point file.
* Citation:
* Date: 11/03/2025
* Some code in this document is adapted from Canvas Course Module.
* Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
*/

/*
* Setup
*/

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Port number
const PORT = YOUR_PORT_NUM;

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
const e = require('express');
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engin for *.hbs files

/*
* Route handlers
*/

// READ: load the home page using GET /
app.get('/', async (req, res) => {
  try {
    res.render('home'); // Render the home.hbs file
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the Locations table using GET /locations
app.get('/locations', async (req, res) => {
  try {
    // Create and execute queries
    const query = `SELECT * FROM v_locations;`;
    const [locations] = await db.query(query);
    res.render('locations', { locations: locations }); // Render the locations.hbs file
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load add_location page using GET /add_location
app.get('/add_location', async (req, res) => {
  try {
    res.render('add_location');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load add_location page using GET /edit_location
app.get('/edit_location', async (req, res) => {
  try {
    res.render('edit_location');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the Employees table using GET /employees
app.get('/employees', async (req, res) => {
  try {
    // Create and execute queries
    const query = `SELECT * FROM v_employees;`;
    const [employees] = await db.query(query);
    res.render('employees', { employees: employees }); // Render the employees.hbs file
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load add_employee page using GET /add_employee
app.get('/add_employee', async (req, res) => {
  try {
    // Create and execute queries
    const query = `SELECT * FROM v_locations;`;
    const [locations] = await db.query(query);
    res.render('add_employee', { locations:locations });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load edit_employee page using GET /edit_employee
app.get('/edit_employee', async (req, res) => {
  try {
    // Create and execute queries
    const query = `SELECT * FROM v_locations;`;
    const [locations] = await db.query(query);
    res.render('edit_employee', { locations:locations });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the Customers table using GET /customers
app.get('/customers', async (req, res) => {
  try {
    // Create and execute queries
    const query = `SELECT * FROM v_customers;`;
    const [customers] = await db.query(query);
    res.render('customers', { customers: customers }); // Render the customers.hbs file
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load add_customer page using GET /add_customer
app.get('/add_customer', async (req, res) => {
  try {
    res.render('add_customer');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load edit_customer page using GET /edit_customer
app.get('/edit_customer', async (req, res) => {
  try {
    res.render('edit_customer');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the Services table using GET /services
app.get('/services', async (req, res) => {
  try {
    // Create and execute queries
    const query = `SELECT * FROM v_services;`;
    const [services] = await db.query(query);
    res.render('services', { services: services }); // Render the services.hbs file
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load add_service page using GET /add_service
app.get('/add_service', async (req, res) => {
  try {
    res.render('add_service');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load edit_service page using GET /edit_service
app.get('/edit_service', async (req, res) => {
  try {
    res.render('edit_service');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the invoices page using GET /invoices
app.get('/invoices', async (req, res) => {
  try {
    // Create and execute queries
    const query_1 = `SELECT * FROM v_invoices;`;
    const query_2 = `SELECT * FROM v_invoices_services;`;
    const [invoices] = await db.query(query_1);
    const [invoices_services] = await db.query(query_2);
    res.render('invoices', { invoices: invoices, invoices_services: invoices_services });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the add_invoice page using GET/add_invoice
app.get('/add_invoice', async (req, res) => {
  try {
    // Create and execute queries
    const query_1 = `SELECT * FROM v_customers;`;
    const query_2 = `SELECT * FROM v_employees;`;
    const query_3 = `SELECT * FROM v_locations`;
    const [customers] = await db.query(query_1);
    const [employees] = await db.query(query_2);
    const [locations] = await db.query(query_3);
    res.render('add_invoice', { customers: customers, employees: employees, locations:locations });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the add_invoice_service page using GET/add_invoice_service
app.get('/add_invoice_service', async (req, res) => {
  try {
    // Create and execute queries
    const query_1 = `SELECT * FROM v_invoices;`;
    const query_2 = `SELECT * FROM v_services;`;
    const [invoices] = await db.query(query_1);
    const [services] = await db.query(query_2);
    res.render('add_invoice_service', { invoices: invoices, services: services });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the edit_invoice page using GET/edit_invoice
app.get('/edit_invoice', async (req, res) => {
  try {
    // Create and execute queries
    const query_1 = `SELECT * FROM v_customers;`;
    const query_2 = `SELECT * FROM v_employees;`;
    const query_3 = `SELECT * FROM v_locations`;
    const [customers] = await db.query(query_1);
    const [employees] = await db.query(query_2);
    const [locations] = await db.query(query_3);
    res.render('edit_invoice', { customers:customers, employees:employees, locations:locations });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the edit_invoice_service page using GET/edit_invoice_service
app.get('/edit_invoice_service', async (req, res) => {
  try {
    // Create and execute queries
    const query_1 = `SELECT * FROM v_invoices;`;
    const query_2 = `SELECT * FROM v_services;`;
    const [invoices] = await db.query(query_1);
    const [services] = await db.query(query_2);
    res.render('edit_invoice_service', { invoices:invoices, services:services });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

/*
* Listener
*/

app.listen(PORT, () => {
  console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});
