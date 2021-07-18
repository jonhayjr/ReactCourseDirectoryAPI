'use strict';
const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}
  User.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First name is required'
        },
        notEmpty: {
          msg: 'Please provide a first name'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last name is required'
        },
        notEmpty: {
          msg: "Please provide a last name"
        }
    }
  },
    emailAddress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
          msg: 'The email address that you entered already exists'
        },
        validate: {
          isEmail: {
            msg: 'Please provide a valid email address'
          },
          notNull: {
            msg: 'Email address is required'
          },
          notEmpty: {
            msg: "Please provide an email address"
          }
      }
    },
    password: {
      type: DataTypes.STRING,  
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: "Please provide a password"
        }
    }
  }
}, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId'
      },
    });
  };

  return User;
};
