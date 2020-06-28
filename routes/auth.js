'use strict'
const express = require('express');
const bcrypt = require('bcryptjs');// pacage for crypt password!!!
const jwt = require('jsonwebtoken');
const keys = require('../config/keys.js'); // export obj keys from keys.js
const routAuth = express.Router();

const User = require('../models/usersh.js');

routAuth.get('/user', function (req, res) {
    // res.send('respond with a resource');
    res.render('authlogin.hbs', {
        title: 'logIn',
    })// рендерим страницу authlogin.hbs
});

routAuth.get('/usersignin', function (req, res) {
    // res.send('respond with a resource');
    res.render('authsign.hbs', {
        title: 'Sign in',
    })// рендерим страницу authsignin.hbs
});

routAuth.post('/createuser', async (req, res) => {

    const condidate = await User.findOne({ email: req.body.email });

    if (condidate) {
        //user is , throw err
       // res.status(409);
        res.status(409);
        res.send('<h4>Try other email</h4>');
       
        //    json({
        //    message: 'Try other email.'
        //});
    } else {
        //create user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,   //req.body.email value from browser
            password: bcrypt.hashSync(password, salt), //req.body.password value from browser
        });

        try {
            await user.save(); // await, because return promise
            res.status(201);
        }
        catch (err) {
            // throw err
        }
    }
      res.redirect('/user');
});

routAuth.post('/signinuser', async (req, res) => {

    const condidate = await User.findOne({ email: req.body.email });

    if (condidate) {
        // check password
        const passwordResult = bcrypt.compareSync(req.body.password, condidate.password);
        if (passwordResult) {
            // generate Token, paswords compared true
            const token = jwt.sign({
                email: condidate.email,
                userID: condidate._id,
            }, keys.jwt, { expiresIn: 3600 }); // 3600 time token live

            res.status(200).json({ token: `Bearer ${token}` });
            
        } else {
            res.status(401);
            res.send('<h4>Wrong password</h4>');
        }

    } else {
        res.status(404);
        res.send('<h4>User not found</h4>');

     }
    res.redirect('/user');
});

module.exports = routAuth;