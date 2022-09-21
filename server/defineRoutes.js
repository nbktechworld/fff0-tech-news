const multer = require('multer');
const ArticleHandler = require('./handlers/articles');

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

const processFile = multer({
  dest: 'uploads',
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MiB
  }
});

module.exports = function(app) {
  app.get('/articles', tryCatch(ArticleHandler.getArticles));
  app.get('/articles/:articleSlug', tryCatch(ArticleHandler.getArticle));
  app.post('/articles', tryCatch(ArticleHandler.createArticle));
  app.put('/articles/:articleSlug', tryCatch(ArticleHandler.updateArticle));
  app.post('/articles/:articleSlug/images', processFile.single('articleImage'), tryCatch(ArticleHandler.updateArticleImage));
}
