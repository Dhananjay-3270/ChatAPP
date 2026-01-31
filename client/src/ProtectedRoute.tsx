import { useEffect } from "react";
import { useUser } from "./Context/UserContext";
import { Layout } from "./Layout/Layout";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const { isAuth, setisAuth, setuser } = useUser();
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      setisAuth(true);
      setuser(JSON.parse(userDetails));
    }
  }, []);
  if (!isAuth)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
