const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;  
