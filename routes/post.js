'use strict'
var express = require('express');
var routPost = express.Router();

const Post = require('../models/blogschema.js');

/* GET  listing. */
routPost.get('/blog', function (req, res) {
   // res.send('respond with a resource');
    res.render('post.hbs', {
        title: 'CreateBlog',
       })// рендерим страницу post
});

// post request
routPost.post('/blog', async (req, res) => {
    const blog = new Post({
        titleText: req.body.titleText,   //req.body.titleText value from browser
        content: req.body.content, //req.body.content value from browser(number)
        published: req.body.datePubl,
    });

    await blog.save(); // await, because return promise
    res.redirect('/');
});

//post delete
routPost.post('/deleteone', async (req, res) => {

    await Post.deleteOne();
    
    res.redirect('/');
});

routPost.post('/deletemany', async (req, res) => {

    await Post.deleteMany();
   
    res.redirect('/');
});


module.exports = routPost;
