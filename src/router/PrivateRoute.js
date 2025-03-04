import React from "react";
import { Navigate } from "react-router-dom";

const isUserAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  }
  return false;
};

const PrivateRoute = ({ element }) => {
  return isUserAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
