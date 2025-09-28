require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const homePageRoutes = require("./routes/configRoutes");
const statusRoutes = require("./routes/statusRoutes");
const cors = require("cors");
const connectDB = require("./config/db");
const server = express();
const cookieParser = require("cookie-parser");

connectDB(); // Connect to MongoDB
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
server.use("/api/message", messageRoutes);
server.use("/api/homepage", homePageRoutes);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
