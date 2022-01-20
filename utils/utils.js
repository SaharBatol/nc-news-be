const db = require("../db/connection");

exports.checkArticleExists = (articleId) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.checkAuthorExists = (author) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1`, [author])
    .then(({ rows }) => {
      if (rows.length) {
        return true;
      } else {
        return false;
      }
    });
};

exports.checkTopicExists = (topicCheck) => {
  return db.query(`SELECT topic FROM articles`).then((topics) => {
    if (!topicCheck) {
      return true;
    } else {
      return topics.rows.some((topic) => {
        if (topic.topic === topicCheck) {
          return true;
        } else {
          return false;
        }
      });
    }
  });
};
