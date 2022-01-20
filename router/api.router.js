const express = require("express");
const articlesRouter = require("./articles.router");
const { getTopics } = require("../controllers/topics.controllers");
const { getArticles } = require("../controllers/articles.controllers");

const apiRouter = express.Router();

apiRouter.get("/topics", getTopics);

apiRouter.get("/articles", getArticles);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
