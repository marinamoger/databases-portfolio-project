If you need to rebuild the app before run it. To do so, please follow the steps below:
1. Clone/copy the project folder.
2. Open a Terminal and move into the project folder.
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
