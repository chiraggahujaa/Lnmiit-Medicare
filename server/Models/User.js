const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uniqueId : {
    type : String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
