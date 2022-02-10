const {
  selectArticleById,
  updateArticleById,
  selectArticles,
  selectCommentsByArticleId,
  createCommentByArticleId,
} = require("../models/articles.models");
const {
  checkArticleExists,
  checkTopicExists,
  checkAuthorExists,
} = require("../utils/utils");

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  return checkArticleExists(articleId)
    .then((articleExists) => {
      if (articleExists) {
        return selectArticleById(articleId).then((article) => {
          return res.status(200).send({ article });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
exports.patchArticleById = (req, res, next) => {
  const articleId = req.params.article_id;
  const changeAmount = req.body.inc_votes;
  return checkArticleExists(articleId)
    .then((articleExists) => {
      if (articleExists) {
        return updateArticleById(articleId, changeAmount).then((result) => {
          return res.status(201).send({ result });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticles = (req, res, next) => {
  const sortBy = req.query.sort_by;
  const orderBy = req.query.order_by;
  const topic = req.query.topic;
  const limit = req.query.limit;
  const page = req.query.p;
  return checkTopicExists(topic)
    .then((exists) => {
      if (exists) {
        return selectArticles(sortBy, orderBy, topic, limit, page).then(
          (articles) => {
            res.status(200).send({ articles });
          }
        );
      } else {
        return Promise.reject({ status: 404, msg: "not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const commentArticleId = req.params.article_id;
  return checkArticleExists(commentArticleId)
    .then((articleExists) => {
      if (articleExists) {
        return selectCommentsByArticleId(commentArticleId).then((comments) => {
          return res.status(200).send({ comments });
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsByArticleId = (req, res, next) => {
  const author = req.body.username;
  const body = req.body.body;
  const commentArticleId = req.params.article_id;
  return checkArticleExists(commentArticleId)
    .then((articleExists) => {
      if (articleExists) {
        return checkAuthorExists(author).then((userExists) => {
          if (userExists) {
            return createCommentByArticleId(
              author,
              body,
              commentArticleId
            ).then((comment) => {
              return res.status(201).send({ comment });
            });
          } else {
            return Promise.reject({ status: 404, msg: "Not found" });
          }
        });
      } else {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    })
    .catch((err) => {
      next(err);
    });
};
