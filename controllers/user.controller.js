const { restoreMountPoint } = require('../controllers/auth')
const User = require('../models/user_db')

function displayLoginForm(req, res, next) {
  console.log('1. GET to ' + req.url)
  if (req.isAuthenticated()) {
    res.redirect('/blogs')
  } else {
    res.render('su_login')
  }
}

function displayRegistrationForm(req, res, next) {
  console.log('2. GET to ' + req.url)
  if (req.isAuthenticated()) {
    res.render('su_register')
  } else {
    req.flash(
      'error_msg',
      'You must be a logged in user to register another user',
    )
    res.redirect('/users/1taat_login_form')
  }
}

function registerThisUser(req, res, next) {
  console.log('3. POST to ' + req.url)
  const { name, email, password, password2 } = req.body
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' })
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' })
  }
  if (errors.length > 0) {
    res.render('su_register', {
      errors,
      name,
      email,
      password,
      password2,
    })
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' })
        res.render('su_register', {
          errors,
          name,
          email,
          password,
          password2,
        })
      } else {
        const newUser = new User({
          name,
          email,
          password,
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in',
                )
                res.redirect('/users/1taat_login_form')
              })
              .catch((err) => console.log(err))
          })
        })
      }
    })
  }
}

function startUserSession(req, res, next) {
  console.log('4. POST to ' + req.url)
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/users/1taat_login_form',
    failureFlash: true,
  })(req, res, next)
}

function endUserSession(req, res, next) {
  console.log('5. GET to ' + req.url)
  req.logout()
  req.flash('success_msg', 'You are logged out')
  res.redirect('/users/1taat_login_form')
}

module.exports = {
  displayLoginForm,
  displayRegistrationForm,
  registerThisUser,
  startUserSession,
  endUserSession,
  restoreMountPoint,
  User,
}
