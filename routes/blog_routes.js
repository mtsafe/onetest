const express = require('express');
const router = express.Router();
const path = require('path');
const dwt2pug = require('../services/dwt2pug.service');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

/*
function whereAmI(calling, {url, originalUrl, baseUrl, path}) {
  console.dir(calling);
  console.dir("req.url = "+url); // '/new?sort=desc'
  console.dir("req.originalUrl = "+originalUrl); // '/admin/new?sort=desc'
  console.dir("req.baseUrl = "+baseUrl); // '/admin'
  console.dir("req.path = "+path); // '/new'
}
*/

// Restore the mount point into the url
router.use('/', (req, res, next) => {
  req.baseUrl = '/';
  req.url = req.originalUrl;
  // whereAmI("New Location?", req);
  next()
});

// Bring in DB Models
let Blog = require('../models/blog_db');
// const { config } = require('bluebird');

/*
* The /blogs API returning HTML:
* The Requests are verbs; the Routes are nouns.
* REQUEST ROUTE
* -- Public Requests or Private Requests for Forms --
* 1 GET     /blogs        Provide the listing of all blogs
* -- Public Requests --
* 2 GET     /blogs/api:id    Provide a single blog document
* -- Private Action Requests --
* 3 POST    /blogs        Add a new blog document
* 4 PUT     /blogs/api:id    Update a single blog document
* 5 DELETE  /blogs/api:id    Delete a single blog document
* -- Private Requests for Forms --
* 6 GET     /blogs/1taat_login_form   Display the form to login
* 7 GET     /blogs/1taat_add_form     Display the form to add a new blog
* 8 GET     /blogs/1taat_edit_form:id    Display the form to update a blog
* 9 GET     /blogs/1taat_delete_form:id  Display the form to delete a blog
*/

// 1 Provide the listing of all blogs
router.get('/blogs', (req, res) => {
  console.log('1. GET to '+req.url);
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

// 2 Provide a single blog document
router.get('/blogs/api:id', (req, res) => {
  let ID = req.params.id.substring(1);
  console.log('2. GET to '+req.url);
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

// 3 Add a new blog document
router.post('/blogs', (req, res) => {
  console.log(`3. POST to ${req.url}; FormData:`+JSON.stringify(req.body));
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
    res.redirect('/blogs');
  //    res.json(req.body);
  //  res.end();
  });
});

// 4 Update a single blog document
router.put('/blogs/api:id', (req, res) => {
  let ID = req.params.id.substring(1);
  console.log(`4. PUT to ${req.url}; FormData:`+JSON.stringify(req.body));
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
    res.redirect('/blogs');
  //    res.json(req.body);
  //  res.end();
  });
});

// 5 Delete a single blog document
router.delete('/blogs/api:id', (req, res) => {
  let ID = req.params.id.substring(1);
  console.log(`5. DELETE to ${req.url}; FormData:`+JSON.stringify(req.body));
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
    res.redirect('/blogs');
  //    res.json(req.body);
  //  res.end();
  });
});

// 6 Display the form to login
router.get('/blogs/1taat_login_form', (req,res) => {
  console.log('6. GET to '+req.url);
  res.render('su_login');
});

// 7 Display the form to add a new blog
router.get('/blogs/1taat_add_form', (req, res) => {
  console.log('7. GET to '+req.url);
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

// 8 Display the form to update a blog
router.get('/blogs/1taat_edit_form:id', (req, res) => {
  console.log('8. GET to '+req.url);
  let ID = req.params.id.substring(1);
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

// 9 Display the form to delete a blog
router.get('/blogs/1taat_delete_form:id', (req, res) => {
  console.log('9. GET to '+req.url);
  let ID = req.params.id.substring(1);
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

module.exports = router;