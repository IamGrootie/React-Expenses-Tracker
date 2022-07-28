import React from "react";
import {NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../auth'
import dashboardIcon from "../../images/dashboard-icon.svg";
import expensesIcon from "../../images/expenses-icon.svg";
import settingsIcon from "../../images/settings-icon.svg";
import Logo from "../../images/Logo.svg";
import logoutIcon from '../../images/logout-icon.svg';
import "./Navbar.css";


export default function Navbar() {
  const navigate = useNavigate();

  const {currentUser, logout} = useAuth();
  const [error, setError] = React.useState('');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch {
      setError('Logout failed');
    }
  }

  return (
    <div className="nav-container">
    <nav>
      <img className="logo" src={Logo} />
      <div className="nav-links">
        <NavLink to="/" className="navlink-dashboard">
          <img src={dashboardIcon} />
          Dashboard
        </NavLink>
        <NavLink to="expenses" className="navlink-expenses">
          <img src={expensesIcon} />
          Expenses
        </NavLink>
        <NavLink to="settings" className="navlink-settings">
          <img src={settingsIcon} /> Settings
        </NavLink>
      </div>
      
    </nav>
    <button 
      className="logout-button" 
      onClick={handleLogout}>
      <img src={logoutIcon}/>
      Log out
    </button>
    </div>
  );
}
