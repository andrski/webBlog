'use strict';
var express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

var routInd = require('./routes/index.js');
var routPost = require('./routes/post.js');
const routAuth = require('./routes/auth.js');

var app = express();

const port = process.env.PORT || 3000;

const uri ='insert your MongoDB atkas URI!!!'

const hbs = exphbs.create({
    defaultLayout: 'index',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),  //to not have err: with parent prototype
});

// view engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

app.set('view options', { layout: 'layout/index' });


//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); // build-in function express, urlencoded!!!! for read body(browser)
app.use(express.static(path.join(__dirname, '/public/stylesheets'))); // for add CSSengine

app.use(passport.initialize());
require('./midlleware/passport')(passport); // инициализируем функцию из passport.js и сразу вызываем ее передавая арг

app.use( routInd);
app.use(routPost);
app.use(routAuth);


async function start() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        app.listen(port, () => { console.log('server has been started on port ' + port) });
    }
    catch (err) {console.log(err)}
}

start();
// need ctreate form and routing foe create contentpost!!!