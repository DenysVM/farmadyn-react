import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import EnglishPage from "./pages/EnglishPage";
import PrivacyPolicy from "./pages/PolicyPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/english" element={<EnglishPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
