'use strict';
var express = require('express');
var routInd = express.Router();

const Post = require('../models/blogschema.js');

/* GET mainpage. */
routInd.get('/', async function (req, res) {

    const blogs = await Post.find();
   
    res.render('mainpage.hbs', {
        title: 'WebBlog',
        blogs,
      })// рендерим страницу mainpage
});

module.exports = routInd;
