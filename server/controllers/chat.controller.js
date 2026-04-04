const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");

const getChatAcess = async (req, res) => {
  try {
    const userA = req.user.userId;
    const userEmail2 = req.body.email;
    const userB = await User.findOne({ email: userEmail2 });

    if (!userEmail2) {
      return res.status(400).json({ error: "userId is required" });
    }
    let chat = await Chat.findOne({
      isGroup: false,
      members: { $all: [userA, userB._id] },
    })
      .populate("members", "fullName userName email")
      .populate("latestMessage");
    if (!chat) {
      // If not, create new chat
      chat = await Chat.create({
        isGroup: false,
        members: [userA, userB._id],
      });
    }
    res.status(200).json({ data: chat });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  const userA = req.user.userId;

  // Step 1: Verify that this user belongs to that chat
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  const isMember = chat.members.some(
    (memberId) => memberId.toString() === userA.toString(),
  );
  if (!isMember) {
    return res.status(403).json({ message: "Access denied" });
  }
  // Step 2: Fetch all messages for this chat
  const messages = await Message.find({ chat: chatId })
    .populate("sender", "fullName userName email status") // show who sent each message
    .sort({ createdAt: 1 }); // oldest to newest

  // Step 3: Return
  res.status(200).json({
    message: "Messages retrieved successfully",
    data: messages,
  });
};
const getAllChats = async (req, res) => {
  try {
    const userA = req.user.userId;
    const { query } = req.query;
    // const userA = await User.findOne({ email: userEmail }).select("_id");
    if (!userA) return res.status(404).json({ error: "User not found" });

    if (!query || query.trim() === "") {
      try {
        const chats = await Chat.find({ members: userA })
          .populate("members", "fullName userName ")
          .populate({
            path: "latestMessage",
            populate: { path: "sender", select: "fullName userName avatar" },
          })
          .sort({ updatedAt: -1 })
          .lean();

        return res.status(200).json({
          message: "Chats retrieved successfully",
          data: { resultType: "chats", data: chats },
        });
      } catch (err) {
        console.error("getAllChats error:", err);
        return res.status(500).json({ error: "Failed to fetch chats" });
      }
    }

    try {
      const users = await User.find({
        userName: { $regex: query, $options: "i" },
        _id: { $ne: userA },
      }).select("_id fullName userName email age role");

      if (!users || users.length === 0) {
        return res.status(200).json({
          message: "No users found matching the query.",
          data: { resultType: "users", data: [] },
        });
      }

      const userIds = users.map((user) => user._id);

      const chats = await Chat.find({
        $or: userIds.map((user) => ({ members: { $all: [userA, user] } })),
      });

      if (chats && chats.length > 0) {
        return res.status(200).json({
          message: "Chats retrieved successfully",
          data: { resultType: "chats", data: chats },
        });
      }

      return res.status(200).json({
        message: "Users retrieved successfully",
        data: { resultType: "users", data: users },
      });
    } catch (error) {
      console.error("Search error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (err) {
    console.error("search chats error:", err);
    return res.status(500).json({ error: "Failed to fetch" });
  }
};

module.exports = { getChatAcess, getMessages, getAllChats };
