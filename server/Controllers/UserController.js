const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const _userController = {};

_userController.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        return res.status(400).json({ message: "Username already exists" });
      }
    }

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

_userController.login = async (req, res) => {

 const { email, password } = req.body;

 if (!email || !password) {
   return res.status(400).json({ message: "Please provide all required fields" });
 }

 try {
   const user = await User.findOne({ email });
   
   if (!user) {
     return res.status(400).json({ message: "Invalid credentials" });
    }   

    const isMatch = await bcrypt.compare(password, user.password);

   if (!isMatch) {
     return res.status(400).json({ message: "Invalid credentials" });
   }

   const token = jwt.sign({ id: user._id }, "mahiway", { expiresIn: "1h" });

   user.token = token;
   await user.save();

   res.status(200).json({ message: "Login successful", token });
 } catch (error) {
   console.error("Error logging in user:", error);
   res.status(500).json({ message: "Server error" });
 }

}

module.exports = _userController;