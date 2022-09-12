import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import "./Header.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header(props) {
  const { currentUser, userDetails } = useAuth();
  const [title, setTitle] = useState("");
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

  return (
    <section
      className={
        props.toggleDarkMode ? "header-container dark" : "header-container"
      }
    >
      <h2 className="title">{title}</h2>
      <button className="profile-btn">
        <img src={currentUser.photoURL} className="display-picture" />
        <h3>{`${userDetails.firstName} ${userDetails.lastName}`}</h3>
      </button>
    </section>
  );
}
