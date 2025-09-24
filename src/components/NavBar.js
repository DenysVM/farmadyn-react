import React from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav>
      <Link to="/">Strona główna</Link>
      <Link to="/english">English Version</Link>
      <Link to="/privacy-policy">Polityka prywatności</Link>
      <Link to="/contact">Kontakt</Link>
    </nav>
  );
}

export default NavigationBar;