import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UserContextProvider } from "./Context/UserContext";
import { useUser } from "./Context/UserContext";
import ChatHome from "./components/ChatUI/ChatHome";
import { socket } from "./websocket/socket";
import { useEffect } from "react";
const AppContent: React.FC = () => {
  const { isAuth, setisAuth } = useUser();
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) setisAuth(true);
    socket.connect();
    socket.on("connect", () => {
      console.log("Client connected:", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
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
      <Route
        path="/"
        element={
          !isAuth ? (
            <Navigate to="/login" replace />
          ) : (
            <Layout>
              <Outlet />
            </Layout>
          )
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/chathome" element={<ChatHome />} />
      </Route>
      <Route
        path="/login"
        element={!isAuth ? <Login /> : <Navigate to="/home" replace />}
      />
      <Route path="/register" element={<Register />} />
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
