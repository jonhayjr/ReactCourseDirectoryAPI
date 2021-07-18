# REST API SQL
This API will provides a way for users to interact with a school database that contains user and course information.  Users can create new courses, retrieve data on existing courses and update or delete existing course.  To make changes to the databases, users need to login with valid credentials.  Users can also request their account information or create a new account.

## Getting Started

1. Run `npm install` to install the necessary dependencies.
2. Run the command `npm start` to start the app.
3. To repopulate data, you can run `node_modules/.bin/sequelize db:seed --seed 20210717215046-demo-users.js`
   and then run `node_modules/.bin/sequelize db:seed --seed 20210717215046-demo-courses.js`;