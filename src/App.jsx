import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GoogleLogin from "./components/auth/GoogleLogin";
// import Dashboard from "./components/auth/jj"; // assuming jj is your dashboard component
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/auth/jj";
import ClientDashboard from "./components/client/clientDashboard";
import AuthRedirect from "./components/common/authRedirect";
import AdminDashboard from "./components/admin/adminDashboard";
import EmployeeDashboard from "./components/emp/EmployeeDashboard";

function App() {
  return (
    <React.Fragment>
      {/* Uncomment if using Toasts */}
      <ToastContainer
        position="top-center"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <AuthRedirect />
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<GoogleLogin />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/EmpDashboard" element={<EmployeeDashboard />} />

          {/* Dashboard page after login */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          {/* Add more routes here */}
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
