require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserInfo = require("./models/UserDetails");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());

const mongourl = process.env.MONGO_URI;

const JWT_SECRET = process.env.SECRET_JWT;

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log("Error in Connecting", e);
  });

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

app.post("/register", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const oldUser = await UserInfo.findOne({ email: email });
  if (oldUser) {
    return res.send({ data: "User Already Exists!!" });
  }
  const encryptedPasssword = await bcrypt.hash(password, 10);
  try {
    await UserInfo.create({
      name,
      email,
      mobile,
      password: encryptedPasssword,
    });
    console.log("Error in try block");
    res.send({ status: "ok", data: "User Created" });
  } catch (e) {
    res.send({ status: "error", data: error });
    console.log("Error in catch block Saving");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const oldUser = await UserInfo.findOne({ email: email });
  if (!oldUser) {
    return res.send({ data: "User doesn't exists!!" });
  }
  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.send({ status: "ok", data: token });
    } else {
      return res.send({ error: "Error" });
    }
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    UserInfo.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error });
  }
});

app.listen(5001, () => {
  console.log("Listening on Port 5001");
});
