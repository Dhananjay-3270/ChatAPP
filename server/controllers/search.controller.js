const Chat = require("../models/chat");
const User = require("../models/user");

const search = async (req, res) => {
  const userA = req.user.userId;
  const { query } = req.query;
  const users = await User.find({
    userName: { $regex: query, $options: "i" },
    _id: { $ne: userA },
  });
  let userIds;
  if (users) {
    userIds = users.map((user) => {
      let id = user._id;
      return id;
    });
  }
  //   console.log(userA);
  //   console.log(users);
  userIds.map((user) => console.log(user));
  const chats = await Chat.find({
    $or: userIds.map((user) => ({ members: { $all: [userA, user] } })),
  });
  if (chats && chats.length > 0) {
    const data = {
      resultType: "chats",
      data: chats,
    };
    res
      .status(200)
      .json({ message: "Chats retrieved successfully", data: data });
  }
  const data = {
    resultType: "users",
    data: users,
  };
  res.status(200).json({ message: "Users retrieved successfully", data: data });
};

module.exports = { search };
