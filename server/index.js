const express = require('express');
const db = require('./models');

const app = express();

// Define the routes (API endpoints)
app.get('/articles', async (req, res) => {
  res.send(await db.Article.findAll());
});

app.get('/articles/:articleSlug', async (req, res) => {
  const article = await db.Article.findOne({
    where: {
      slug: req.params.articleSlug
    }
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
