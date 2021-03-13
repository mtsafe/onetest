const dwt2pug = require('./dwt2pug.js');

const express = require('express');
const path = require('path');

const app = express();
const EXPRESS_PORT = 3000;

app.use('/', express.static('public'));

// Load view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

// View the Blog List
app.get('/blog/list', (req, res) => {
  let articles = [
    {
      id: 1,
      title: 'Article One',
      author: 'Brad T',
      body: 'This is the article one body.'
    },
    {
      id: 2,
      title: 'Article Two',
      author: 'Brad T',
      body: 'This is the article two body.'
    },
    {
      id: 3,
      title: 'Article Three',
      author: 'Brad T',
      body: 'This is the article three body.'
    },
  ]
  res.render('index', {
    title: '1 Test - Blog Articles',
    articles: articles
  });
});

// Add a Blog Article
app.get('/blog/add', (req, res) => {
  dwt2pug('./Templates/main.dwt', './views/main.pug');
  res.render('add_article', {
    title: '1 Test - Add Blog Article'
  });
});

// Lastly, 404
app.use((req, res) => {
//  res.status(404).render('error/404page.html');
// res.status(404).render('courses.html');
res.status(404).sendFile(path.join(__dirname+'/public/error/404page.html'));
});

// Start Express Listener for page requests
app.listen(EXPRESS_PORT, () => {
  console.log(`Server started on port ${EXPRESS_PORT}...`)
});