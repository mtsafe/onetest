function whereAmI(calling, { url, originalUrl, baseUrl, path }) {
  console.dir(calling)
  console.dir('req.url = ' + url) // '/new?sort=desc'
  console.dir('req.originalUrl = ' + originalUrl) // '/admin/new?sort=desc'
  console.dir('req.baseUrl = ' + baseUrl) // '/admin'
  console.dir('req.path = ' + path) // '/new'
}

function restoreMountPoint(req, res, next) {
  req.baseUrl = '/'
  req.url = req.originalUrl
  // whereAmI("New Location?", req);
  next()
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error_msg', 'Please log in to view that resource')
  res.redirect('/users/1taat_login_form')
}

// function forwardAuthenticated(req, res, next) {
//   if (!req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/blogs')
// }

module.exports = {
  restoreMountPoint,
  ensureAuthenticated,
  //  forwardAuthenticated,
}
