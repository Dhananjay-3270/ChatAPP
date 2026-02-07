const jwt = require("jsonwebtoken");
const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message");
// Socket authentication middleware
function socketAuth(socket, next) {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      return next(new Error("No auth cookie"));
    }
    const token = cookieHeader
      .split("; ")
      .find((cookie) => cookie.startsWith("authcookie="))
      ?.split("=")[1];
    console.log(token);
    if (!token) {
      return next(new Error("Token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user identity to socket
    socket.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    next(new Error("Authentication failed"));
  }
}

function socketHandler(io) {
  // Apply authentication middleware
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("SERVER: socket connected", socket.id, socket.user.email);
    const userId = socket.user.id;

    const userRoom = `user:${userId}`;
    socket.join(userRoom);
    console.log(`Socket ${socket.id} joined user room ${userRoom}`);
    // io.to(`user:${userId}`).emit("user:ping", {
    //   message: "Hello user",
    // });
    // Require Chat model

    socket.on("chat:join", async (payload) => {
      const { chatId } = payload;
      const userId = socket.user.id;

      try {
        // 1️⃣ Validate input
        if (!chatId) {
          socket.emit("chat:join:error", { error: "chatId missing" });
          return;
        }

        // 2️⃣ Validate chat + membership (JOIN requires validation)
        const chat = await Chat.findById(chatId).select("members");
        if (!chat) {
          socket.emit("chat:join:error", { error: "Chat not found" });
          return;
        }

        const isMember = chat.members.some(
          (memberId) => memberId.toString() === userId,
        );

        if (!isMember) {
          socket.emit("chat:join:error", { error: "User not in chat" });
          return;
        }

        // 3️⃣ If already in the same chat → NO-OP (idempotent)
        if (socket.activeChatId === chatId) {
          socket.emit("chat:join:success", { chatId });
          return;
        }

        // 4️⃣ If switching chats → leave previous one FIRST
        if (socket.activeChatId) {
          socket.leave(`chat:${socket.activeChatId}`);
        }

        // 5️⃣ Join new chat
        socket.join(`chat:${chatId}`);
        socket.activeChatId = chatId;

        console.log(`User ${userId} joined chat:${chatId}`);

        socket.emit("chat:join:success", { chatId });
      } catch (err) {
        console.error("chat:join error", err);
        socket.emit("chat:join:error", { error: "Server error" });
      }
    });

    socket.on("chat:leave", (payload) => {
      const { chatId } = payload;
      const userId = socket.user.id;

      try {
        // Only leave if this is the ACTIVE chat
        if (socket.activeChatId !== chatId) {
          return;
        }

        socket.leave(`chat:${chatId}`);
        socket.activeChatId = null;

        console.log(`User ${userId} left chat:${chatId}`);

        socket.emit("chat:leave:success", { chatId });
      } catch (err) {
        console.error("chat:leave error", err);
        socket.emit("chat:leave:error", { error: "Server error" });
      }
    });
    socket.on("message:send", async (payload) => {
      const { chatId, inputMessage } = payload;
      const userId = socket.user.id;

      try {
        if (!chatId || !inputMessage?.trim()) {
          socket.emit("message:error", { error: "Invalid message payload" });
          return;
        }
        if (socket.activeChatId !== chatId) {
          socket.emit("message:error", {
            error: "You are not in this chat",
          });
          return;
        }
        const chat = await Chat.findById(chatId).select("members");
        if (!chat) {
          socket.emit("message:error", { error: "Chat not found" });
          return;
        }

        const isMember = chat.members.some((id) => id.toString() === userId);

        if (!isMember) {
          socket.emit("message:error", { error: "Not authorized" });
          return;
        }

        const message = await Message.create({
          sender: userId,
          content: inputMessage,
          chat: chatId,
        });
        await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
        const populatedMessage = await Message.findById(message._id).populate(
          "sender",
          "status fullName userName email _id",
        );

        io.to(`chat:${chatId}`).emit("message:new", populatedMessage);
        /* 7️⃣ Emit to user rooms (chat list updates) */
        chat.members.forEach((memberId) => {
          io.to(`user:${memberId}`).emit("chat:updated", {
            chatId,
            lastMessage: populatedMessage,
          });
        });
      } catch (e) {
        console.error("message:send error", e);
        socket.emit("message:error", { error: "Server error" });
      }
    });
    socket.on("disconnect", (reason) => {
      console.log("SERVER: socket disconnected", socket.id, reason);
    });
  });
}

module.exports = { socketHandler };
