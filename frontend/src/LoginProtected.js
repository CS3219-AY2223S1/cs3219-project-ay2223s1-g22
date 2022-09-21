import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";

function LoginProtected({ children }) {
  const user = useContext(UserContext);

  if (!user.isLoggedIn()) {
    return children;
  }
  return <Navigate to="/" replace />;
}

export default LoginProtected;
