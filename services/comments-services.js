const articlesServices = require('./articles-services');

function getComments() {
  return articlesServices.getArticles()
    .filter((item) => item.comments?.length)
    .reduce((acc, item) => [...acc, ...item.comments], []);
}

function createComment( commentData) {
  const articles = articlesServices.getArticles();
  const comment = {
    id: getNewCommentId(),
    articleId: commentData.articleId,
    text: commentData.text,
    date: Date.now(),
    author: commentData.author
  };

  articlesServices.setArticles(articles.map((item) => {
    if (item.id === commentData.articleId) {
      item.comments = item.comments || [];
      item.comments.push(comment);
    }

    return item;
  }))

  return comment;
}

function getNewCommentId() {
  return String((+getComments().toSorted((a, b) => {
    return +b.id - +a.id;
  })[0]?.id || 0) + 1);
}

module.exports = {
  createComment,
};
