function parseBodyJSON(req, cb) {
  let body = [];

  req.on('data', function (chunk) {
    body.push(chunk);
  }).on('end', function () {
    body = Buffer.concat(body).toString();

    let params = body ? JSON.parse(body) : null;

    cb(null, params);
  });
}

module.exports = { parseBodyJSON };
