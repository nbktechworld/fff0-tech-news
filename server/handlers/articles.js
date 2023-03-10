const fs = require('fs');
const path = require('path');
const db = require('../models');
const filterFields = require('../utilities/filterFields');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const ImageService = require('../services/image-service');

const maximumImageCount = 6;

const permittedFields = [
  'slug',
  'title',
  'body',
  'thumbnailUrl',
  'excerpt',
];

async function createArticleImage(req, res) {
  const { articleId } = req.params;
  if (isNaN(articleId)) {
    if (req.file) {
      fs.promises.rm(req.file.path);
    }
    return res.status(404).send({ error: 'Not Found' });
  }

  const article = await db.Article.findOne({
    where: {
      id: articleId,
    }
  });
  if (!article) {
    if (req.file) {
      fs.promises.rm(req.file.path);
    }
    return res.status(404).send({ error: 'Not Found' });
  }

  const articleImageCount = await article.countImages();
  if (articleImageCount >= maximumImageCount) {
    if (req.file) {
      fs.promises.rm(req.file.path);
    }
    return res.status(422).send({ error: `You can only upload a maximum of ${maximumImageCount} images for an article.` });
  }

  // todo: error handling as exercise
  // todo: file validation left as exercise as well
  const imageService = new ImageService();
  await imageService.send(req.file);
  fs.promises.rm(req.file.path);

  // todo: error handling as exercise
  const image = await article.createImage({
    filename: req.file.filename,
    mimetype: req.file.mimetype,
    originalFilename: req.file.originalname,
    size: req.file.size,
  });

  return res.send(image.toJSON());
}

async function destroyArticleImage(req, res) {
  const { articleId, imageId } = req.params;
  if (isNaN(articleId) || isNaN(imageId)) {
    return res.status(404).send({ error: 'Not Found' });
  }
  const articleImage = await db.ArticleImage.findOne({
    where: {
      articleId: articleId,
      imageId: imageId
    },
    include: [
      {
        model: db.Image,
        as: 'image'
      }
    ]
  });
  if (!articleImage) {
    return res.status(404).send({ error: 'Not Found' });
  }
  const { image } = articleImage;
  await articleImage.destroy();

  const imageService = new ImageService();
  const imageKey = imageService.getKeyForFile(image);
  (async () => {
    await imageService.remove(imageKey);
    await image.destroy();
  })();

  return res.status(204).send();
}

async function getArticles (req, res, next) {
  // ?page=1 (implicit default)
  // offset: 0
  //
  // ?page=2
  // offset: pageSize * (page - 1)
  const page = parseInt(req.query.page, 10) || 1;

  const pageSize = 3; // todo: make it 10
  const result = await db.Article.findAndCountAll({
    limit: pageSize,
    offset: pageSize * (page - 1),
    order: ['id']
  });
  const articles = result.rows;
  const totalPages = Math.ceil(result.count / pageSize);

  if (result.count > 0 && page > totalPages) {
    return res.status(422).send({ error: 'Unprocessable Entity' });
  }

  res.send({
    meta: {
      page,
      pageSize,
      totalPages,
    },
    items: articles
  });
}

async function getArticle (req, res) {
  const article = await db.Article.findOne({
    where: {
      slug: req.params.articleSlug
    },
  });

  if (!article) {
    return res.status(404).send({ error: 'Not Found' });
  }
  res.send(article);
}

async function getArticleImages(req, res) {
  const article = await db.Article.findOne({
    where: {
      id: req.params.articleId
    },
  });

  if (!article) {
    return res.status(404).send({ error: 'Not Found' });
  }

  const images = await article.getImages({ joinTableAttributes: [] });

  res.send(images);
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

async function updateArticleThumbnailImage(req, res) {
  // Update our database with metadata
  const article = await db.Article.findOne({
    where: {
      slug: req.params.articleSlug
    }
  });

  const imageService = new ImageService();
  // Validate the file
  // For now: If bad, delete the file from uploads (add validations, etc to your liking here)
  if (!article || !req.file || !imageService.isValid(req.file)) {
    if (req.file) {
      const oldPath = path.join(__dirname, '..', 'uploads', req.file.filename);
      // Remove the file that was received
      fs.promises.rm(oldPath);
    }
    return res.status(422).send({ error: 'Unprocessable Entity' });
  }

  // Store the file (right now we just move to public/ directory)
  const oldPath = path.join(__dirname, '..', 'uploads', req.file.filename);

  // left as exercise: handle errors

  let thumbnailUrl;
  try {
    await imageService.send(req.file);
    thumbnailUrl = imageService.getUrlForFile(req.file);

    // exercise: handle errors (try-catch)
    fs.promises.rm(oldPath);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }

  if (article.thumbnailUrl) {
    const thumbnailKey = imageService.getKeyForUrl(article.thumbnailUrl);
    await imageService.remove(thumbnailKey);
  }
  await article.update({
    thumbnailUrl
  });

  res.send({
    thumbnailUrl
  });
}

module.exports = {
  createArticleImage,
  destroyArticleImage,
  getArticles,
  getArticle,
  getArticleImages,
  createArticle,
  updateArticle,
  updateArticleThumbnailImage,
};
