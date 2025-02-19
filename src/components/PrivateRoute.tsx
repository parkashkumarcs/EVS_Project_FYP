import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase"; // Import your Firebase auth object

const PrivateRoute = () => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render the child routes if the user is logged in
};

export default PrivateRoute;
