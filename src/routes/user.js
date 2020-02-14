const router = require("express").Router();
const verify = require("./verifyToken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { userValidation } = require("../validation");

/* 
!GET ROUTE
* Get User
 */
router.get("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });
  try {
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

/*
!PATCH ROUTE
* Update User
 */
router.patch("/", verify, async (req, res) => {
  //VALIDATE the data
  const { error } = userValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const currentUser = await User.findOne({ _id: req.user._id });
  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword =
    req.body.password == undefined || req.body.password == null
      ? currentUser.password
      : await bcrypt.hash(req.body.password, salt);

  const checkPass = bcrypt
    .compare(
      req.body.password != undefined || req.body.password != null
        ? req.body.password
        : currentUser.password,
      currentUser.password
    )
    .catch(err => {
      console.log(err);
    });

  const user = {
    /*     username:
      req.body.username != null && req.body.username != currentUser.username
        ? req.body.username
        : currentUser.username, */
    name:
      req.body.name != null && req.body.name != currentUser.name
        ? req.body.name
        : currentUser.name,
    /*    email:
      req.body.email != null && req.body.email != currentUser.email
        ? req.body.email
        : currentUser.email, */
    password: checkPass != false ? hashedPassword : currentUser.password,
    user_level:
      req.body.user_level != null &&
      req.body.user_level != currentUser.user_level
        ? req.body.user_level
        : currentUser.user_level
  };

  try {
    const conditions = { _id: currentUser._id };
    const updateObj = user;
    const options = { new: true };
    const updatedUser = await User.findByIdAndUpdate(
      conditions,
      updateObj,
      options,
      (err, doc) => {
        if (err) {
          res.send("Something wrong when updating data!");
        }
        res.send(doc);
      }
    );
    // res.send(updatedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/*
!DELETE ROUTE
* Delete User
 TODO : User interface cookie clean
 */
router.delete("/", verify, async (req, res) => {
  const user = await User.findOne({ _id: req.body._id });
  try {
    const deletedUser = await user.remove(user);
    res.send(deletedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
