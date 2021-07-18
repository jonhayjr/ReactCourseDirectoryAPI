const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User, Course} = require('../models');
//Imports asyncHandler middleware function
const { asyncHandler } = require('../middleware/async-handler');
//Imports authenticateUser middleware function
const { authenticateUser } = require('../middleware/auth-user');


// Route that returns the current authenticated user.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    //Get Authenticated User
    const user = req.currentUser;
      //Return all data for currently authenticated user except password, createdAt and updatedAt fields
      res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
      });  
  }));

// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
  try {
    const user = req.body;

    //If there is a password, hash it.
    if (user.password) {
      user.password = bcrypt.hashSync(user.password, 10);
    }
    await User.create(user);
    res.location('/').status(201).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

module.exports = router;