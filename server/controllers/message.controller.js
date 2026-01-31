const User = require("../models/user");
const Chat = require("../models/chat");
const Message = require("../models/message");
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ email: { $ne: req.user.email } }).select(
      "fullName userName _id",
    );
    res.status(200).json({ data: allUsers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Users" });
  }
};

const sendMessage = async (req, res) => {
  const userA = req.user.userId;
  // const userA = await User.findOne({ email: userEmail });

  const data = req.body;
  const chatId = data.chatId;
  const content = data.content;
  const message = await Message.create({
    sender: userA,
    content: content,
    chat: chatId,
  });
  await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
  // Populate sender in the response for consistency
  const populatedMessage = await Message.findById(message._id).populate(
    "sender",
    "status fullName userName email _id",
  );
  res.status(200).json({ data: populatedMessage });
};

module.exports = { getAllUsers, sendMessage };
