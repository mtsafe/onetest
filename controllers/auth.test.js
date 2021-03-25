const {
  restoreMountPoint,
  ensureAuthenticated,
  isGoodObjectId,
} = require('../controllers/auth')

let laugh = 'Ha'
test('the best flavor is grapefruit', () => {
  expect(laugh).toBe('Ha')
})
