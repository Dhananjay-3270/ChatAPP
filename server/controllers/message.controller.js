const User = require("../models/user");
const Chat = require("../models/chat");
const Message = require("../models/message");
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

const sendMessage = async (req, res) => {

  const userEmail = req.user.email;
  const userA = await User.findOne({ email: userEmail });

  const data = req.body;
  const chatId = data.chatId;
  const content = data.content;
  const message = await Message.create({
    sender: userA._id,
    content: content,
    chat: chatId,
  });
  await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
  res.status(200).json({ data: message });
};

module.exports = { getAllUsers, sendMessage };
