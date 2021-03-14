const dwt2pug = require('./dwt2pug.js');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
// const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/onetest');
let db = mongoose.connection;

// Check DB connection
db.once('open', function(){
  console.log('App connected to MongoDB');
});

// Check for DB errors
db.on('error', function(){
  console.log(err);
})

// Configuring the App
dotenv.config({ path: './config/config.env'});
const app = express();
const EXPRESS_PORT = process.env.PORT || 3000;

// Bring in Models
let Blog = require('./models/blog');
// const { config } = require('bluebird');

// Declaring the Public directory for static HTML serving
app.use('/', express.static('public'));

// Load view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(express.urlencoded());
// parse application/json
app.use(express.json());

// View the Blog List
app.get('/blog/list', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render('list_blog', {
      title: 'Blogs',
      blogs: blogs
    });
  });
});

// Add a Blog Article
app.get('/blog/add', (req, res) => {
  dwt2pug('./Templates/main.dwt', './views/main.pug');
  res.render('add_blog', {
    title: 'Adding A Blog Article'
  });
});

// Add Submit POST Route
app.post('/blog/add', (req, res) => {
//  let blog = new Blog();
//  blog.title = req.body.title;
  console.log(req.body.title);
  res.end();
});


// Lastly, 404
app.use((req, res) => {
//  res.status(404).render('error/404page.html');
// res.status(404).render('courses.html');
res.status(404).sendFile(path.join(__dirname+'/public/error/404page.html'));
});

// Start Express Listener for page requests
app.listen(EXPRESS_PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} on port ${EXPRESS_PORT}...`)
});