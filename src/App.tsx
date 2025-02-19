import {} from "./firebase";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import P_dashboard from "./pages/P_dashboard";
import LoginPage from "./pages/Login_page";
import Contestant from "./pages/contestant.tsx";
import VoterSheet from "./pages/VoterSheet.tsx";
import Report from "./pages/report.tsx";
import Timings from "./pages/Timings.tsx";
import Qr_issue from "./pages/Qr_issue";
// import ViewTime from "./pages/ViewTime";
import AddOfficer from "./pages/AddOfficer.tsx";
import Footer from "./components/Footer";
import "./App.css";

import PrivateRoute from "./components/PrivateRoute";
import AboutUs from "./pages/AboutUs.tsx";
import ContactUs from "./pages/ContactUs.tsx";

function App() {
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem("userRole")
  );

  // Use effect to persist userRole in localStorage when it changes
  useEffect(() => {
    if (userRole) {
      localStorage.setItem("userRole", userRole);
    }
  }, [userRole]);

  // ProtectedRoute component to restrict access based on authentication status
  // const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  //   if (!userRole) {
  //     // If the user is not logged in, redirect to the login page
  //     return <Navigate to="/" replace />;
  //   }
  //   return children;
  // };

  return (
    // <>
    <div className="body-main">
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage setUserRole={setUserRole} />} />
        {/* about us page */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin-home" element={<Home />} />
          <Route path="/contestant" element={<Contestant />} />
          <Route path="/upload-voters" element={<VoterSheet />} />
          <Route path="/report" element={<Report />} />
          <Route path="/timings" element={<Timings />} />

          <Route path="/add-officer" element={<AddOfficer />} />

          {/* Presiding Officer Routes */}
          <Route path="/presiding-home" element={<P_dashboard />} />
          <Route path="/qr_issue" element={<Qr_issue />} />
        </Route>
      </Routes>
      <Footer
        style={{
          zIndex: "1",
        }}
      />
    </div>
    // </>
  );
}

export default App;
