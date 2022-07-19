import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div className="nav-links">
        <NavLink to="/" className="navlink-dashboard">Dashboard</NavLink>
        <NavLink to="/Expenses" className="navlink-expenses">Expenses</NavLink>
        <NavLink to="/Contact" className="navlink-contact">Dashboard</NavLink>
      </div>
    </nav>
  );
}
