const controllersAuth = require('../controllers/auth');

module.exports = {
  displayLoginForm: function(req, res, next) {
    console.log('1. GET to '+req.url);
    if (req.isAuthenticated()) {
      res.redirect('/blogs');
    } else {
      res.render('su_login');
    }
  }
};
/*
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/1taat_login_form');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/blogs');
  }
};
*/