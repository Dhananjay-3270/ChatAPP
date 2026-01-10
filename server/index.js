require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const homePageRoutes = require("./routes/configRoutes");
const statusRoutes = require("./routes/statusRoutes");
const chatRoutes = require("./routes/chatRoutes");
const cors = require("cors");
const connectDB = require("./config/db");
const server = express();
const cookieParser = require("cookie-parser");
const http = require("http"); // ⭐ NEW
const { Server } = require("socket.io"); // ⭐ NEW
const { socketHandler } = require("./socket/socketHandler");
connectDB(); // Connect to MongoDB
const socketServer = http.createServer(server);
const io = new Server(socketServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // if you use cookies or authentication
};
server.use(express.json());
server.use(cookieParser());
server.use(cors(corsOptions));
server.use("/api/user", userRoutes);
server.use("/api/status", statusRoutes);
server.use("/api/chat", chatRoutes);
server.use("/api/message", messageRoutes);
server.use("/api/homepage", homePageRoutes);
socketHandler(io);
// io.use((socket, next) => {
//   try {
//     const cookieHeader = socket.handshake.headers.cookie;

//     if (!cookieHeader) {
//       return next(new Error("No auth cookie"));
//     }
//     const token = cookieHeader
//       .split("; ")
//       .find((cookie) => cookie.startsWith("authcookie="))
//       ?.split("=")[1];
//     console.log(token);
//     if (!token) {
//       return next(new Error("Token missing"));
//     }

//     const jwt = require("jsonwebtoken");
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // attach user identity to socket
//     socket.user = {
//       id: decoded.userId,
//       email: decoded.email,
//       role: decoded.role,
//     };
//     next();
//   } catch (error) {
//     next(new Error("Authentication failed"));
//   }
// });

// io.on("connection", (socket) => {
//   console.log("SERVER: socket connected", socket.id, socket.user.email);
//   const userId = socket.user.id;

//   const userRoom = `user:${userId}`;
//   socket.join(userRoom);
//   console.log(`Socket ${socket.id} joined user room ${userRoom}`);
//   // io.to(`user:${userId}`).emit("user:ping", {
//   //   message: "Hello user",
//   // });
//   socket.on("chat:join", (payload) => {
//     const { chatId } = payload;
//     console.log("Join Chat room", chatId);
//     // server logic happens here
//   });
//     socket.on("chat:leave", (payload) => {
//     const { chatId } = payload;
//     console.log("Leaved Chat room", chatId);
//     // server logic happens here
//   });
//   socket.on("disconnect", (reason) => {
//     console.log("SERVER: socket disconnected", socket.id, reason);
//   });
// });

socketServer.listen(port, () => {
  console.log(`socketServer listening on port ${port}`);
});
