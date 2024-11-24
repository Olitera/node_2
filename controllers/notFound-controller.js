function notFound(req, res, payload, cb) {
  cb({ code: 404, message: 'Not Found' });
}

module.exports = { notFound };
