const User = require("./user.model");

const getMe = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getMe };
