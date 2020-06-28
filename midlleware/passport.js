'use strict'
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('../config/keys.js');

const User = require('../models/usersh.js'); //add model
 
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // mean that: take token from headers
    secretOrKey: keys.jwt,
};

module.exports = (passport) => { // we pass the variable to app.js
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userID).select('email id'); // find user by id, and select params
                // from token
                if (user) {
                    done(null, user)// first param -> err, second .....
                } else {
                    done(null, false)//user not found, we not add params to request
                }
            } catch (err) {
                console.log(err);
            }
          })
    );
}