import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../images/search-icon.svg";
import createExpenseIcon from "../../images/create-expense-icon.svg";
import filterIcon from "../../images/filter-icon.svg";
import "./Expenses.css";
import CreateExpense from "./CreateExpense";

export default function Expenses() {
  const [displayCreateExpense, setDisplayCreateExpense] = useState(false);
  const navigate = useNavigate();

  function handleCreateExpenseModal() {
    setDisplayCreateExpense(true);
    navigate("create-expense");
  }


  console.log(displayCreateExpense);
  return (
    <>
      <section className="expenses-container">
        {displayCreateExpense && (
          <CreateExpense displayCreateExpenseState={setDisplayCreateExpense} />
        )}

        <div className="expenses-content">
          <h2 className="expenses-title">Expenses</h2>
          <div className="search-container">
            <div className="search-bar">
              <img src={searchIcon} />
              <input
                className="search-input"
                type="text"
                placeholder="Search for specific transactions"
              ></input>
            </div>
            <div className="expense-buttons">
              {/* ADD FUNCTIONALITY SO ON CLICK IT OPENS CREATE EXPENSE*/}
              <button
                className="create-expense"
                onClick={handleCreateExpenseModal}
              >
                <img src={createExpenseIcon} />
                Create Expense
              </button>
              {/* ADD FUNCTIONALITY SO IT COMES UP WITH FILTERS */}
              <button className="filter-expenses">
                <img src={filterIcon} />
                Filters
              </button>
            </div>
          </div>
          <div className="expenses-table">
            <div className="input-titles">
              <p>NAME/BUSINESS</p>
              <p>TYPE</p>
              <p>AMOUNT</p>
              <p>DATA</p>
              <p>INVOICE ID</p>
              <p>ACTION</p>
            </div>
            <div className="expense"></div>
          </div>
        </div>
      </section>
    </>
  );
}
