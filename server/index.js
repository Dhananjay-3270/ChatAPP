require('dotenv').config();
const express = require("express");
const userRoutes = require("./routes/authRoutes");
const cors = require("cors");
const connectDB = require("./config/db");
const server = express();

connectDB(); // Connect to MongoDB
const port = 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // if you use cookies or authentication
};
server.use(express.json());
server.use(cors(corsOptions));
server.use("/login", userRoutes);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
