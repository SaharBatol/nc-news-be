const express = require("express");
const { deleteCommentById } = require("../controllers/comments.controllers");
const commentsRouter = express.Router();

commentsRouter.route("/:comment_id").delete(deleteCommentById);
// .patch(patchCommentById);

module.exports = commentsRouter;
