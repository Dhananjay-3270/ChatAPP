const Chat = require("../models/chat");
const User = require("../models/user");

const search = async (req, res) => {
  try {
    const userA = req.user.userId;
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const users = await User.find({
      userName: { $regex: query, $options: "i" },
      _id: { $ne: userA },
    });

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
};

module.exports = { search };
