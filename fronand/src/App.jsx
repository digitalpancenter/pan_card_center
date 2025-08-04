import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./pages/Navbar";
import Index from "./pages/Index";
import Ekyc from "./pages/Ekyc";
import Business from "./pages/BusinessSection";
import ServicesSection from "./pages/ServicesSection";
import Pricing from "./pages/Pricing";
import ContactPage from "./pages/Contact";
import Footer from "./pages/Footer";
import Register from "./pages/Signup";
import Login from "./pages/Login";

import Profile from "./pages/Profile";
import AddMoney from "./pages/AddMoney";
import Transactions from "./pages/Transactions";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "./pages/DashboardLayout";
import RetailerDashboard from "./pages/RetailerDashboard";
import PanCard from "./pages/PanCard"; // adjust path if needed
import InterestPANApply from "./pages/InterestPANApply";
import InterestPANUpdate from "./pages/InterestPANUpdate";

//admin page 
import AdminDashboard from "./admin/AdminDashboard";
import AllUsers from "./admin/AllUsers";

const HomePage = () => (
  <>
    <Navbar />
    <Index />
    <Ekyc />
    <Business />
    <ServicesSection />
    <Pricing />
    <Footer />
  </>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><Register /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />

        {/* Protected Routes */}
        <Route
          path="/retailer-dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <RetailerDashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
     <Route
  path="/pan-card"
  element={
    <PrivateRoute>
      <DashboardLayout>
        <PanCard />
      </DashboardLayout>
    </PrivateRoute>
  }
/>
<Route
  path="/interest-pan-apply"
  element={
    <PrivateRoute>
      <DashboardLayout>
        <InterestPANApply />
      </DashboardLayout>
    </PrivateRoute>
  }
/>

<Route
  path="/interest-pan-update"
  element={
    <PrivateRoute>
      <DashboardLayout>
        <InterestPANUpdate />
      </DashboardLayout>
    </PrivateRoute>
  }
/>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/add-money"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <AddMoney />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Transactions />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard/all-users"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <AllUsers />
              </DashboardLayout>
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}
