const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {User, Course} = require('../models');

//Imports asyncHandler middleware function
const { asyncHandler } = require('../middleware/async-handler');
//Imports authenticateUser middleware function
const { authenticateUser } = require('../middleware/auth-user');

// Route that returns all courses
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    //Exclude createdAt and updatedAt columns from query
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    order: ['id'],
    include: [{
      model: User,
    //Exclude password, createdAt, and updatedAt columns from query
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    }
  ],
  });

  res.json(courses);
}));

// Route that returns course for specific id
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const {id} = req.params;
  const course = await Course.findByPk(id, {
    //Exclude createdAt and updatedAt columns from query
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [{
      model: User,
      //Exclude createdAt, updatedAt, and password columns from query
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    }],
  });
  
  //If course exists, return it.  If not, throw a 404 error.
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({message: 'Course does not exist'});
 }
  
}));

//Route that creates a new course
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res.location(`/courses/${course.id}`).status(201).end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
}));

//Route that updates course with the corresponding id
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
  //Currently authenticated user
  const authenticatedUser = req.currentUser;
  const { id } = req.params;
  const course = await Course.findByPk(id);
    try {
      //Checks if course exists
      if (course) {
          const courseUserId = course.userId;
          //Checks if authenticated user is course owner.  If so, course is updated.
          if (authenticatedUser.id === courseUserId) {
            await course.update(req.body);
            res.status(204).end();
          } else {
          res.status(403).json({message: 'Only the course owner can perform this action'});
        } 
    } else {
      res.status(404).json({message: `Course ID ${id} does not exist`});
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
      } else {
          throw error;
      }
  }

}));

//Route that deletes course with the corresponding id
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
  //Currently authenticated user
  const authenticatedUser = req.currentUser;
  const { id } = req.params;
  const course = await Course.findByPk(id);
        try {
          //Checks if course exists
          if (course) {
            const courseUserId = course.userId;
            //Checks if authenticated user is the course owner
            if (authenticatedUser.id === courseUserId) {
              await course.destroy();
              res.status(204).end();
            } else {
                res.status(403).json({message: 'Only the course owner can perform this action'});
            }   
          } else {
              res.status(404).json({message: `Course ID ${id} does not exist`});
            }
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