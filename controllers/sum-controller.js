function sum(req, res, payload, cb) {
  try {
    const { a, b } = payload;

    if (!a || !b || typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Request invalid');
    }

    const result = { c: a + b };

    cb(null, result);
  } catch (err) {
    cb({ code: 400, message: 'Request invalid' });
  }
}

module.exports = { sum };
