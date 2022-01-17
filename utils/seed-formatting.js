exports.formatTopicData = (topicData) => {
  const formattedTopicData = topicData.map((topic) => [
    topic.slug,
    topic.description,
  ]);
  return formattedTopicData;
};

exports.formatUserData = (userData) => {
  const formattedUserData = userData.map((user) => [
    user.username,
    user.avatar_url,
    user.name,
  ]);
  return formattedUserData;
};

exports.formatArticleData = (articleData) => {
  const formattedArticleData = articleData.map((article) => [
    article.title,
    article.body,
    article.votes,
    article.topic,
    article.author,
    article.created_at,
  ]);
  return formattedArticleData;
};

exports.formatCommentData = (commentData) => {
  const formattedCommentData = commentData.map((comment) => [
    comment.author,
    comment.article_id,
    comment.votes,
    comment.created_at,
    comment.body,
  ]);
  return formattedCommentData;
};
