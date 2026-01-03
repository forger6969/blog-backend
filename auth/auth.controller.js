require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../users/user.model");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "add all keys!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ password: hashedPassword, username, email });
    await user.save();

    res.status(201).json({ succes: true });
  } catch (err) {
    res.status(400).json({ succes: false, message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ succes: false, message: "add all keys" });
    }

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(404).json({ succes: false, message: "User not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res
        .status(400)
        .json({ succes: false, message: "invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ succes: true, token , id:user._id});
  } catch (err) {
    res.status(500).json({ succes: false, message: err.message });
  }
};



module.exports = {
    registerUser,
    loginUser
}