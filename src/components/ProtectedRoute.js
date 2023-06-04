import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ sessionId, children }) => {
  if (!sessionId) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;