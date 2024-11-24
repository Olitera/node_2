const commentsServices = require('../../services/comments-services');
const articlesServices = require('../../services/articles-services');

function deleteComment(req, res, payload) {
  res.setHeader('Content-Type', 'application/json');

  try {
    const { id } = payload;

    if (!id || typeof id !== 'string') {
      throw new Error('Request invalid');
    }

    const comment = commentsServices.getComment(id);

    if (!comment) {
      res.statusCode = 404;
      res.end(JSON.stringify({ code: 404, message: 'Comment not found' }));
    } else {
      commentsServices.deleteComment(id);
      res.end(JSON.stringify({ code: 200, message: 'OK' }));
    }
  } catch (err) {
    res.statusCode = 400;
    res.end(JSON.stringify({ code: 400, message: 'Request invalid' }));
  }
  articlesServices.saveArticles();
}

module.exports = { deleteComment };
