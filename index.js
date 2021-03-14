const dwt2pug = require('./dwt2pug.js');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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

// Initializing the App
const app = express();
const EXPRESS_PORT = 3000;

// Bring in Models
let Blog = require('./models/blog');

// Declaring the Public directory for static HTML serving
app.use('/', express.static('public'));

// Load view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

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
  // let articles = [
  //   {
  //     id: 1,
  //     title: 'Article One',
  //     author: 'Brad T',
  //     body: 'This is the article one body.'
  //   },
  //   {
  //     id: 2,
  //     title: 'Article Two',
  //     author: 'Brad T',
  //     body: 'This is the article two body.'
  //   },
  //   {
  //     id: 3,
  //     title: 'Article Three',
  //     author: 'Brad T',
  //     body: 'This is the article three body.'
  //   },
  // ]
  // res.render('list_blog', {
  //   title: 'Blog Article List',
  //   articles: articles
  // });
});

// Add a Blog Article
app.get('/blog/add', (req, res) => {
  dwt2pug('./Templates/main.dwt', './views/main.pug');
  res.render('add_blog', {
    title: 'Adding A Blog Article'
  });
});

// Lastly, 404
app.use((req, res) => {
//  res.status(404).render('error/404page.html');
// res.status(404).render('courses.html');
res.status(404).sendFile(path.join(__dirname+'/public/error/404page.html'));
});

// Start Express Listener for page requests
app.listen(EXPRESS_PORT, () => {
  console.log(`Server started on port ${EXPRESS_PORT}...`)
});