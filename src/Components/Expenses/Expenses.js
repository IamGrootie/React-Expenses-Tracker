import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../images/search-icon.svg";
import createExpenseIcon from "../../images/create-expense-icon.svg";
import filterIcon from "../../images/filter-icon.svg";
import "./Expenses.css";
import CreateExpense from "./CreateExpense";
import Filters from "./Filters";
import ExpenseCard from "./ExpenseCard";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";

export default function Expenses() {
  const expenseRef = collection(db, "expense");
  const [expense, setExpense] = useState(() => []);

  useEffect(() => {
    onSnapshot(expenseRef, async () => {
      const data = await getDocs(expenseRef);
      const expenseArray = data.docs.map(doc => doc.data());
      setExpense(expenseArray);
    });
  }, []);
  
  
  
  
  // 
  // 
  const [displayCreateExpense, setDisplayCreateExpense] = useState(false);
  const [displayFilters, setDisplayFilters] = useState(false);
  const navigate = useNavigate();

  function handleCreateExpenseModal() {
    setDisplayCreateExpense(true);
    navigate("create-expense");
  }

  function handleDisplayFilters() {
    setDisplayFilters(displayFilters => !displayFilters);
    // navigate("filters")
  }

  return (
    <>
      <section className="expenses-container">
        {displayCreateExpense && (
          <CreateExpense displayCreateExpenseState={setDisplayCreateExpense} expense={expense}/>
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
              <button
                className="filter-expenses"
                onClick={handleDisplayFilters}
              >
                <img src={filterIcon} />
                Filters
              </button>
            </div>
          </div>
          <div className="expenses-table">
            {displayFilters && (
              <Filters displayFiltersState={setDisplayFilters} />
            )}
            <div className="input-titles">
              <p>NAME/BUSINESS</p>
              <p>CATEGORY</p>
              <p>AMOUNT</p>
              <p>DATE</p>
              <p>INVOICE ID</p>
              <p>ACTION</p>
            </div>
            <div className="expense-cards">
            <ExpenseCard expense={expense}/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
