const fs = require('fs');

let articles = [];

function loadArticles(cb) {
  fs.readFile('articles.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }

    articles = JSON.parse(data);
    console.log('\x1b[35m%s\x1b[0m', 'Articles with comments loaded');
    cb(null, articles);
  });
}

function getArticles() {
  return articles;
}

module.exports = { loadArticles, getArticles };
