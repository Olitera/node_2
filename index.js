const http = require('http');
const fs = require('fs');
const path = require('path');
const helper = require('./helper');
const articleController = require('./controllers/articles-controller');
const sumController = require('./controllers/sum-controller');
const notFoundController = require('./controllers/notFound-controller');
const services = require('./services');


const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
  '/sum': sumController.sum,
  '/articles/readall': articleController.getArticles
};

const server = http.createServer((req, res) => {
  helper.parseBodyJSON(req, (err, payload) => {
    logRequest(req, payload);

    const handler = getHandler(req.url);

    handler(req, res, payload, (err, result) => {
      if (err) {
        res.statusCode = err.code;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(err));

        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    });
  });
});

const logRequest = (req, body) => {
  const logEntry = {
    date: new Date().toISOString(),
    url: req.url,
    body
  };

  const formattedLog = `${JSON.stringify(logEntry, null, 2)}\n\n`;

  fs.appendFile(path.join(__dirname, 'log.txt'), formattedLog, 'utf8', (err) => {
    if (err) {
      console.error('Failed to write to log file:',err);
    }
  });
};

let articles = [];

services.loadArticles(startServer, { articles });

function startServer () {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function getHandler(url) {
  return handlers[url] || notFoundController.notFound;
}




