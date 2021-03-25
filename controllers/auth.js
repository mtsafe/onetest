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

function isGoodObjectId(objectId, req, res) {
  if (objectId.match(/^[0-9a-fA-F]{24}$/)) return true
  console.log(`"${objectId}" invalid ObjectId, cannot findById`)
  console.log(`Sending 404: ${__dirname + '/../public/error/404page.html'}`)
  res.status(404).redirect('/error/404page.html')
  return false
}

module.exports = {
  restoreMountPoint,
  ensureAuthenticated,
  //  forwardAuthenticated,
  isGoodObjectId,
}
