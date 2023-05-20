const Post = require("../models/posts");

exports.createPost = (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(response => {
    res.status(200).json({
      message: 'successful posting!',
      id: response._id
    });

  })
};

exports.getPosts = (req, res, next) => {
  console.log('triggered!')
  Post.find().then(documents => {

  res.status(200).json({
    message: 'Response from the server!',
    posts: documents
  });

  }).catch(() => {
    console.log('error in get')
  })
};
