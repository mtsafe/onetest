const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/user_db');
const { forwardAuthenticated } = require('../controllers/auth');
const { displayLoginForm } = require('../controllers/user.controller.js');

// Restore the mount point into the url
router.use('/', (req, res, next) => {
  req.baseUrl = '/';
  req.url = req.originalUrl;
  // whereAmI("New Location?", req);
  next()
});

/*
* The /users API returning HTML:
* The Requests are verbs; the Routes are nouns.
* REQUEST ROUTE
* -- Private Requests for Forms --
* 1 GET     /users/1taat_login_form   Display the form to login
* 2 GET     /users/1taat_login_register  Display the form to register a user
* -- Private Action Requests --
* 3 POST    /users/register     Add a new user
* 4 POST    /users/login     Authenticate a user
* 5 GET     /users/logout    Authenticate a user
*/

// Login Page
// router.get('/users/1taat_login_form', forwardAuthenticated, (req, res) => {
//   console.log('1. GET to '+req.url);
//   res.render('su_login');
// });
router.get('/users/1taat_login_form', displayLoginForm);

// Register Page
router.get('/users/1taat_login_register', forwardAuthenticated, (req, res) => {
  console.log('2. GET to '+req.url);
  res.render('su_register');
});

// Register
router.post('/users/register', (req, res) => {
  console.log('3. POST to '+req.url);
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('su_register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('su_register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/1taat_login_form');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/users/login', (req, res, next) => {
  console.log('4. POST to '+req.url);
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/users/1taat_login_form',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/users/logout', (req, res) => {
  console.log('5. GET to '+req.url);
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/1taat_login_form');
});

module.exports = router;
