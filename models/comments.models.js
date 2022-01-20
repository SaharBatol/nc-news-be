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
