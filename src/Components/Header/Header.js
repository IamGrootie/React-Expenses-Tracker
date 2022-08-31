import React from "react";
import { useAuth } from "../../Contexts/RequireAuth";
import "./Header.css";

export default function Header(props) {
  const { currentUser } = useAuth();

  return (
    <section className="header-container">
      <h1 className="title">Expenses</h1>
      <button className="profile-btn">
        {/* // <img src=PROFILE PIC/>  */}
        <h3>{currentUser.displayName}</h3>
      </button>
    </section>
  );
}
