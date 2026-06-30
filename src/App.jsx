import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreateInvoice from "./pages/create_invoice";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Home />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main app */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create_invoice" element={<CreateInvoice />} />
        <Route path="/create_invoice/:id" element={<CreateInvoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
