const {
  displayBlogsList,
  displayABlog,
  addABlog,
  updateABlog,
  deleteABlog,
  displayAddABlogForm,
  displayUpdateABlogForm,
  displayDeleteABlogForm,
} = require('./blog.controller')

let laugh = 'Ha'
test('the best flavor is grapefruit', () => {
  expect(laugh).toBe('Ha')
})
