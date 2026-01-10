const jwt = require("jsonwebtoken");

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
    socket.on("chat:join", (payload) => {
      const { chatId } = payload;
      console.log("Join Chat room", chatId);
      // server logic happens here
    });
    socket.on("chat:leave", (payload) => {
      const { chatId } = payload;
      console.log("Leaved Chat room", chatId);
      // server logic happens here
    });
    socket.on("disconnect", (reason) => {
      console.log("SERVER: socket disconnected", socket.id, reason);
    });
  });
}

module.exports = { socketHandler };
