const db = require('../models');
const filterFields = require('../utilities/filterFields');

const permittedFields = ['slug', 'title', 'body'];

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
  const newArticle = filterFields(req.body, permittedFields);

  const existingArticle = await db.Article.findOne({
    where: {
      slug: newArticle.slug
    }
  });

  if (existingArticle) {
    return res.status(422).send({ error: 'Article slug already exists' });
  }

  let article
  try {
    article = await db.Article.create(newArticle);
  }
  catch (error) {
    return res.status(422).send({ error: 'Unprocessable Entity' });
  }

  res.send(article);
}

async function updateArticle(req, res) {
  const existingArticle = await db.Article.findOne({
    where: {
      slug: req.params.articleSlug
    }
  });

  if (!existingArticle) {
    return res.status(404).send({ error: 'Not Found' });
  }

  const modifiedArticle = filterFields(req.body, permittedFields);
  let updatedArticle;
  try {
    updatedArticle = await existingArticle.update(modifiedArticle);
  }
  catch (error) {
    return res.status(422).send({ error: 'Unprocessable Entity' });
  }
  res.send(updatedArticle);
}

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
};
