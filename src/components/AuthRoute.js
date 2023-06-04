import { Navigate } from "react-router-dom";

const AuthRoute = ({ sessionId, children }) => {
  if (sessionId) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthRoute;