const router = require('express').Router();
const User = require('../models/user.model');
const {loginValidation,registerValidation}=require('../validation');




router.post('/register', async (req, res) => {

  //VALIDATE the data
   const {error}=registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Checking if the user is already in the database
  const emailExist = await User.findOne({email:req.body.email});
  if(emailExist) return res.status(400).send('Email already exists');

  const user = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    user_level: req.body.user_level
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
})
router.post('/login', async (req, res) => {
});

module.exports = router;