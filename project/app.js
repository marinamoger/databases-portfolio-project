/**
 * Project Name: Old Mike’s Car Full-Service Transaction Management System
 * Project Group: 45
 * Group Members: Lei Feng, Marina Moger
 * Description: The entry point file.
 * Citation:
 * Date: 11/03/2025
 * Some code in this document is adapted from Canvas Course Module.
 * Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131
 * Source URL: 
 */

/**
 * Setup
 */

// Import helper functions
const { isValidID, formatPhoneNumber, checkEmptyString } = require('./script/helpers');

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

/**
 * READ route handlers
 */

// READ: load the home page using GET /
app.get('/', async (req, res) => {
  try {
    res.render('pages/home'); // Render the home.hbs file
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// Locations:

// READ: load the Locations table using GET /locations
app.get('/locations', async (req, res) => {
  try {
    // Create and execute queries
    const query = `CALL sp_show_locations;`;
    const [[locations]] = await db.query(query);
    res.render('pages/locations', { locations: locations }); // Render the locations.hbs file
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load add_location page using GET /add_location
app.get('/add_location', async (req, res) => {
  try {
    res.render('add/add_location');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load edit_location page using GET /edit_location?id=
app.get('/edit_location', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query = `CALL sp_find_location(?);`;
    if (isValidID(id)) {
      const [[[location]]] = await db.query(query, [id]);
      res.render('edit/edit_location', { location: location });
    } else {
      res.render('edit/edit_location');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the delete_location page using GET /delete_location?id=
app.get('/delete_location', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query = `CALL sp_find_location(?);`;
    if (isValidID(id)) {
      const [[[location]]] = await db.query(query, [id]);
      res.render('delete/delete_location', { location: location });
    } else {
      res.render('delete/delete_location');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// Employees:

// READ: load the Employees table using GET /employees
app.get('/employees', async (req, res) => {
  try {
    // Create and execute queries
    const query = `CALL sp_show_employees;`;
    const [[employees]] = await db.query(query);
    res.render('pages/employees', { employees: employees }); // Render the employees.hbs file
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
    const query = `CALL sp_show_locations;`;
    const [[locations]] = await db.query(query);
    res.render('add/add_employee', { locations: locations });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load edit_employee page using GET /edit_employee?id=
app.get('/edit_employee', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query_1 = `CALL sp_show_locations;`;
    const query_2 = `CALL sp_find_employee(?);`;
    const [[locations]] = await db.query(query_1);
    if (isValidID(id)) {
      const [[[employee]]] = await db.query(query_2, [id]);
      if (employee) {
        const date = employee.date_of_birth;
        const date_of_birth = `${date.slice(6, 10)}-${date.slice(0, 2)}-${date.slice(3, 5)}`;
        res.render('edit/edit_employee', { locations: locations, employee: employee, date_of_birth: date_of_birth });
      } else {
        res.render('edit/edit_employee');
      }
    } else {
      res.render('edit/edit_employee');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the delete_employee page using GET /delete_employee?id=
app.get('/delete_employee', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query = `CALL sp_find_employee(?);`;
    if (isValidID(id)) {
      const [[[employee]]] = await db.query(query, [id]);
      res.render('delete/delete_employee', { employee: employee });
    } else {
      res.render('delete/delete_employee');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// Customers:

// READ: load the Customers table using GET /customers
app.get('/customers', async (req, res) => {
  try {
    // Create and execute queries
    const query = `CALL sp_show_customers;`;
    const [[customers]] = await db.query(query);
    res.render('pages/customers', { customers: customers }); // Render the customers.hbs file
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load add_customer page using GET /add_customer
app.get('/add_customer', async (req, res) => {
  try {
    res.render('add/add_customer');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load edit_customer page using GET /edit_customer?id=
app.get('/edit_customer', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query = `CALL sp_find_customer(?);`;
    if (isValidID(id)) {
      const [[[customer]]] = await db.query(query, [id]);
      if (customer) {
        const date = customer.date_of_birth;
        const date_of_birth = `${date.slice(6, 10)}-${date.slice(0, 2)}-${date.slice(3, 5)}`;
        res.render('edit/edit_customer', { customer: customer, date_of_birth: date_of_birth});
      } else {
        res.render('edit/edit_customer');
      }
    } else {
      res.render('edit/edit_customer');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the delete_customer page using GET /delete_customer?id=
app.get('/delete_customer', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query = `CALL sp_find_customer(?);`;
    if (isValidID(id)) {
      const [[[customer]]] = await db.query(query, [id]);
      res.render('delete/delete_customer', { customer: customer });
    } else {
      res.render('delete/delete_customer');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// Services:

// READ: load the Services table using GET /services
app.get('/services', async (req, res) => {
  try {
    // Create and execute queries
    const query = `CALL sp_show_services;`;
    const [[services]] = await db.query(query);
    res.render('pages/services', { services: services }); // Render the services.hbs file
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load add_service page using GET /add_service
app.get('/add_service', async (req, res) => {
  try {
    res.render('add/add_service');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load edit_service page using GET /edit_service?id=
app.get('/edit_service', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query = `CALL sp_find_service(?);`;
    if (isValidID(id)) {
      const [[[service]]] = await db.query(query, [id]);
      res.render('edit/edit_service', { service: service });
    } else {
      res.render('edit/edit_service');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the delete_service page using GET /delete_service?id=
app.get('/delete_service', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query = `CALL sp_find_service(?);`;
    if (isValidID(id)) {
      const [[[service]]] = await db.query(query, [id]);
      res.render('delete/delete_service', { service: service });
    } else {
      res.render('delete/delete_service');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// Invoices & Invoices_Services:

// READ: load the invoices page using GET /invoices
app.get('/invoices', async (req, res) => {
  try {
    // Create and execute queries
    const query_1 = `CALL sp_show_invoices;`;
    const query_2 = `CALL sp_show_invoices_services;`;
    const [[invoices]] = await db.query(query_1);
    const [[invoices_services]] = await db.query(query_2);
    res.render('pages/invoices', { invoices: invoices, invoices_services: invoices_services });
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
    const query_1 = `CALL sp_show_customers;`;
    const query_2 = `CALL sp_show_employees;`;
    const query_3 = `CALL sp_show_locations;`;
    const [[customers]] = await db.query(query_1);
    const [[employees]] = await db.query(query_2);
    const [[locations]] = await db.query(query_3);
    res.render('add/add_invoice', { customers: customers, employees: employees, locations: locations });
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
    const query_1 = `CALL sp_show_invoices;`;
    const query_2 = `CALL sp_show_services;`;
    const [[invoices]] = await db.query(query_1);
    const [[services]] = await db.query(query_2);
    res.render('add/add_invoice_service', { invoices: invoices, services: services });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the edit_invoice page using GET/edit_invoice?id=
app.get('/edit_invoice', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query_1 = `CALL sp_show_customers;`;
    const query_2 = `CALL sp_show_employees;`;
    const query_3 = `CALL sp_show_locations;`;
    const query_4 = `CALL sp_find_invoice(?);`;
    const [[customers]] = await db.query(query_1);
    const [[employees]] = await db.query(query_2);
    const [[locations]] = await db.query(query_3);
    if (isValidID(id)) {
      const [[[invoice]]] = await db.query(query_4, [id]);
      if (invoice) {
      const time = invoice.date;
      const date = `${time.slice(6, 10)}-${time.slice(0, 2)}-${time.slice(3, 5)}T${time.slice(11, 19)}`;
      res.render('edit/edit_invoice', { customers: customers, employees: employees, locations: locations, invoice: invoice, date: date });
      } else {
        res.render('edit/edit_invoice');
      }
    } else {
      res.render('edit/edit_invoice');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the edit_invoice_service page using GET/edit_invoice_service?id=
app.get('/edit_invoice_service', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query_1 = `CALL sp_show_invoices;`;
    const query_2 = `CALL sp_show_services;`;
    const query_3 = `CALL sp_find_invoice_service(?);`;
    const [[invoices]] = await db.query(query_1);
    const [[services]] = await db.query(query_2);
    if (isValidID(id)) {
      const [[[invoice_service]]] = await db.query(query_3, [id]);
      res.render('edit/edit_invoice_service', { invoices: invoices, services: services, invoice_service: invoice_service });
    } else {
      res.render('edit/edit_invoice_service');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the delete_invoice page using GET /delete_invoice?id=
app.get('/delete_invoice', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query = `CALL sp_find_invoice(?);`;
    if (isValidID(id)) {
      const [[[invoice]]] = await db.query(query, [id]);
      res.render('delete/delete_invoice', { invoice: invoice });
    } else {
      res.render('delete/delete_invoice');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the delete_invoice_service page using GET /delete_invoice_service?id=
app.get('/delete_invoice_service', async (req, res) => {
  try {
    const id = req.query.id;
    // Create and execute queries
    const query = `CALL sp_find_invoice_service(?);`;
    if (isValidID(id)) {
      const [[[invoice_service]]] = await db.query(query, [id]);
      res.render('delete/delete_invoice_service', { invoice_service: invoice_service });
    } else {
      res.render('delete/delete_invoice_service');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

/**
 * CREATE route handlers
 */

// CREATE: create location using POST/location/create
app.post('/location/create', async (req, res) => {
  try {
    const name = req.body.create_name;
    const address = req.body.create_address;
    // Create and execute queries
    const query = `CALL sp_create_location(?, ?, @new_id_location);`;
    const [[[result]]] = await db.query(query, [name, address]);
    console.log(`CREATE location: id=${result.new_id_location} name="${name}" address="${address}"`);
    res.redirect('/locations');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// CREATE: create employee using POST/employee/create
app.post('/employee/create', async (req, res) => {
  try {
    const first_name = req.body.create_first_name;
    const last_name = req.body.create_last_name;
    const date_of_birth = req.body.create_date_of_birth;
    const phone_number = formatPhoneNumber(req.body.create_phone_number);
    const email_address = req.body.create_email_address;
    const id_location = req.body.create_id_location;
    // Create and execute queries
    const query = `CALL sp_create_employee(?, ?, ?, ?, ?, ?, @new_id_employee);`;
    const [[[result]]] = await db.query(query, [first_name, last_name, date_of_birth, phone_number, email_address, id_location]);
    console.log(`CREATE employee: id=${result.new_id_employee} first_name="${first_name}" last_name="${last_name}" date_of_birth="${date_of_birth}" phone_number="${phone_number}" email_address="${email_address}" id_location=${id_location}`);
    res.redirect('/employees');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// CREATE: create customer using POST/customer/create
app.post('/customer/create', async (req, res) => {
  try {
    const first_name = req.body.create_first_name;
    const last_name = req.body.create_last_name;
    const date_of_birth = req.body.create_date_of_birth;
    const phone_number = formatPhoneNumber(req.body.create_phone_number);
    const email_address = checkEmptyString(req.body.create_email_address);
    const address = checkEmptyString(req.body.create_address);
    // Create and execute queries
    const query = `CALL sp_create_customer(?, ?, ?, ?, ?, ?, @new_id_customer);`;
    const [[[result]]] = await db.query(query, [first_name, last_name, date_of_birth, phone_number, email_address, address]);
    console.log(`CREATE customer: id=${result.new_id_customer} first_name="${first_name}" last_name="${last_name}" date_of_birth="${date_of_birth}" phone_number="${phone_number}" email_address="${email_address}" address="${address}"`);
    res.redirect('/customers');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// CREATE: create service using POST/service/create
app.post('/service/create', async (req, res) => {
  try {
    const name = req.body.create_name;
    const description = checkEmptyString(req.body.create_description);
    const price = req.body.create_price;
    // Create and execute queries
    const query = `CALL sp_create_service(?, ?, ?, @new_id_service);`;
    const [[[result]]] = await db.query(query, [name, description, price]);
    console.log(`CREATE service: id=${result.new_id_service} name="${name}" description="${description}" price=${price}`);
    res.redirect('/services');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// CREATE: create invoice using POST/invoice/create
app.post('/invoice/create', async (req, res) => {
  try {
    const id_customer = req.body.create_id_customer;
    const id_employee = req.body.create_id_employee;
    const id_location = req.body.create_id_location;
    const date = req.body.create_date;
    // Create and execute queries
    const query = `CALL sp_create_invoice(?, ?, ?, ?, @new_id_invoice);`;
    const [[[result]]] = await db.query(query, [id_customer, id_employee, id_location, date]);
    console.log(`CREATE invoice: id=${result.new_id_invoice} id_customer=${id_customer} id_employee=${id_employee} id_location=${id_location} date="${date}"`);
    res.redirect('/invoices');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// CREATE: create invoice_service using POST/invoice_service/create
app.post('/invoice_service/create', async (req, res) => {
  try {
    const id_invoice = req.body.create_id_invoice;
    const id_service = req.body.create_id_service;
    const sale_price = checkEmptyString(req.body.create_sale_price);
    const query = `CALL sp_create_invoice_service(?, ?, ?, @new_id_invoice_service);`;
    const [[[result]]] = await db.query(query, [id_invoice, id_service, sale_price]);
    console.log(`CREATE invoice_service: id=${result.new_id_invoice_service} id_invoice=${id_invoice} id_service=${id_service} sale_price=${sale_price}`);
    res.redirect('/invoices');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

/**
 * UPDATE route handlers
 */

// UPDATE: update location using POST/location/update
app.post('/location/update', async (req, res) => {
  try {
    res.redirect('/locations');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// UPDATE: update employee using POST/employee/update
app.post('/employee/update', async (req, res) => {
  try {
    res.redirect('/employees');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// UPDATE: update customer using POST/customer/update
app.post('/customer/update', async (req, res) => {
  try {
    res.redirect('/customers');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// UPDATE: update service using POST/service/update
app.post('/service/update', async (req, res) => {
  try {
    res.redirect('/services');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// UPDATE: update invoice using POST/invoice/update
app.post('/invoice/update', async (req, res) => {
  try {
    res.redirect('/invoices');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// UPDATE: update invoice_service using POST/invoice_service/update
app.post('/invoice_service/update', async (req, res) => {
  try {
    res.redirect('/invoices');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

/**
 * DELETE route handlers
 */

// DELETE: delete location using POST/location/delete
app.post('/location/delete', async (req, res) => {
  try {
    res.redirect('/locations');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// DELETE: delete employee using POST/employee/delete
app.post('/employee/delete', async (req, res) => {
  try {
    res.redirect('/employees');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// DELETE: delete customer using POST/customer/delete
app.post('/customer/delete', async (req, res) => {
  try {
    res.redirect('/customers');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// DELETE: delete service using POST/service/delete
app.post('/service/delete', async (req, res) => {
  try {
    res.redirect('/services');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// DELETE: delete invoice using POST/invoice/delete
app.post('/invoice/delete', async (req, res) => {
  try {
    res.redirect('/invoices');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

// DELETE: delete invoice_service using POST/invoice_service/delete
app.post('/invoice_service/delete', async (req, res) => {
  try {
    res.redirect('/invoices');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

/**
 * RESET route handlers
 */

// READ: load the reset page using GET /reset
app.get('/reset', async (req, res) => {
  try {
    res.render('pages/reset');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// RESET: reset the database using GET /load_database
app.get('/load_database', async (req, res) => {
  try {
    // Create and execute queries
    const query = `CALL sp_load_database();`;
    db.query(query);
    res.redirect('/');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

/**
 * Listener
 */

app.listen(PORT, () => {
  console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});
