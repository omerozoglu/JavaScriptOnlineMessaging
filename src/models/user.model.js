const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024
  },
  name: {
    type: String,
    required: false,
    default: "starling"
  },
  user_level: {
    type: Number,
    required: false,
    default: 0
  },
  req_date: {
    type: Date,
    required: false,
    default: Date.now
  }
});

module.exports = mongoose.model("Users", UserSchema);
