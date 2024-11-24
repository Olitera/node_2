const services = require('../services');

function getArticles(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const articles = services.getArticles();

  res.end(JSON.stringify(articles));
}

module.exports = { getArticles };
