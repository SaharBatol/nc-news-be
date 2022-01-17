const db = require("../connection");
const format = require("pg-format");
const {
  formatTopicData,
  formatUserData,
  formatArticleData,
  formatCommentData,
} = require("../../utils/seed-formatting");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  // 2. insert data
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE topics(
        slug VARCHAR(255) PRIMARY KEY,
        description TEXT NOT NULL
      );
      `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users(
        username VARCHAR(255) PRIMARY KEY,
        avatar_url TEXT,
        name VARCHAR(255) NOT NULL
      );
      `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE articles(
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        topic VARCHAR(255) REFERENCES topics(slug),
        author VARCHAR(255) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE comments(
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(255) REFERENCES users(username),
        article_id INT REFERENCES articles(article_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        body TEXT NOT NULL 
      );
      `);
    })
    .then(() => {
      console.log("Tables created");
    })
    .then(() => {
      const topicSQL = format(
        `INSERT INTO topics(slug, description) VALUES %L RETURNING *;`,
        formatTopicData(topicData)
      );
      return db.query(topicSQL);
    })
    .then(() => {
      const userSQL = format(
        `INSERT INTO users(username, avatar_url, name) VALUES %L RETURNING *;`,
        formatUserData(userData)
      );
      return db.query(userSQL);
    })
    .then(() => {
      const articleSQL = format(
        `INSERT INTO articles(title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
        formatArticleData(articleData)
      );
      return db.query(articleSQL);
    })
    .then(() => {
      const commentsSQL = format(
        `INSERT INTO comments(author, article_id, votes, created_at, body) VALUES %L RETURNING *;`,
        formatCommentData(commentData)
      );
      return db.query(commentsSQL);
    })
    .then(() => {
      console.log("Seeding complete");
    });
};

module.exports = seed;
