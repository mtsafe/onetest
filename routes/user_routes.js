const express = require('express')
const router = express.Router()
const {
  displayLoginForm,
  displayRegistrationForm,
  registerThisUser,
  startUserSession,
  endUserSession,
  restoreMountPoint,
} = require('../controllers/user.controller.js')

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

// Restore the mount point into the url
router.use('/', restoreMountPoint)

router.get('/users/1taat_login_form', displayLoginForm)
router.get('/users/1taat_login_register', displayRegistrationForm)
router.post('/users/register', registerThisUser)
router.post('/users/login', startUserSession)
router.get('/users/logout', endUserSession)

module.exports = router
