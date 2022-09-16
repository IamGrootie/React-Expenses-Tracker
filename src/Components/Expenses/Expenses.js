import React, { useState, useEffect } from "react";
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

export default function Expenses(props) {
  const { currentUser, updateUser, userDetails } = useAuth();
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

  const [data, setData] = useState({
    currency: userDetails.currency,
  });

  useEffect(() => {
    setData({
      currency: userDetails.currency,
    });
  }, [userDetails]);

  function handleChange(event) {
    const { name, value, checked, type } = event.target;
    setData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  const [error, setError] = "";

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    setSort(["date", "asc"]);
  }, [data]);

  const expensesArr = filteredExpenses.map(expense => (
    <ExpenseCard
      category={expense.category}
      key={expense.invoice}
      title={expense.title}
      company={expense.company}
      currency={userDetails.currency}
      amount={expense.amount}
      date={expense.date}
      recurring={expense.recurring}
      recurringExpense
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
      toggleDarkMode={props.toggleDarkMode}
    />
  ));

  async function edit(event, id) {
    event.stopPropagation();
    setCurrentExpenseId(id);
    setCurrentExpense(expenses.find(expense => expense.invoice === id));
    setEditExpense(true);
    handleCreateExpenseModalOpen();
    setSort(["date", "asc"]);
  }

  async function handleCurrencyUpdate(e) {
    e.preventDefault();
    const { currency } = data;
    if (currency) {
      try {
        await updateUser({
          currency,
        });
      } catch (err) {
        setError("error");
      }
    }
  }

  async function handleSubmit(data) {
    const id = `MGL${nanoid(7)}`;
    const invoice = {
      invoice: id,
    };
    const expenseData = {
      title: data.title,
      company: data.company,
      amount: data.amount,
      category: data.category,
      date: data.date,
      createdAt: data.createdAt,
      recurring: data.recurring,
    };
    const { currency } = data;
    if (currency) {
      try {
        await updateUser({
          currency,
        });
      } catch (err) {
        setError("error");
      }
    }

    if (!currentExpenseId) {
      await createExpense(id, { ...expenseData, ...invoice });
    } else {
      updateExpense(currentExpenseId, expenseData);
      setCurrentExpense("");
      setCurrentExpenseId("");
      setEditExpense(false);
      setSort(["date", "asc"]);
    }
  }

  async function handleDelete() {
    await deleteExpense(currentExpenseId);
    setCurrentExpense("");
    setCurrentExpenseId("");
    setEditExpense(false);
    handleCreateExpenseModalClose();
    setSort(["date", "asc"]);
  }

  const [displayCreateExpense, setDisplayCreateExpense] = useState(false);
  const [displayFilters, setDisplayFilters] = useState(false);

  function handleCreateExpenseModalOpen() {
    setDisplayCreateExpense(true);
  }

  function handleCreateExpenseModalClose() {
    setDisplayCreateExpense(false);
    setCurrentExpense("");
    setCurrentExpenseId("");
  }

  function handleDisplayFilters() {
    setDisplayFilters(displayFilters => !displayFilters);
  }

  return (
    <>
      <section
        className={
          props.toggleDarkMode
            ? "expenses-container dark"
            : "expenses-container"
        }
      >
        {displayCreateExpense && (
          <CreateExpense
            handleClick={handleSubmit}
            handleCreateExpenseModal={setDisplayCreateExpense}
            handleCreateExpenseModalClose={handleCreateExpenseModalClose}
            currentExpense={currentExpense}
            currentExpenseId={currentExpenseId}
            handleDelete={handleDelete}
            toggleDarkMode={props.toggleDarkMode}
          />
        )}
        <Header toggleDarkMode={props.toggleDarkMode} />
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
              <button
                className="create-expense"
                onClick={handleCreateExpenseModalOpen}
              >
                <img src={createExpenseIcon} />
                <p>Create Expense</p>
              </button>

              <button
                className="filter-expenses"
                onClick={handleDisplayFilters}
              >
                <img src={filterIcon} />
                <p>Filters</p>
              </button>

              <button
                className="update-currency"
                onClick={e => handleCurrencyUpdate(e)}
              >
                <select
                  className="currency-select"
                  name="currency"
                  value={data.currency}
                  onChange={handleChange}
                >
                  <option>£</option>
                  <option>$</option>
                  <option>€</option>
                </select>
                <p>Currency</p>
              </button>
            </div>
          </div>
          <div className="expenses-table">
            <Filters
              displayFilters={displayFilters}
              toggleDarkMode={props.toggleDarkMode}
              displayAll
            />
            <div className="expense-cards">{expensesArr}</div>
          </div>
        </div>
      </section>
    </>
  );
}
