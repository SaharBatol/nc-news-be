const express = require("express");
const articlesIdRouter = require("./articles_id.router");
const {
  getArticleById,
  patchArticleById,
} = require("../controllers/articles.controllers");

const articlesRouter = express.Router();

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter.use("/:article_id", articlesIdRouter);

module.exports = articlesRouter;
