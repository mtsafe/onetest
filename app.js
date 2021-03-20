const db = require('./config/db');
const dotenv = require('dotenv');
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
// const bodyParser = require('body-parser')

// Configuring the App
dotenv.config({ path: './config/config.env'});
const app = express();

// NOTICE: Be careful if you change
// the order of app requests!

// Declaring the Public directory for static HTML serving
app.use('/', express.static('public'));

// Load Pug view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

// Method Override allows PUT and DELETE
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}));

// Routes
app.use('/blogs', require('./routes/blog_routes'));

// Lastly, 404
app.use((req, res) => {
  console.log("404: "+path.join(__dirname+'/public/error/404page.html'));
  res.status(404).sendFile(path.join(__dirname+'/public/error/404page.html'));
});

module.exports = app;