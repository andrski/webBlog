'use strict';
var express = require('express');
var routInd = express.Router();
const passport = require('passport');

const Post = require('../models/blogschema.js');

/* GET mainpage. */
routInd.get('/', passport.authenticate('jwt', { session: false }), async function (req, res) {

    const blogs = await Post.find();
   
    res.render('mainpage.hbs', {
        title: 'WebBlog',
        blogs,
      })// рендерим страницу mainpage
});

module.exports = routInd;
