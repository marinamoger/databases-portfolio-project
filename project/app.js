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
    const [locations] = await db.query(query);
    res.render('pages/locations', { locations: locations[0] }); // Render the locations.hbs file
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query = `CALL sp_find_location(?);`;
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [location] = await db.query(query, [id]);
      res.render('edit/edit_location', { location: location[0][0] });
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query = `CALL sp_find_location(?);`;
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [location] = await db.query(query, [id]);
      res.render('delete/delete_location', { location: location[0][0] });
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
    const [employees] = await db.query(query);
    res.render('pages/employees', { employees: employees[0] }); // Render the employees.hbs file
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
    const [locations] = await db.query(query);
    res.render('add/add_employee', { locations: locations[0] });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load edit_employee page using GET /edit_employee?id=
app.get('/edit_employee', async (req, res) => {
  const id = req.query.id;
  try {
    // Create and execute queries
    const query_1 = `CALL sp_show_locations;`;
    const query_2 = `CALL sp_find_employee(?);`;
    const [locations] = await db.query(query_1);
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [employee] = await db.query(query_2, [id]);
      if (employee[0][0]) {
        const date = employee[0][0].date_of_birth;
        const date_of_birth = `${date.slice(6, 10)}-${date.slice(0, 2)}-${date.slice(3, 5)}`;
        res.render('edit/edit_employee', { locations: locations[0], employee: employee[0][0], date_of_birth: date_of_birth });
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query = `CALL sp_find_employee(?);`;
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [employee] = await db.query(query, [id]);
      res.render('delete/delete_employee', { employee: employee[0][0] });
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
    const [customers] = await db.query(query);
    res.render('pages/customers', { customers: customers[0] }); // Render the customers.hbs file
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query = `CALL sp_find_customer(?);`;
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [customer] = await db.query(query, [id]);
      if (customer[0][0]) {
        const date = customer[0][0].date_of_birth;
        const date_of_birth = `${date.slice(6, 10)}-${date.slice(0, 2)}-${date.slice(3, 5)}`;
        res.render('edit/edit_customer', { customer: customer[0][0], date_of_birth: date_of_birth});
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query = `CALL sp_find_customer(?);`;
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [customer] = await db.query(query, [id]);
      res.render('delete/delete_customer', { customer: customer[0][0] });
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
    const [services] = await db.query(query);
    res.render('pages/services', { services: services[0] }); // Render the services.hbs file
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query = `CALL sp_find_service(?);`;
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [service] = await db.query(query, [id]);
      res.render('edit/edit_service', { service: service[0][0] });
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query = `CALL sp_find_service(?);`;
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [service] = await db.query(query, [id]);
      res.render('delete/delete_service', { service: service[0][0] });
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
    const [invoices] = await db.query(query_1);
    const [invoices_services] = await db.query(query_2);
    res.render('pages/invoices', { invoices: invoices[0], invoices_services: invoices_services[0] });
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
    const [customers] = await db.query(query_1);
    const [employees] = await db.query(query_2);
    const [locations] = await db.query(query_3);
    res.render('add/add_invoice', { customers: customers[0], employees: employees[0], locations: locations[0] });
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
    const [invoices] = await db.query(query_1);
    const [services] = await db.query(query_2);
    res.render('add/add_invoice_service', { invoices: invoices[0], services: services[0] });
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

// READ: load the edit_invoice page using GET/edit_invoice?id=
app.get('/edit_invoice', async (req, res) => {
  const id = req.query.id;
  try {
    // Create and execute queries
    const query_1 = `CALL sp_show_customers;`;
    const query_2 = `CALL sp_show_employees;`;
    const query_3 = `CALL sp_show_locations;`;
    const query_4 = `CALL sp_find_invoice(?);`;
    const [customers] = await db.query(query_1);
    const [employees] = await db.query(query_2);
    const [locations] = await db.query(query_3);
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [invoice] = await db.query(query_4, [id]);
      if (invoice[0][0]) {
      const time = invoice[0][0].date;
      const date = `${time.slice(6, 10)}-${time.slice(0, 2)}-${time.slice(3, 5)}T${time.slice(11, 19)}`;
      res.render('edit/edit_invoice', { customers: customers[0], employees: employees[0], locations: locations[0], invoice: invoice[0][0], date: date });
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query_1 = `CALL sp_show_invoices;`;
    const query_2 = `CALL sp_show_services;`;
    const query_3 = `CALL sp_find_invoice_service(?);`;
    const [invoices] = await db.query(query_1);
    const [services] = await db.query(query_2);
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [invoice_service] = await db.query(query_3, [id]);
      res.render('edit/edit_invoice_service', { invoices: invoices[0], services: services[0], invoice_service: invoice_service[0][0] });
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query = `CALL sp_find_invoice(?);`;
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [invoice] = await db.query(query, [id]);
      res.render('delete/delete_invoice', { invoice: invoice[0][0] });
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
  const id = req.query.id;
  try {
    // Create and execute queries
    const query = `CALL sp_find_invoice_service(?);`;
    if (Number.isInteger(Number(id)) && Number(id)) {
      const [invoice_service] = await db.query(query, [id]);
      res.render('delete/delete_invoice_service', { invoice_service: invoice_service[0][0] });
    } else {
      res.render('delete/delete_invoice_service');
    }
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while rendering the page.');
  }
});

/*
* CREATE route handlers
*/

// CREATE: create location using POST/location/create
app.post('/location/create', async (req, res) => {
  try {
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
    res.redirect('/invoices');
  } catch (err) {
    console.error('Error rendering page:', err);
    // Send a generic error message to the browser
    res.status(500).send('An error occurred while executing the database queries.');
  }
});

/*
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

/*
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


/*
* Listener
*/

app.listen(PORT, () => {
  console.log(`Express started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});
