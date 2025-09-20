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

const AppContent: React.FC = () => {
  const { isAuth } = useUser();

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
      </Route>
      <Route path="/login" element={<Login />} />
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
