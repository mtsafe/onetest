const express = require('express');
const path = require('path');

const app = express();
const EXPRESS_PORT = 3000;

app.use('/', express.static('public'));

// Load view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');


// Home Route
app.get('/articles/list', (req, res) => {
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
    title: 'Articles',
    articles: articles
  });
});

// Add Route
app.get('/articles/add', (req, res) => {
  res.render('add_article', {
    title: 'Add Article'
  })
});

app.listen(EXPRESS_PORT, () => {
  console.log(`Server started on port ${EXPRESS_PORT}...`)
});