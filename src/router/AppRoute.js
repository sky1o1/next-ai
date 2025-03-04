import { Route, Routes } from "react-router-dom";
import { Chat, Login, Settings } from "../pages";
import { Dashboard } from "../pages/dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
      <Route path="/chat" element={<PrivateRoute element={<Chat />} />} />
      <Route
        path="/settings"
        element={<PrivateRoute element={<Settings />} />}
      />
    </Routes>
  );
};

export default AppRoute;
