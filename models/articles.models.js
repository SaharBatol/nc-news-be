const db = require("../db/connection");

exports.selectArticleById = (article_id) => {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id) AS comment_count
      FROM articles INNER JOIN comments ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1 GROUP BY articles.article_id;`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateArticleById = (articleId, changeVotes) => {
  return db
    .query(
      `UPDATE articles SET votes = votes 
    + $2 WHERE article_id = $1 RETURNING *;`,
      [articleId, changeVotes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.selectArticles = (sortBy = "created_at", orderBy = "DESC", topic) => {
  let topicCondition = false;
  if (!topic) {
    topicCondition = true;
  }
  const allowedSortBy = [
    "article_id",
    "title",
    "body",
    "votes",
    "author",
    "topic",
    "created_at",
    "comment_count",
  ];

  if (!allowedSortBy.includes(sortBy)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  const allowedOrder = ["ASC", "DESC", "asc", "desc"];
  if (!allowedOrder.includes(orderBy)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  return db
    .query(
      `SELECT articles.*, COUNT(comments.comment_id) AS comment_count
      FROM articles
      INNER JOIN comments
      ON articles.article_id = comments.article_id
      WHERE ${topicCondition} OR topic = $1
      GROUP BY articles.article_id
      ORDER BY ${sortBy} ${orderBy};`,
      [topic]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.selectCommentsByArticleId = (commentArticleId) => {
  return db
    .query(
      `SELECT comment_id, votes, created_at, author, body FROM comments
    WHERE article_id = $1;`,
      [commentArticleId]
    )
    .then((comments) => {
      return comments.rows;
    });
};

exports.createCommentByArticleId = (author, body, commentArticleId) => {
  return db
    .query(
      `INSERT INTO comments (author, body, article_id) 
    VALUES($1,$2,$3) RETURNING *;`,
      [author, body, commentArticleId]
    )
    .then((comment) => {
      return comment.rows[0];
    });
};
