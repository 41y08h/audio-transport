import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedPage: FC = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <>
      {currentUser ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </>
  );
};

export default ProtectedPage;
