import categoryModel from "../dbSchema/categoryModel";

const categroy = (req, res) => {
  categoryModel
    .find()
    .then((data) => {
      // console.log(data);
      return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(err.code || 500).json({ errors: "Server Errors" });
    });
};

export { categroy };
