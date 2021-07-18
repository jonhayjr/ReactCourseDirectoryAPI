'use strict';
const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const e = require('express');
const { User } = require('../models');

// Middleware to authenticate the request using Basic Authentication.
exports.authenticateUser = async (req, res, next) => {
    let message;
    //Parse the user's credentials from the Authorization header.
    const credentials = auth(req);

    //If user's credentials are available
    if (credentials) {
        const user = await User.findOne({where: {emailAddress: credentials.name}, attributes: { exclude: ['createdAt', 'updatedAt'] }});
        if (user) {
            const authenticated = bcrypt
                .compareSync(credentials.pass, user.password);
           
            if (authenticated) { //If the passwords match
                console.log(`Authentication successful for user: ${user.emailAddress}`);
                
                //Store the user on the Request object
                req.currentUser = user;
            } else {
                message = `Authentication failure for username: ${user.emailAddress}`;
            }
        } else {
            message = `User not found for username: ${credentials.name}`;
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({message: 'Access Denied'});
    } else {
        next();
    }
}