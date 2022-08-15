const cors = require('cors');
const express = require('express');
const db = require('./models');
const ArticleHandler = require('./handlers/articles');

const app = express();

function tryCatch(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    }
    catch (error) {
      next(error);
    }
  };
}

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json())

// Define the routes (API endpoints)
app.get('/articles', tryCatch(ArticleHandler.getArticles));
app.get('/articles/:articleSlug', tryCatch(ArticleHandler.getArticle));
app.post('/articles', tryCatch(ArticleHandler.createArticle));
app.put('/articles/:articleSlug', tryCatch(ArticleHandler.updateArticle));

// Catch 404
app.use((req, res, next) => {
  console.log('im in the catch 404!!')
  res.status(404).send({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  // usually todo here: Report the error to some error service for monitoring
  console.error(err);

  res.status(500).send({ error: 'Internal Server Error' });
})

const port = 3001;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
