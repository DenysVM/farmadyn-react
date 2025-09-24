import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home", subtitle: "PL" },
  { to: "/english", label: "English", subtitle: "EN" },
  { to: "/privacy-policy", label: "Privacy", subtitle: "Policy" },
  { to: "/contact", label: "Contact", subtitle: "Reach us" }
];

function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }

    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="site-header">
      <nav className="primary-nav" aria-label="Main navigation">
        <NavLink to="/" className="nav-logo" end>
          Farmadyn
        </NavLink>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((previousState) => !previousState)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
        <div
          id="primary-navigation"
          className={`nav-links${menuOpen ? " nav-links--open" : ""}`}
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    isActive ? "nav-link nav-link--active" : "nav-link"
                  }
                >
                  <span className="nav-link__label">{link.label}</span>
                  {link.subtitle && (
                    <span className="nav-link__subtitle">{link.subtitle}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavigationBar;
