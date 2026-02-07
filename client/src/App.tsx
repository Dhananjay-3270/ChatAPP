import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UserContextProvider } from "./Context/UserContext";
import ChatHome from "./components/ChatUI/ChatHome";
import { socket } from "./websocket/socket";
import { useEffect } from "react";
import { ProtectedRoute } from "./ProtectedRoute";
const AppContent: React.FC = () => {
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Client connected:", socket.id);
    });
    socket.on("user:ping", (data) => {
      console.log("PING RECEIVED:", data);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });
    socket.on("disconnect", (reason) => {
      console.log("Client: socket disconnected", reason);
    });
    return () => {
      // Cleanup listeners only (NOT disconnect yet)
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/chathome" element={<ChatHome />} />
        </Route>
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
};

export default App;
