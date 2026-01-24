import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import POSSystem from "./Components/POSSystem";
import BillingInterface from "./Components/BillingInterface"; // ✅ NEW
import ProtectedRoute from "./Components/ProtectedRoute";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔐 Login */}
        <Route path="/" element={<Login />} />

        {/* 📊 Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 🧾 POS System (LEFT CLICK) */}
        <Route
          path="/pos/:tableName"
          element={
            <ProtectedRoute>
              <POSSystem />
            </ProtectedRoute>
          }
        />

        {/* 💳 Billing Interface (RIGHT CLICK) */}
        <Route
          path="/billing/:tableName"
          element={
            <ProtectedRoute>
              <BillingInterface />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
