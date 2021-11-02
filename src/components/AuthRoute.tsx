import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const AuthRoute: FC<RouteProps> = (props) => {
  const { currentUser } = useAuth();

  if (currentUser) return <Route {...props} />;
  return <Redirect to="/" />;
};

export default AuthRoute;
