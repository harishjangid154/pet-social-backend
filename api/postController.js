import postModel from "../dbSchema/postModel";

const uploadPost = (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json({ errors: "You need to login" });
  }
  const post = new postModel(req.body);

  post
    .save()
    .then(() => {
      return res.status(200).json({ post: post });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const getPosts = (req, res) => {
  if (!req.body.user) {
    return res.status(400).json("Bad Request");
  }
  postModel
    .find()
    .skip(req.body.skip)
    .limit(req.body.limit)
    .then((data) => {
      console.log(data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errors: "server error" });
    });
};

const getSinglePost = (req, res) => {
  if (!req.body.userId) {
    return res.status(400).json("Bad Request");
  }

  postModel
    .findOne({ _id: req.params.postId })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json("Post unavailable");
    });
};
export { uploadPost, getPosts, getSinglePost };
