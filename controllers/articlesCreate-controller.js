const services = require('../services');

function createArticle(req, res, payload) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (!payload || !payload.title || !payload.text || !payload.author || typeof payload.title !== 'string' || typeof payload.text !== 'string' || typeof payload.author !== 'string') {
      throw new Error('Request invalid');
    }

    const article = services.createArticle(payload);

    res.end(JSON.stringify(article));
  } catch (err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ code: 400, message: 'Request invalid' }));
  }
  services.saveArticles();
}

module.exports = { createArticle };
