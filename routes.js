const express = require('express');
const router = express.Router();
const dwt2pug = require('./dwt2pug');

// Landing page
router.get('/1taat_login', (req,res) => {
  console.log('GET to /blogs/1taat_login');
  res.render('login');
});

// Dashboard
router.get('/dashboard', (req,res) => {
  console.log('GET to /blogs/dashboard');
  res.render('dashboard');
});

// Bring in DB Models
let Blog = require('./models/blog');
// const { config } = require('bluebird');

// View the Blog List
router.get('/list', (req, res) => {
  console.log('GET to /blogs/list');
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

// View a single Blog post
router.get('/:id', (req, res) => {
  console.log('GET to /blogs/:id');
  let ID = req.params.id;
  Blog.findById(ID, (err, blog) => {
    if (!ID.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`"${ID}" invalid ObjectId, cannot findById`);
    }
    if (err) {
      console.log(err);
      return;
    }
    // console.log(blog);
    res.render('view_blog', {
      title: 'Blog',
      blog_title: blog.title,
      blog_author: blog.author,
      blog_body: blog.body
    });
  });
});

// Add a Blog Article
router.get('/add', (req, res) => {
  console.log('GET to /blogs/add');
  dwt2pug('./Templates/main.dwt', './views/main.pug');
  res.render('add_blog', {
    title: 'Adding A Blog Article'
  });
});

// Submit POST blog Route
router.post('/add', (req, res) => {
  console.log('POST to /blogs/add; FormData:'+JSON.stringify(req.body));
  let blog = new Blog();
  blog.title = req.body.title;
  blog.author = req.body.author;
  blog.body = req.body.body;

  blog.save(err => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/blogs/list');
  //    res.json(req.body);
  //  res.end();
  });
});

module.exports = router;