import { checkout } from "../userRoutes";

const { default: postModel } = require("../dbSchema/postModel");

const addlike = (req, res) => {
  postModel.findOne({ _id: req.params.postId }).then((doc) => {
    // const has = doc.whoLiked.filter((like) => like === req.body.userId);
    // console.log(has);
    // if (has.length != 0) {
    //   return res.status(200).json({ liked: "Liked" });
    // }
    const likes = doc.likeCount + 1;
    console.log(likes);
    const likeArr = [...doc.whoLiked, req.body.userId];
    postModel
      .findOneAndUpdate(
        { _id: req.params.postId },
        { likeCount: likes, whoLiked: likeArr },
        { new: true },
        (err, docs) => {
          if (err) {
            console.log("Cann't find doc :- ", err);
          } else {
            console.log("Liked :-  ", docs);
            return res.status(200).json({ ok: "ok" });
          }
        }
      )
      .catch((err) => {
        console.log(err);
      });
  });
  console.log("Liked :- ", req.params.postId);
};

const removeLike = (req, res) => {
  console.log("like Removed");
  const userId = req.body.userId;
  postModel.findOne({ _id: req.params.postId }).then((doc) => {
    const likes = doc.likeCount - 1;
    console.log(likes);
    const likeArr = doc.whoLiked.filter((id) => id != userId);
    postModel
      .findOneAndUpdate(
        req.params.postId,
        { likeCount: likes, whoLiked: likeArr },
        { new: true },
        (err, docs) => {
          if (err) {
            console.log("Cann't find doc :- ", err);
          } else {
            console.log("Like Removed :-  ", docs);
          }
        }
      )
      .catch((err) => {
        console.log(err);
      });
  });
  console.log("Liked :- ", req.params.postId);
  res.status(200).json({ ok: "ok" });
};

const addUnlike = (req, res) => {
  postModel.findOne({ _id: req.params.postId }).then((doc) => {
    const unLikes = doc.unlikeCount + 1;
    console.log(unLikes);
    const unLikeArr = [...doc.whoUnLiked, req.body.userId];
    postModel
      .findOneAndUpdate(
        { _id: req.params.postId },
        { unlikeCount: unLikes, whoUnLiked: unLikeArr },
        { new: true },
        (err, docs) => {
          if (err) {
            console.log("Cann't find doc :- ", err);
          } else {
            console.log("unliked :-  ", docs);
          }
        }
      )
      .catch((err) => {
        console.log(err);
      });
  });
  console.log("Unliked :- ", req.params.postId);
  res.status(200).json({ ok: "ok" });
};

const removeUnlike = (req, res) => {
  const userId = req.body.userId;
  postModel.findOne({ _id: req.params.postId }).then((doc) => {
    const unLikes = doc.unlikeCount - 1;
    console.log(unLikes);
    const unLikeArr = doc.whoUnLiked.filter(id != userId);
    postModel
      .findOneAndUpdate(
        { _id: req.params.postId },
        { unlikeCount: unLikes, whoUnLiked: unLikeArr },
        { new: true },
        (err, docs) => {
          if (err) {
            console.log("Cann't find doc :- ", err);
          } else {
            console.log("Liked :-  ", docs);
          }
        }
      )
      .catch((err) => {
        console.log(err);
      });
  });
  console.log("Unliked :- ", req.params.postId);
  res.status(200).json({ ok: "ok" });
};

export { addlike, removeLike, addUnlike, removeUnlike };
