const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");

const getChatAcess = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const userEmail2 = req.body.email;
    const userA = await User.findOne({ email: userEmail });
    const userB = await User.findOne({ email: userEmail2 });

    if (!userEmail2) {
      return res.status(400).json({ error: "userId is required" });
    }
    let chat = await Chat.findOne({
      isGroup: false,
      members: { $all: [userA._id, userB._id] },
    })
      .populate("members", "fullName userName email")
      .populate("latestMessage");
    if (!chat) {
      // If not, create new chat
      chat = await Chat.create({
        isGroup: false,
        members: [userA._id, userB._id],
      });
    }
    res.status(200).json({ data: chat });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  const userEmail = req.user.email;
  const userA = await User.findOne({ email: userEmail });
  // Step 1: Verify that this user belongs to that chat
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  const isMember = chat.members.some(
    (memberId) => memberId.toString() === userA._id.toString()
  );
  if (!isMember) {
    return res.status(403).json({ message: "Access denied" });
  }
  // Step 2: Fetch all messages for this chat
  const messages = await Message.find({ chat: chatId })
    .populate("sender", "fullName userName email status") // show who sent each message
    .sort({ createdAt: 1 }); // oldest to newest

  // Step 3: Return
  res.status(200).json({ messages });
};
const getAllChats = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const userA = await User.findOne({ email: userEmail }).select("_id");
    if (!userA) return res.status(404).json({ error: "User not found" });

    const chats = await Chat.find({ members: userA._id })
      .populate("members", "fullName userName avatar")
      .populate({
        path: "latestMessage",
        populate: { path: "sender", select: "fullName userName avatar" },
      })
      .sort({ updatedAt: -1 })
      .lean();

    return res.status(200).json({ data: chats });
  } catch (err) {
    console.error("getAllChats error:", err);
    return res.status(500).json({ error: "Failed to fetch chats" });
  }
};

module.exports = { getChatAcess, getMessages, getAllChats };
