import React from "react";
import { NavLink } from "react-router-dom";
import dashboardIcon from "../Images/dashboard-icon.svg";
import expensesIcon from "../Images/expenses-icon.svg";
import settingsIcon from "../Images/settings-icon.svg";
import Logo from "../Images/Logo.svg";
import logoutIcon from '../Images/logout-icon.svg';

import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <img className="logo" src={Logo} />
      <div className="nav-links">
        <NavLink to="/" className="navlink-dashboard">
          <img src={dashboardIcon} />
          Dashboard
        </NavLink>
        <NavLink to="Expenses" className="navlink-expenses">
          <img src={expensesIcon} />
          Expenses
        </NavLink>
        <NavLink to="Settings" className="navlink-settings">
          <img src={settingsIcon} /> Settings
        </NavLink>
      </div>
      <button className="logout-button"><img src={logoutIcon}/>
      Logout</button>
    </nav>
  );
}
