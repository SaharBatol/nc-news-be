const express = require("express");
const articlesRouter = require("./articles.router");
const commentsRouter = require("./comments.router");
const { getTopics } = require("../controllers/topics.controllers");
const { getArticles } = require("../controllers/articles.controllers");
const { getUsers } = require("../controllers/users.controllers");
const userRouter = require("./users.router");

const apiRouter = express.Router();

apiRouter.get("/topics", getTopics);
apiRouter.get("/articles", getArticles);
apiRouter.use("/articles", articlesRouter);
apiRouter.get("/users", getUsers);
apiRouter.use("/users", userRouter);

apiRouter.use("/comments", commentsRouter);
module.exports = apiRouter;
