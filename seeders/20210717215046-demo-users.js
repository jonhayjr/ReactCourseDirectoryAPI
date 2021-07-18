'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        firstName: "Joe",
        lastName: "Smith",
        emailAddress: "joe@smith.com",
        password: bcrypt.hashSync("joepassword", 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: "Sally",
        lastName: "Jones",
        emailAddress: "sally@jones.com",
        password: bcrypt.hashSync("sallypassword", 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};