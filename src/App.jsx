import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import EnglishPage from "./pages/EnglishPage";
import PolicyPage from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="app-shell">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/english" element={<EnglishPage />} />
        <Route path="/privacy-policy" element={<PolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
