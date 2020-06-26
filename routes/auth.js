'use strict'
const express = require('express');
const bcrypt = require('bcryptjs');// pacage for crypt password!!!
const routAuth = express.Router();

const User = require('../models/usersh.js');

routAuth.get('/user', function (req, res) {
    // res.send('respond with a resource');
    res.render('authent.hbs', {
        title: 'logIn',
    })// рендерим страницу authen
});

routAuth.post('/createuser', async (req, res) => {

    const condidate = await User.findOne({ email: req.body.email });

    if (condidate) {
        //user is , throw err
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

routAuth.post('/createuser', async (req, res) => {

    const condidate = await User.findOne({ email: req.body.email });

    if (condidate) {
        
    } else {
        

        try {
            
        }
        catch (err) {
            // throw err

        }
    }
    res.redirect('/user');
});

module.exports = routAuth;