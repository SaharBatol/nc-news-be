const { removeCommentById } = require("../models/comments.models");

exports.deleteCommentById = (req, res, next) => {
  const commentId = req.params.comment_id;

  return removeCommentById(commentId)
    .then((comment) => {
      return res.status(204).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
