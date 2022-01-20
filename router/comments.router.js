const express = require("express");

const commentsRouter = express.Router();

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentById)
  .patch(patchCommentById);

module.exports = commentsRouter;
