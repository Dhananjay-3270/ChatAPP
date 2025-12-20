import { io, Socket } from "socket.io-client";
console.log("Starting socket test...");
const SOCKET_URL = "http://localhost:3000"
export const socket: Socket = io(SOCKET_URL, {
    withCredentials: true,
    autoConnect: false
});
