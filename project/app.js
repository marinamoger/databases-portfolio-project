/*
* Project Name: Old Mike’s Car Full-Service Transaction Management System
* Project Group: 45
* Group Members: Lei Feng, Marina Moger
* Description: The entry point file.
*/

// Citation:
// Date: 11/03/2025
// Some code in this document is adapted from Canvas Course Module.
// Source URL: https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131

/*
* Setup
*/

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const PORT = 1045

// Database
const db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars'); // Import express-handlebars engine
app.engine('.hbs', engine({ extname: '.hbs' })); // Create instance of handlebars
app.set('view engine', '.hbs'); // Use handlebars engin for *.hbs files

/*
* Route handlers
*/

// READ using GET /
app.get('/', async (req, res) => {
  try {
    res.render('home'); // Render the home.hbs file
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
