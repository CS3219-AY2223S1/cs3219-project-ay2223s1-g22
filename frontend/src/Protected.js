import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./UserContext";

function Protected({ children }) {
  const user = useContext(UserContext);

  if (!user.isLoggedIn()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default Protected;
