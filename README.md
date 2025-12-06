# CS340 Portfolio Project

## Project Information:
Project Name: Old Mike's Car Full-Service Transaction Management System  
Project Group 45  
Group Members: Lei Feng, Marina Moger  
URL: http://classwork.engr.oregonstate.edu:1045/  

## Use Guide:
You need to rebuild the app before running it. To do so, please follow the steps below:
1. Clone/copy the project folder.  
2. Open a Terminal and move into the project folder.  
3. Run `npm init`.  
4. Run `npm install mysql2 express nodemon forever express-handlebars`.  
5. Open the newly created `package.json` file, under the scripts section, replace the `test` script with the following:

    ```json
    "scripts": {
      "development": "npx nodemon app.js",
      "production": "npx forever start app.js",
      "stop_production": "npx forever stop app.js"
    },
    ```

6. In database/db-connector.js, change the following items:

    ```js
    host              : 'classmysql.engr.oregonstate.edu',
    user              : 'cs340_[your_onid]',  // change [your_onid] to your onid
    password          : '[your_db_password]', // your dababase password
    database          : 'cs340_[your_onid]'   // change [your_onid] to your onid
    ```

   You can also use your local server and set these correspondingly.
7. In app.js, change the following item:  

    ```js
    const PORT = YOUR_PORT_NUM; // change YOUR_PORT_NUM to the port number your want to use
    ```

   On the school server, any number within [1024 - 65535] exclusive is acceptable. Numbers in [0 - 1024] inclusive are privileged. Avoid numbers like 1234 (incremental increases), or 2222 (repeating) as students often prefer these easier numbers to type in and are often already in use.
8. Use the `DDL.sql` file located in the `sql` folder to import the database.  
9. Run `npm run development` for development build, or `npm run production` for production build.  
10. To stop the production build by `npm run stop_production`.  
