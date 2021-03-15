const express = require('express');
const router = express.Router();
const path = require('path');
const dwt2pug = require('./dwt2pug');

// Landing page
router.get('/1taat_login', (req,res) => {
  console.log('GET to /blogs/1taat_login');
  res.render('su_login');
});

// // Dashboard
// router.get('/dashboard', (req,res) => {
//   console.log('GET to /blogs/dashboard');
//   res.render('dashboard');
// });

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
    let isUserLoggedIn = true;
    if (isUserLoggedIn) {
      res.render('su_list_blog', {
        page_title: 'Blogs',
        blogs: blogs
      });
      return;
    }
    res.render('list_blog', {
      page_title: 'Blogs',
      blogs: blogs
    });
  });
});

// View a single Blog post
router.get('/view:id', (req, res) => {
  let ID = req.params.id.substring(1);
  console.log('GET to /blogs/view:id _id='+ID);
  if (!ID.match(/^[0-9a-fA-F]{24}$/)) {
    console.log(`"${ID}" invalid ObjectId, cannot findById`);
    console.log(`Sending 404: ${path.join(__dirname+"/public/error/404page.html")}`);
    res.status(404).sendFile(path.join(__dirname+'/public/error/404page.html'));
    return;
  }
  Blog.findById(ID, (err, blog) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(blog);
    res.render('view_blog', {
      page_title: 'Blog',
      blog: blog
    });
  });
});

// Delete a single Blog post
router.get('/delete:id', (req, res) => {
  let ID = req.params.id.substring(1);
  console.log('GET to /blogs/delete:id _id='+ID);
  let isUserLoggedIn = true;
  if (!isUserLoggedIn) {
    // post an alert
    console.log('user is not logged in to do delete');
    res.status(401).sendFile(path.join(__dirname+'/public/error/401page.html'));
    return;
  }
  if (!ID.match(/^[0-9a-fA-F]{24}$/)) {
    console.log(`"${ID}" invalid ObjectId, cannot findById`);
    console.log(`Sending 404: ${path.join(__dirname+"/public/error/404page.html")}`);
    res.status(404).sendFile(path.join(__dirname+'/public/error/404page.html'));
    return;
  }
  Blog.findById(ID, (err, blog) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(blog);
    res.render('su_delete_blog', {
      page_title: 'Blog',
      blog: blog
    });
  });
});

// Add a Blog Article
router.get('/add', (req, res) => {
  console.log('GET to /blogs/add');
  let isUserLoggedIn = true;
  if (!isUserLoggedIn) {
    // post an alert
    console.log('user is not logged in to do add');
    res.status(401).sendFile(path.join(__dirname+'/public/error/401page.html'));
    return;
  }
  dwt2pug('./Templates/main.dwt', './views/main.pug');
  res.render('su_add_blog', {
    page_title: 'Adding A Blog Article'
  });
});

// Edit a single Blog post
router.get('/edit:id', (req, res) => {
  let ID = req.params.id.substring(1);
  console.log('GET to /blogs/edit:id');
  let isUserLoggedIn = true;
  if (!isUserLoggedIn) {
    // post an alert
    console.log('user is not logged in to do edit');
    res.status(401).sendFile(path.join(__dirname+'/public/error/401page.html'));
    return;
  }
  Blog.findById(ID, (err, blog) => {
    if (!ID.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`"${ID}" invalid ObjectId, cannot findById`);
    }
    if (err) {
      console.log(err);
      return;
    }
    // console.log(blog);
    res.render('su_edit_blog', {
      page_title: 'Edit Blog',
      blog: blog
    });
  });
});

// Submit POST added blog Route
router.post('/add', (req, res) => {
  console.log('POST to /blogs/add; FormData:'+JSON.stringify(req.body));
  let isUserLoggedIn = true;
  if (!isUserLoggedIn) {
    // post an alert
    console.log('user is not logged in to do add');
    res.status(401).sendFile(path.join(__dirname+'/public/error/401page.html'));
    return;
  }
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

// Submit POST edited blog Route
router.post('/edit:id', (req, res) => {
  let ID = req.params.id.substring(1);
  console.log('POST to /blogs/edit:id; FormData:'+JSON.stringify(req.body));
  let isUserLoggedIn = true;
  if (!isUserLoggedIn) {
    // post an alert
    console.log('user is not logged in to do edit');
    res.status(401).sendFile(path.join(__dirname+'/public/error/401page.html'));
    return;
  }
  let blog = {};
  blog.title = req.body.title;
  blog.author = req.body.author;
  blog.body = req.body.body;

  let query = {_id:ID}

  Blog.updateOne(query, blog, err => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/blogs/list');
  //    res.json(req.body);
  //  res.end();
  });
});

// Submit POST to delete blog Route
router.delete('/delete:id', (req, res) => {
  let ID = req.params.id.substring(1);
  console.log('POST to /blogs/delete:id; FormData:'+JSON.stringify(req.body));
  let isUserLoggedIn = true;
  if (!isUserLoggedIn) {
    // post an alert
    console.log('user is not logged in to do delete');
    res.status(401).sendFile(path.join(__dirname+'/public/error/401page.html'));
    return;
  }
  let blog = {};
  blog.title = req.body.title;
  blog.author = req.body.author;
  blog.body = req.body.body;

  let query = {_id:ID}

  Blog.deleteOne(query, blog, err => {
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