import React from "react";
import { NavLink } from "react-router-dom";
import dashboardIcon from "../Images/dashboard-icon.png";
import expensesIcon from "../Images/expenses-icon.png";
import settingsIcon from "../Images/settings-icon.png";

import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-links">
        <NavLink to="/" className="navlink-dashboard">
          <img src={dashboardIcon} />
          Dashboard
        </NavLink>
        <NavLink to="Expenses" className="navlink-expenses">
        <img src={expensesIcon} />Expenses
        </NavLink>
        <NavLink to="Settings" className="navlink-settings">
        <img src={settingsIcon} /> Dashboard
        </NavLink>
      </div>
    </nav>
  );
}
