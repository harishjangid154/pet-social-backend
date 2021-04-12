import Router from "express";
import postModel from "../dbSchema/postModel";
import userModel from "../dbSchema/userModel";

const router = Router();

router.post("/:postId", (req, res) => {
  postModel.findOne({ _id: req.params.postId }).then((doc) => {
    const likes = doc.likeCount + 1;
    console.log(likes);
    const likeArr = [...doc.whoLiked, req.body.userId];
    postModel
      .findOneAndUpdate(
        req.params.postId,
        { likeCount: likes, whoLiked: likeArr },
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
  console.log("Liked :- ", req.params.postId);
  res.status(200).json({ ok: "ok" });
});
router.post("/unlike/:postId", (req, res) => {
  postModel.findOne({ _id: req.params.postId }).then((doc) => {
    const unLikes = doc.unlikeCount + 1;
    console.log(unLikes);
    const unLikeArr = [...doc.whoUnLiked, req.body.userId];
    postModel
      .findOneAndUpdate(
        req.params.postId,
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
});

export default router;
