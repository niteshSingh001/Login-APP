const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  mobile: String,
  password: String,
});

const UserInfo = new mongoose.model("UserInfo", UserDetailsSchema);

module.exports = UserInfo;
