import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import searchIcon from "../../images/search-icon.svg";
import createExpenseIcon from "../../images/create-expense-icon.svg";
import filterIcon from "../../images/filter-icon.svg";
import "./Expenses.css";
import CreateExpense from "./CreateExpense";
import Filters from "./Filters";
import ExpenseCard from "./ExpenseCard";
import { useExpenses } from "../../Contexts/ExpensesContext";
import { useAuth } from "../../Contexts/AuthContext";
import Header from "../Header/Header";

export default function Expenses() {
  const { currentUser } = useAuth();
  const { expenses, createExpense, updateExpense, deleteExpense, setSort } =
    useExpenses();
  const [editExpense, setEditExpense] = useState(false);
  const [search, setSearch] = useState();
  const [currentExpenseId, setCurrentExpenseId] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState("");

  function handleInput(event) {
    const { value } = event.target;
    setSearch(value);
    if (value) {
      setFilteredExpenses(expenses.filter(item => item.title.includes(value)));
    } else setFilteredExpenses(expenses);
  }

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  const expensesArr = filteredExpenses.map(expense => (
    <ExpenseCard
      category={expense.category}
      key={expense.invoice}
      title={expense.title}
      company={expense.company}
      currency={expense.currency}
      amount={expense.amount}
      date={expense.date}
      invoice={expense.invoice}
      edit={edit}
      currentExpense={currentExpense}
      currentExpenseId={currentExpenseId}
      editExpense={editExpense}
      setEditExpense={setEditExpense}
      handleClick={handleSubmit}
      handleDelete={handleDelete}
      setSort={setSort}
      class="expense-expenses"
    />
  ));

  async function edit(event, id) {
    event.stopPropagation();
    setCurrentExpenseId(id);
    setCurrentExpense(expenses.find(expense => expense.invoice === id));
    // console.log(currentExpenseId);
    setEditExpense(true);
  }
  // console.log(editExpense);
  // console.log(currentExpenseId);

  // SORT OUT REGEX FOR EDITING

  async function handleSubmit(data) {
    console.log("working");
    const id = `MGL${nanoid(7)}`;
    const invoice = {
      invoice: id,
    };

    const expenseData = {
      title: data.title,
      company: data.company,
      currency: data.currency,
      amount: data.amount,
      category: data.category,
      date: data.date,
      recurring: data.recurring,
    };
    console.log(expenseData);
    if (!currentExpenseId) {
      await createExpense(id, { ...expenseData, ...invoice });
      console.log("made new expense");
    } else {
      console.log("updating");
      updateExpense(currentExpenseId, expenseData);
      console.log("updated");
      setCurrentExpense("");
      setCurrentExpenseId("");
      setEditExpense(false);
    }
  }

  async function handleDelete() {
    await deleteExpense(currentExpenseId);
    setCurrentExpense("");
    setCurrentExpenseId("");
    setEditExpense(false);
    setSort(["date", "asc"]);
  }

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
          <CreateExpense
            handleClick={handleSubmit}
            setDisplayCreateExpense={setDisplayCreateExpense}
            // handleInput={handleInput}
          />
        )}
        <Header />
        <div className="expenses-content">
          <div className="search-container">
            <div className="search-bar">
              <img src={searchIcon} />
              <input
                className="search-input"
                type="text"
                placeholder="Search by name"
                value={search}
                onChange={handleInput}
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
            <Filters displayFilters={displayFilters} />
            <div className="expense-cards">{expensesArr}</div>
          </div>
        </div>
      </section>
    </>
  );
}
