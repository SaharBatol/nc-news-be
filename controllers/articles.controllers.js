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
  const article_id = req.params.article_id;
  return checkArticleExists(article_id)
    .then((articleExists) => {
      if (articleExists) {
        return selectArticleById(article_id).then((article) => {
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
  const article_id = req.params.article_id;
  const changeAmount = req.body.inc_votes;
  return checkArticleExists(article_id)
    .then((articleExists) => {
      if (articleExists) {
        return updateArticleById(article_id, changeAmount).then((result) => {
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
  return checkTopicExists(topic)
    .then((exists) => {
      if (exists) {
        return selectArticles(sortBy, orderBy, topic).then((articles) => {
          res.status(200).send({ articles });
        });
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
