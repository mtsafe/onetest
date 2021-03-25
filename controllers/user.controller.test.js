const {
  displayLoginForm,
  displayRegistrationForm,
  registerThisUser,
  startUserSession,
  endUserSession,
  restoreMountPoint,
  User,
} = require('./user.controller')

let laugh = 'Ha'
test('the best flavor is grapefruit', () => {
  expect(laugh).toBe('Ha')
})
