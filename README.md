If you have the latest version of Node.js installed on your local machine, you can run this app locally. To do so, please follow the steps below:
1. Clone/copy the project folder into your local machine.
2. Run `npm install`.
3. Run `npm run development` for development build, or `npm run production` for production build.
4. To stop the production build by `npm run stop_production`.

However, since the school server only has an older version of Node.js installed, you need to rebuild the app to run it on the school server. To do so, please follow the steps below:
1. Clone/copy the project folder into your school server.
2. Remove the `package-lock.json` and `package.json` files.
3. Run `npm init`.
4. Run `npm install mysql2 express nodemon forever express-handlebars`.
5. Open the newly created `package.json` file, under the scripts section, replace the `test` script with the following:
  ```
    "scripts": {
      "development": "npx nodemon app.js",
      "production": "npx forever start app.js",
      "stop_production": "npx forever stop app.js"
    },
  ```
7. Run `npm run development` for development build, or `npm run production` for production build.
8. To stop the production build by `npm run stop_production`.
