const { posts } = require("../dataBase/dbConnection");
const { id } = require("monk");

const getPosts = async (req, res) => {
  const errors = {};
  console.log("Posts requested");
  let postList = {};
  await posts.find({}).then((doc) => {
    if (doc.length === 0) {
      errors.post = "Posts unavailable";
    } else {
      postList = doc;
    }
  });

  if (Object.keys(errors).length != 0) {
    res.status(500).json(errors);
  } else {
    res.status(200).json(postList);
  }
};

const putPost = async (req, res) => {
  console.log("NewPost requested");
  console.log(req.body);
  const post = {
    userFullName: req.body.userFullName,
    postBody: req.body.postBody,
    postHeader: req.body.postHeader,
    postImageURL: req.body.postImageUrl,
    userImageURL: req.body.userImageUrl,
    commentCount: 0,
    likeCount: 0,
    unLikeCount: 0,
    createdAt: new Date().toISOString(),
  };

  await posts
    .insert(post)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};

const getSinglePost = async (req, res) => {
  const errors = {};
  console.log("Single Post requested");
  const postId = req.body.postId;
  let post;
  await posts.find({ _id: postId }).then((doc) => {
    if (doc.length === 0) {
      errors.post = "Post unavailable";
    } else {
      post = doc[0];
    }
  });
  if (Object.keys(errors).length != 0) {
    res.status(500).json(errors);
  } else {
    res.status(200).json(post);
  }
};

const uploadPostImage = async (req, res) => {
  req.on("data", (chunk) => {
    console.log(chunk);
  });
  const postImage = req.body.file;
  res.json("post image upload called");
};

module.exports = {
  getPosts,
  putPost,
  getSinglePost,
  uploadPostImage,
};
