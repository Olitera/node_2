const fs = require('fs');

let articles = [];

function loadArticles(cb) {
  fs.readFile('articles.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    }

    articles = data ? JSON.parse(data) : [];
    console.log('\x1b[35m%s\x1b[0m', 'Articles with comments loaded');
    cb(null, articles);
  });
}

function getArticles() {
  return articles;
}

function saveArticles() {
  fs.writeFile('articles.json', JSON.stringify(articles, null, 2), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function getNewArticleId() {
  return String((+articles.toSorted((a, b) => {
    return +b.id - +a.id;
  })[0]?.id || 0) + 1);
}

function createArticle(article) {
  const newArticle = {
    id: getNewArticleId(),
    date: Date.now(),
    ...article
  };
  articles.push(newArticle);

  return newArticle;
}

function getArticle(id) {
  return articles.find((item) => item.id === id);
}

function updateArticle(id, requestBody) {
  let article = getArticle(id);

  if (!article) {
    return null;
  }

  article = {
    ...article,
    ...requestBody
  };

  articles = articles.map((item) => {
    if (item.id === id) {
      return article;
    }

    return item;
  })

  return article;
}

module.exports = { loadArticles, getArticles, saveArticles, createArticle, updateArticle };
