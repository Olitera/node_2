const fs = require('fs');
const path = require('path');

const logRequest = (req, body) => {
  const date = `Date and Time: ${ new Date().toISOString().replace('T', ' ').slice(0, -5) };`;
  const url = `Requested URL: ${ req.url };`;
  const reqBody = `Body of the Request: ${ JSON.stringify(body) }`;
  const formattedLog = `${ date }\n${ url }\n${ reqBody }\n\n`;

  fs.appendFile(path.join(__dirname, 'log.txt'), formattedLog, 'utf8', (err) => {
    if (err) {
      console.error('Failed to write to log file:', err);
    }
  });
};

module.exports = { logRequest };
