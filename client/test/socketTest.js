import { io } from "socket.io-client";
console.log("Starting socket test...");
const socket = io("http://localhost:3000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Client connected:", socket.id);
});
socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
});
