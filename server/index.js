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
io.on("connection", (socket) => console.log(`Socket Connected ${socket.id}`));
socketServer.listen(port, () => {
  console.log(`socketServer listening on port ${port}`);
});
