const { default: postModel } = require("../dbSchema/postModel");

const add = (req, res) => {
  let added = false;
  postModel
    .findById(req.params.postId)
    .then((post) => {
      let whoLiked, likeCount;
      if (post.whoLiked.includes(req.body.userId)) {
        whoLiked = post.whoLiked.filter((id) => id !== req.body.userId);
        console.log(whoLiked);
        likeCount = post.likeCount - 1;
        added = false;
      } else {
        whoLiked = [...post.whoLiked, req.body.userId];
        likeCount = post.likeCount + 1;
        added = true;
      }
      console.log("added ", added);

      postModel
        .findByIdAndUpdate(
          req.params.postId,
          { likeCount: likeCount, whoLiked: whoLiked },
          { new: true },
          (err, post) => {
            if (err) console.log(err);
            console.log(post);
          }
        )
        .catch((err) => console.log(err));
      if (added) return res.status(200).json("added");
      else return res.status(200).json("removed");
    })
    .catch((err) => console.log(err));

  console.log("exit ", added);
};

const addUnlike = (req, res) => {
  let added = false;
  postModel
    .findById(req.params.postId)
    .then((post) => {
      let whoUnLiked, unlikeCount;
      if (post.whoUnLiked.includes(req.body.userId)) {
        whoUnLiked = post.whoUnLiked.filter((id) => id !== req.body.userId);
        added = false;
        unlikeCount = post.unlikeCount - 1;
      } else {
        whoUnLiked = [...post.whoUnLiked, req.body.userId];
        added = true;
        unlikeCount = post.unlikeCount + 1;
      }
      console.log(whoUnLiked, unlikeCount, added);

      postModel.findByIdAndUpdate(
        req.params.postId,
        { unlikeCount: unlikeCount, whoUnLiked: whoUnLiked },
        { new: true },
        (err, post) => {
          if (err) console.log(err);
          console.log(post);
        }
      );

      if (added) return res.status(200).json("added");
      else return res.status(200).json("removed");
    })
    .catch((err) => console.log(err));
};

export { addUnlike, add };
