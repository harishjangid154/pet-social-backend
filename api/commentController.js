import commentModel from "../dbSchema/commentModel";
import postModel from "../dbSchema/postModel";

const addComment = (req, res) => {
  console.log("Loged");
  const newComment = new commentModel({
    userId: req.body.userId,
    text: req.body.text,
  });
  // console.log(newComment);
  newComment
    .save()
    .then(() => {
      console.log("saved");
      postModel.findOne({ _id: req.body.postId }).then((post) => {
        const comments = [...post.comments, newComment._id];
        const whoCommented = [...post.whoCommented, req.body.userId];
        postModel
          .findOneAndUpdate(
            { _id: req.body.postId },
            { whoCommented: whoCommented, comments: comments },
            { new: true }
          )
          .then((doc) => {
            console.log(doc);
          });
      });
      return res.status(200).json(newComment);
    })
    .catch((err) => {
      // console.log("errr", err);
      return res.status(err.code).json({ errors: "Cant post your commnet" });
    });
};

const getComment = (req, res) => {
  const commentId = req.params.commentId;
  commentModel
    .find({ _id: commentId })
    .then((doc) => {
      console.log(doc);
      return res.status(200).json(doc);
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.code || 500).json({ errors: "Server Error" });
    });
};

export { addComment, getComment };
