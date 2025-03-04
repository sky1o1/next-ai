import { Navigate } from "react-router-dom";

const isUserAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

const PublicRoute = ({ element }) => {
  return isUserAuthenticated() ? <Navigate to="/" /> : element;
};

export default PublicRoute;
