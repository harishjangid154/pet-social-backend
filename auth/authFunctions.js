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
    password: yup.string().min(1),
  });

  if (!(await schema.isValid({ email: user.email }))) {
    errors.email = "Enter a valid email";
  }
  if (!(await schema.isValid({ password: user.password }))) {
    errors.password = "Password must be 1 char long";
  }

  await users.find({ email: user.email }).then((doc) => {
    console.log(doc);
    if (doc.length === 0) {
      errors.err = "User not regestered";
    } else {
      if (doc[0].password != user.password) {
        errors.password = "Invalid Credentials";
      } else {
        user = doc[0];
      }
    }
  });

  if (Object.keys(errors).length != 0) {
    res.status(401).json(errors);
  }

  res.status(200).json(user);
};

const signup = async (req, res) => {
  const defaultImage = "localhost:5000/userImages/default.jpg";
  const errors = {};
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
        console.log(doc);
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
