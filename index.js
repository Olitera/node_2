const http = require('http');
const helper = require('./helper');
const articleReadallController = require('./controllers/articles-controllers/articlesReadall-controller');
const articleReadController = require('./controllers/articles-controllers/articlesRead-controller');
const articleCreateController = require('./controllers/articles-controllers/articlesCreate-controller');
const articleUpdateController = require('./controllers/articles-controllers/articlesUpdate-controller');
const articleDeleteController = require('./controllers/articles-controllers/articlesDelete-controller');
const commentCreateController = require('./controllers/comments-controllers/commentsCreate-controller');
const sumController = require('./controllers/sum-controller');
const notFoundController = require('./controllers/notFound-controller');
const articlesServices = require('./services/articles-services');
const logger = require('./logger');


const hostname = '127.0.0.1';
const port = 3000;

const handlers = {
  '/sum': sumController.sum,
  '/articles/readall': articleReadallController.getArticles,
  '/articles/read': articleReadController.getArticleById,
  '/articles/create': articleCreateController.createArticle,
  '/articles/update': articleUpdateController.updateArticle,
  '/articles/delete': articleDeleteController.deleteArticle,
  '/comments/create': commentCreateController.createComment
};

const server = http.createServer((req, res) => {
  helper.parseBodyJSON(req, (err, payload) => {
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
    logger.logRequest(req, payload);
  });
});

let articles = [];

articlesServices.loadArticles(startServer, { articles });

function startServer() {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${ hostname }:${ port }/`);
  });
}

function getHandler(url) {
  return handlers[url] || notFoundController.notFound;
}




