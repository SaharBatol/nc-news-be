const {
  removeCommentById,
  updateCommentById,
} = require("../models/comments.models");
const { checkCommentExists } = require("../utils/utils");

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

exports.patchCommentById = (req, res, next) => {
  const commentId = req.params.comment_id;
  const changeAmount = req.body.inc_votes;
  return checkCommentExists(commentId)
    .then((commentExists) => {
      if (commentExists) {
        return updateCommentById(commentId, changeAmount).then((comment) => {
          return res.status(201).send({ comment });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
