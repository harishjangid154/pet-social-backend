const { users } = require("../dataBase/dbConnection");
const yup = require("yup");

const login = async (req, res) => {
  const errors = {};
  let user = {
    email: req.body.email,
    password: req.body.password,
  };

  const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string().min(8).max(16),
  });

  if (
    !(await schema.isValid({ email: user.email })) ||
    user.email.length === 0
  ) {
    errors.email = "Enter a valid email";
  }
  if (!(await schema.isValid({ password: user.password }))) {
    errors.password = "Invalid Credentials";
  }
  if (Object.keys(errors).length != 0) {
    return res.status(400).json({ errors: errors });
  }

  await users.find({ email: user.email }).then((doc) => {
    console.log(doc);
    if (doc.length === 0) {
      errors.user = "User not regestered";
    } else {
      if (doc[0].password != user.password) {
        errors.password = "Invalid Credentials";
      } else {
        return res.status(200).json({ user: doc[0] });
      }
    }
  });

  if (Object.keys(errors).length != 0) {
    return res.status(400).json({ errors: errors });
  }

  return res.status(200).json(user);
};

const signup = async (req, res) => {
  const errors = {};
  if (Object.keys(req.body).length === 0) {
    errors.body = "Empty body";
    return res.status(400).json({ errors });
  }
  const defaultImage = "http://localhost:5000/userImages/default.jpg";
  const schema = yup.object().shape({
    email: yup.string().email(),
    password: yup
      .string()
      .min(8, "must be 8 char long")
      .max(16, "must be less than or equat to 16"),
    username: yup.string().min(1),
    firstName: yup.string().min(1),
    lastName: yup.string().min(1),
  });
  console.log(req.body);
  const user = {
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userImageUrl: defaultImage,
    createdAt: new Date().toISOString(),
  };
  // console.log(user);
  if (!(await schema.isValid({ email: user.email }))) {
    errors.email = "Enter a valid email";
  }
  if (!(await schema.isValid({ password: user.password }))) {
    errors.password = "Password should be in range of 8-16 char";
  }
  if (!(await schema.isValid({ username: user.userName }))) {
    errors.userName = "Enter a valid user name";
  }
  if (!(await schema.isValid({ firstName: user.firstName }))) {
    errors.firstName = "Enter a valid  first name";
  }
  if (!(await schema.isValid({ lastName: user.lastName }))) {
    errors.lastName = "Enter a valid last name";
  }

  await users
    .find({ email: user.email })
    .then((doc) => {
      // console.log(doc);
      if (doc.length != 0) {
        errors.email = "Email already exist";
      }
    })
    .catch((err) => {
      console.log(err);
    });

  await users
    .find({ userName: user.userName })
    .then((doc) => {
      // console.log(doc);
      if (doc.length != 0) {
        errors.userName = "User Name already exist";
      }
    })
    .catch((err) => {
      console.log(err);
    });

  if (Object.keys(errors).length != 0) {
    console.log(errors);
    res.status(400).json({ errors: errors });
  } else {
    await users
      .insert(user)
      .then((doc) => {
        return res.status(200).json({ user: doc });
      })
      .catch((err) => {
        console.log(err);
      });
    res.status(200).json(user);
  }
};

const getUser = (req, res) => {
  console.log("User data requested");
};

module.exports = {
  login,
  signup,
  getUser,
};
