import React from "react";
import searchIcon from "../Images/search-icon.svg";
import "./Expenses.css";

export default function Expenses() {
  return (
    <div container="expenses-container">
      <div className="expenses-content">
        <h2 className="expenses-title">Expenses</h2>
        <div className="search-bar-container">
          <img src={searchIcon} />
          <input
            className="search-input"
            type="text"
            placeholder="Search for specific transactions"
          ></input>
        </div>
      </div>
    </div>
  );
}
