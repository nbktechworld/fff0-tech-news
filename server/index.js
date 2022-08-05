const express = require('express');
const articles = require('./articles');

const app = express();

// Define the routes (API endpoints)
app.get('/articles', (req, res) => {
  res.send(articles);
});

app.get('/articles/:articleSlug', (req, res) => {
  const article = articles.find((article) => {
    return article.slug === req.params.articleSlug;
  });

  if (!article) {
    return res.status(404).send({ error: 'Not Found' });
  }
  res.send(article);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
