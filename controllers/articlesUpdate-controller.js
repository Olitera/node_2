const services = require('../services');

function updateArticle(req, res, params) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const { id } = params;

    if (!id || typeof id !== 'string') {
      throw new Error('Request invalid');
    }

    const article = services.updateArticle(id, params);

    if (!article) {
      res.statusCode = 404;
      res.end(JSON.stringify({ code: 404, message: 'Article not found' }));
    } else {
      res.end(JSON.stringify(article));
    }
  } catch (err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ code: 400, message: 'Request invalid' }));
  }
  services.saveArticles();
}

module.exports = { updateArticle };
