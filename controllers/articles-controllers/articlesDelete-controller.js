const services = require('../../services/articles-services');

function deleteArticle(req, res, payload) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const { id } = payload;

    if (!id || typeof id !== 'string') {
      throw new Error('Request invalid');
    }

    const article = services.getArticle(id);

    if (!article) {
      res.statusCode = 404;
      res.end(JSON.stringify({ code: 404, message: 'Article not found' }));
    } else {
      services.deleteArticle(id);
      res.end(JSON.stringify({ code: 200, message: 'OK' }));
    }
  } catch (err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ code: 400, message: 'Request invalid' }));
  }
  services.saveArticles();
}

module.exports = { deleteArticle };
