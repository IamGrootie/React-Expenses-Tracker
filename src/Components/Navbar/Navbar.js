import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import dashboardIcon from "../../images/dashboard-icon.svg";
import expensesIcon from "../../images/expenses-icon.svg";
import settingsIcon from "../../images/settings-icon.svg";
import Logo from "../../images/Logo.svg";
import LogoDarkM from "../../images/Logo-white.svg";
import logoutIcon from "../../images/logout-icon.svg";
import lightMode from "../../images/lightMode.svg";
import darkMode from "../../images/darkMode.svg";
import menuDark from "../../images/menuDark.svg";
import menuLight from "../../images/menuLight.svg";
import "./Navbar.css";

export default function Navbar(props) {
  const navigate = useNavigate();

  const { currentUser, logout } = useAuth();

  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch {
      setError("Logout failed");
    }
  };

  const [title, setTitle] = React.useState("");
  const location = useLocation();

  useEffect(() => {
    setTitle(updateTitle());
  }, [location]);

  function updateTitle() {
    switch (window.location.pathname) {
      case "/settings":
        return "Settings";
      case "/expenses":
        return "Expenses";
      default:
        return "Dashboard";
    }
  }

  const [showNav, setShowNav] = useState(false);
  function handleShow(e) {
    setShowNav(prev => !prev);
  }

  return (
    <div
      className={props.toggleDarkMode ? "nav-container dark" : "nav-container"}
    >
      <div className="desktop-version">
        <nav>
          <img className="logo" src={props.toggleDarkMode ? LogoDarkM : Logo} />
          <div className="nav-links">
            <NavLink to="/" className="navlink-dashboard">
              <img src={dashboardIcon} />
              Dashboard
            </NavLink>
            <NavLink to="/expenses" className="navlink-expenses">
              <img src={expensesIcon} />
              Expenses
            </NavLink>
            <NavLink to="/settings" className="navlink-settings">
              <img src={settingsIcon} />
              Settings
            </NavLink>
          </div>
          <button onClick={props.handleDark} className="dark-btn">
            <img
              src={props.toggleDarkMode ? darkMode : lightMode}
              className="toggle"
            />
          </button>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          <img src={logoutIcon} />
          Log out
        </button>
      </div>

      <div className="mobile">
        <section className="mobile-header">
          <button className="expand-icon" onClick={handleShow}>
            <img src={props.toggleDarkMode ? menuDark : menuLight} />
          </button>
          <h2 className="title">{title}</h2>
        </section>
        <div className={showNav ? "nav-links mobile-nav" : "mobile-nav-hidden"}>
          <NavLink to="/" className="navlink-dashboard" onClick={handleShow}>
            <img src={dashboardIcon} />
            Dashboard
          </NavLink>
          <NavLink
            to="/expenses"
            className="navlink-expenses"
            onClick={handleShow}
          >
            <img src={expensesIcon} />
            Expenses
          </NavLink>
          <NavLink
            to="/settings"
            className="navlink-settings"
            onClick={handleShow}
          >
            <img src={settingsIcon} />
            Settings
          </NavLink>
          <section className="nav-footer">
            <button className="logout-button" onClick={handleLogout}>
              <img src={logoutIcon} />
              Log out
            </button>
            <button onClick={props.handleDark} className="dark-btn">
              <img
                src={props.toggleDarkMode ? darkMode : lightMode}
                className="toggle"
              />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
