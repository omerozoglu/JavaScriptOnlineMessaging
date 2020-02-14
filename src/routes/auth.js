const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs"); // Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.
const jwt = require("jsonwebtoken"); // An implementation of JSON Web Tokens.
const { loginValidation, registerValidation } = require("../validation");

//* Register Route

router.post("/register", async (req, res) => {
  //VALIDATE the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  //Checking if the user is already in the database
  const usernameExist = await User.findOne({ message: req.body.username });
  if (usernameExist)
    return res.status(400).send({ message: "Username already exists" });

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ message: "Email already exists" });

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    user_level: req.body.user_level
  });
  try {
    const savedUser = await user.save();
    res.send({ _id: savedUser._id });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

//* Login Route
router.post("/login", async (req, res) => {
  //VALIDATE the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the username exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Username or password is wrong");

  //Password is correct
  const vaildPass = await bcrypt.compare(req.body.password, user.password);
  if (!vaildPass) return res.status(400).send("Username or password is wrong");
  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
