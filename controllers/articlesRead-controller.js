const services = require('../services');

function getArticleById(req, res, params) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const { id } = params;

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid id');
    }

    const articles = services.getArticles();
    const article = articles.find((item) => item.id === id);

    if (!article) {
      res.statusCode = 404;
      res.end(JSON.stringify({ code: 404, message: 'Article not found' }));
    }

    res.end(JSON.stringify(article));
  } catch (err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ code: 400, message: 'Request invalid' }));
  }
}

module.exports = { getArticleById };
