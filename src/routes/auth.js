const router = require('express').Router();
const User = require('../models/user.model');



//VALIDATION
const Joi = require('@hapi/joi');

const schema = Joi.object({
  username: Joi.string().min(6).required(),
  name: Joi.string().min(6),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  user_level: Joi.number().min(2)
});

router.post('/register', async (req, res) => {

  //VALIDATE the data

  const { error } = await schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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