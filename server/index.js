const express = require('express');
const db = require('./models');

const app = express();

// Define the routes (API endpoints)
app.get('/articles', async (req, res, next) => {
  try {
    res.send(await db.Article.findAll());
  }
  catch (error) {
    next(error);
  }
});

app.get('/articles/:articleSlug', async (req, res, next) => {
  try {
    const article = await db.Article.findOne({
      where: {
        slug: req.params.articleSlug
      }
    });

    if (!article) {
      return res.status(404).send({ error: 'Not Found' });
    }
    res.send(article);
  }
  catch (error) {
    next(error);
  }
});

// Catch 404
app.use((req, res, next) => {
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
