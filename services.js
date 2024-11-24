const fs = require('fs');

let articles = [];

function loadArticles (cb) {
  fs.readFile('articles.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }

    articles = JSON.parse(data);
    console.log('Articles loaded:', articles);
    cb(null, articles);
  });
}

function getArticles() {
  return articles;
}

module.exports = { loadArticles, getArticles };
