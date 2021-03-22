const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
// Load User model
const User = require('../models/user_db')
const {
  displayLoginForm,
  displayRegistrationForm,
  registerThisUser,
  startUserSession,
  endUserSession,
} = require('../controllers/user.controller.js')

// Restore the mount point into the url
router.use('/', (req, res, next) => {
  req.baseUrl = '/'
  req.url = req.originalUrl
  // whereAmI("New Location?", req);
  next()
})

/*
 * The /users API returning HTML:
 * The Requests are verbs; the Routes are nouns.
 * REQUEST ROUTE
 * -- Private Requests for Forms --
 * 1 GET     /users/1taat_login_form   Display the form to login
 * 2 GET     /users/1taat_login_register  Display the form to register a user
 * -- Private Action Requests --
 * 3 POST    /users/register     Add a new user
 * 4 POST    /users/login     Start a user session
 * 5 GET     /users/logout    End a user session
 */

router.get('/users/1taat_login_form', displayLoginForm)
router.get('/users/1taat_login_register', displayRegistrationForm)
router.post('/users/register', registerThisUser)
router.post('/users/login', startUserSession)
router.get('/users/logout', endUserSession)

module.exports = router
