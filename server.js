const app = require("./app");
const EXPRESS_PORT = process.env.PORT || 3000;

// Start Express Listener for page requests
app.listen(EXPRESS_PORT, () => {
  console.log(`Server started in ${process.env.NODE_ENV} on port ${EXPRESS_PORT}...`)
});