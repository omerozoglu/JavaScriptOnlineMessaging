const router = require("express").Router();
const verify = require("./verifyToken");
const Message = require("../models/message.model");

/*
!GET ROUTE
* Get messages
*/
router.get("/", verify, async (req, res) => {
  const messages = await Message.find();
  try {
    res.send(messages);
  } catch (error) {
    res.status(400).send(error);
  }
});

/*
!POST ROUTE
* Post message
*/
router.post("/", verify, async (req, res) => {
  const message = new Message({
    data: req.body.data,
    user_id: req.user._id
  });
  try {
    const savedMessage = await message.save();
    res.send(savedMessage);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
