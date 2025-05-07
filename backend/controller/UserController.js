//create user controller
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const signUp = async (req, res) => {
  //getting data from the request body
  const { username, email, password } = req.body;

  try {
    //checking if the user email already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    //checking if the user name already exists
    const userName = await UserModel.findOne({ username });
    if (userName) {
      return res.status(400).json({ message: "User name already exists" });
    }

    //hashing the password
    bcrypt.hash(password, 10).then((hashPassword) => {
      //creating new user
      const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
      });
      //saving user to the database
      newUser
        .save()
        .then((user) => {
          res.status(201).json({ message: "User created successfully", user });
        })
        .catch((err) => {
          res
            .status(500)
            .json({ message: "Error creating user", error: err.message });
        });
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  //getting data from the request body
  const { email, password } = req.body;
  try {
    //checking if the user is in the database
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    //comparing the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //create our token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({
        message: "User signed in successfully",
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signUp,
  signIn,
};
