const cors = require('cors');
const express = require('express');
const db = require('./models');

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

async function getArticles (req, res, next) {
  res.send(await db.Article.findAll());
}

async function getArticle (req, res) {
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

async function createArticle(req, res) {
  // access the fields sent by the client & build an article with those values; save that and send back the created article, including an id in the response
  // (typically we permit only specific values, to prevent malicious actors from tampering with our system)
  // (also, we should validate the values)
  

  res.send(req.body)
}

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json())

// Define the routes (API endpoints)
app.get('/articles', tryCatch(getArticles));
app.get('/articles/:articleSlug', tryCatch(getArticle));
app.post('/articles', tryCatch(createArticle))

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
