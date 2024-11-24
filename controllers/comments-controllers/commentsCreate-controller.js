const commentsServices = require('../../services/comments-services');
const articlesServices = require('../../services/articles-services');

function createComment(req, res, payload) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const { articleId } = payload;

    if (!articleId || typeof articleId !== 'string') {
      throw new Error('Request invalid');
    }

    const comment = commentsServices.createComment(payload);
    const article = articlesServices.getArticle(articleId);

    if (!article) {
      res.statusCode = 404;
      res.end(JSON.stringify({ code: 404, message: 'Article with this id not found' }));
    } else {
      res.end(JSON.stringify(comment));
    }
  } catch (err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ code: 400, message: 'Request invalid' }));
  }
  articlesServices.saveArticles();
}

module.exports = { createComment };
