import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, userType } = useAuth(); // your custom auth logic

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(userType)) return <Navigate to="/unauthorized" />;

  return children;
};
