import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const App: React.FC = () => {
  const isAuth = false;
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            isAuth ? (
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
      </Routes>

  );
};

export default App;
