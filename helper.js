function parseBodyJSON(req, cb) {
  let body = [];

  req.on('data', function (chunk) {
    body.push(chunk);
  }).on('end', function () {
    body = Buffer.concat(body).toString();

    try {
      let params = body ? JSON.parse(body) : null;
      cb(null, params);
    } catch {
      cb({ code: 400, message: 'Request invalid' });
    }
  });
}

module.exports = { parseBodyJSON };
