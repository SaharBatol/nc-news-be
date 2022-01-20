const express = require("express");
const {
  getArticleById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentsByArticleId,
} = require("../controllers/articles.controllers");

const articlesRouter = express.Router();

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentsByArticleId);

module.exports = articlesRouter;
