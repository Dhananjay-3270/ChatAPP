const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ email: { $ne: req.user.email } }).select(
      "fullName userName _id"
    );
    res.status(200).json({ data: allUsers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Users" });
  }
};
const getChatAcess = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userEmail2 = req.body.userId
    
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Users" });
  }
};
module.exports = { getAllUsers, getChatAcess };
