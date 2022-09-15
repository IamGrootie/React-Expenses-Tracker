import React, { useState, useEffect } from "react";
import "./CreateExpense.css";
import { serverTimestamp } from "firebase/firestore";
import CategoryImage from "./CategoryImage";

export default function CreateExpense(props) {
  const { title, company, amount, category, date, recurring } =
    props.currentExpense;

  const [data, setData] = useState({
    title: title || "",
    company: company || "",
    amount: amount || "",
    category: category || "",
    date: date || "",
    createdAt: serverTimestamp(),
    recurring: recurring || false,
  });

  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    checkForErrors();
  }, [data]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const error = checkForErrors();
    if (!error) props.handleClick(data);
    setData({
      title: "",
      company: "",
      amount: "",
      category: "",
      date: "",
      recurring: false,
    });
    handleCreateExpenseModalClose();
  }

  function checkForErrors() {
    for (let item in data) {
      if (data[item] === "") {
        setDisableSubmit(true);
        return true;
      } else {
        setDisableSubmit(false);
      }
    }
  }

  function handleCreateExpenseModalClose() {
    props.setDisplayCreateExpense(false);
  }

  return (
    <section
      className={
        props.toggleDarkMode
          ? "create-expense-background dark"
          : "create-expense-background"
      }
    >
      <form
        className="create-expense-form-container"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="create-expense-header-container">
          <h3 className="create-expense-header">
            {props.currentExpense ? "Edit Expense" : "Create New Expense"}
          </h3>
          
        </div>
        <div className="form-element span-two">
          <input
            type="text"
            name="title"
            value={data.title}
            placeholder="Name of expense"
            maxLength="20"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="form-element span-two">
          <input
            type="text"
            name="company"
            value={data.company}
            placeholder="Company"
            maxLength="20"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="form-element span-two">
          <input
            name="amount"
            type="number"
            value={data.amount}
            placeholder="Amount"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="form-element span-two">
          <select
            className="select-type"
            name="category"
            defaultValue={data.category}
            onChange={handleChange}
            required
          >
            <option defaultValue="" hidden>
              Category
            </option>
            <option>Entertainment</option>
            <option>Food</option>
            <option>General</option>
            <option>Healthcare</option>
            <option>Household</option>
            <option>Housing</option>
            <option>Insurance</option>
            <option>Investing</option>
            <option>Mobile</option>
            <option>Payment</option>
            <option>Personal</option>
            <option>Savings</option>
            <option>Subscriptions</option>
            <option>Transport</option>
            <option>Withdraw</option>
          </select>
        </div>
        <div className="form-element">
          <input
            className="form-date-input"
            type="date"
            name="date"
            value={data.date}
            min="2021-01-01"
            max="2023-01-01"
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="form-element checkbox">
          <label className="checkbox-input-text">
            <input
              className="checkbox-input"
              type="checkbox"
              name="recurring"
              checked={data.recurring}
              onChange={handleChange}
            ></input>
            Recurring
          </label>
        </div>
        <label className="add-image-container">
          <CategoryImage key={data.id} expenseCategory={data.category} />
        </label>

        {disableSubmit ? (
          <button
            className="add-expense span-two disabled"
            type="submit"
            disabled
          >
            Add Expense
          </button>
        ) : (
          <button className="add-expense span-two" type="submit">
            Add Expense
          </button>
        )}
      </form>
    </section>
  );
}
