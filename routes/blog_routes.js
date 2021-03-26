const express = require('express')
const router = express.Router()
const path = require('path')
const {
  displayBlogsList,
  displayABlog,
  addABlog,
  updateABlog,
  deleteABlog,
  displayAddABlogForm,
  displayUpdateABlogForm,
  displayDeleteABlogForm,
  restoreMountPoint,
  ensureAuthenticated,
} = require('../controllers/blog.controller.js')

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
 * 6 GET     /blogs/1taat_add_form     Display the form to add a new blog
 * 7 GET     /blogs/1taat_edit_form:id    Display the form to update a blog
 * 8 GET     /blogs/1taat_delete_form:id  Display the form to delete a blog
 *
 * Unauthenticated GET for a form will return 404 Not Found.
 * Unauthenticated Private Action Requests will return 401 Unauthorized.
 */

// Restore the mount point into the url
router.use('/', restoreMountPoint)

router.get('/blogs', displayBlogsList)
router.get('/blogs/api:id', displayABlog)
router.post('/blogs', addABlog)
router.put('/blogs/api:id', updateABlog)
router.delete('/blogs/api:id', deleteABlog)
router.get('/blogs/1taat_add_form', displayAddABlogForm)
router.get('/blogs/1taat_edit_form:id', displayUpdateABlogForm)
router.get('/blogs/1taat_delete_form:id', displayDeleteABlogForm)

module.exports = router
