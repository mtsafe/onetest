const {
  restoreMountPoint,
  isGoodObjectId,
  checkAuthenticationToGetBlogForm,
  checkAuthenticationToRequestPrivateAction,
} = require('../controllers/auth')
const dwt2pug = require('../services/dwt2pug.service')
let Blog = require('../models/blog_db')

// 1 Provide the listing of all blogs
function displayBlogsList(req, res, next) {
  console.log('1. GET to ' + req.url)
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err)
      return
    }
    if (req.isAuthenticated()) {
      res.render('su_list_blog', {
        page_title: 'List of Blogs',
        blogs: blogs,
      })
      return
    }
    res.render('list_blog', {
      page_title: 'List of Blogs',
      blogs: blogs,
    })
  })
}

// 2 Provide a single blog document
function displayABlog(req, res, next) {
  console.log('2. GET to ' + req.url)
  let ID = req.params.id.substring(1)
  if (!isGoodObjectId(ID, req, res)) return
  Blog.findById(ID, (err, blog) => {
    if (err) {
      console.log(err)
      return
    }
    res.render('view_blog', {
      page_title: 'Viewing a Blog',
      blog: blog,
    })
  })
}

// 3 Add a new blog document
function addABlog(req, res, next) {
  console.log(`3. POST to ${req.url}; FormData:` + JSON.stringify(req.body))
  checkAuthenticationToRequestPrivateAction(req, res)
  let blog = new Blog()
  blog.title = req.body.title
  blog.author = req.body.author
  blog.body = req.body.body

  blog.save((err) => {
    if (err) {
      console.log(err)
      return
    }
    res.redirect('/blogs')
  })
}

// 4 Update a single blog document
function updateABlog(req, res, next) {
  console.log(`4. PUT to ${req.url}; FormData:` + JSON.stringify(req.body))
  let ID = req.params.id.substring(1)
  checkAuthenticationToRequestPrivateAction(req, res)
  let blog = {}
  blog.title = req.body.title
  blog.author = req.body.author
  blog.body = req.body.body

  let query = { _id: ID }

  Blog.updateOne(query, blog, (err) => {
    if (err) {
      console.log(err)
      return
    }
    res.redirect('/blogs')
  })
}

// 5 Delete a single blog document
function deleteABlog(req, res, next) {
  console.log(`5. DELETE to ${req.url}; FormData:` + JSON.stringify(req.body))
  let ID = req.params.id.substring(1)
  checkAuthenticationToRequestPrivateAction(req, res)
  let blog = {}
  blog.title = req.body.title
  blog.author = req.body.author
  blog.body = req.body.body

  let query = { _id: ID }

  Blog.deleteOne(query, blog, (err) => {
    if (err) {
      console.log(err)
      return
    }
    res.redirect('/blogs')
  })
}

// 6 Display the form to add a new blog
function displayAddABlogForm(req, res, next) {
  console.log('7. GET to ' + req.url)
  checkAuthenticationToGetBlogForm(req, res)
  dwt2pug('./Templates/main.dwt', './views/main.pug')
  res.render('su_add_blog', {
    page_title: 'Adding A Blog Article',
  })
}

// 7 Display the form to update a blog
function displayUpdateABlogForm(req, res, next) {
  console.log('8. GET to ' + req.url)
  checkAuthenticationToGetBlogForm(req, res)
  let ID = req.params.id.substring(1)
  if (!isGoodObjectId(ID, req, res)) return
  Blog.findById(ID, (err, blog) => {
    if (err) {
      console.log(err)
      return
    }
    res.render('su_edit_blog', {
      page_title: 'Editing a Blog Article',
      blog: blog,
    })
  })
}

// 8 Display the form to delete a blog
function displayDeleteABlogForm(req, res, next) {
  console.log('9. GET to ' + req.url)
  checkAuthenticationToGetBlogForm(req, res)
  let ID = req.params.id.substring(1)
  if (!isGoodObjectId(ID, req, res)) return
  Blog.findById(ID, (err, blog) => {
    if (err) {
      console.log(err)
      return
    }
    res.render('su_delete_blog', {
      page_title: 'Deleting a Blog Article',
      blog: blog,
    })
  })
}

module.exports = {
  displayBlogsList,
  displayABlog,
  addABlog,
  updateABlog,
  deleteABlog,
  displayAddABlogForm,
  displayUpdateABlogForm,
  displayDeleteABlogForm,
  // Passed from controllers/auth.js
  restoreMountPoint,
}
