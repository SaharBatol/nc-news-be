const db = require("../db/connection");

exports.removeCommentById = (commentId) => {
  return db
    .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING*;`, [
      commentId,
    ])
    .then((comment) => {
      return comment.rows[0];
    });
};

exports.updateCommentById = (commentId, changeVotes) => {
  return db
    .query(
      `UPDATE comments SET votes = votes 
      + $2 WHERE comment_id = $1 RETURNING *;`,
      [commentId, changeVotes]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
