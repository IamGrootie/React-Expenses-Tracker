import React, { useState, useEffect } from "react";
import "./ExpenseCard.css";
import CategoryImage from "./CategoryImage";
import { useNavigate } from "react-router-dom";
import "./CreateExpense.css";
import { db } from "../../firebase-config";
import { useExpenses } from "../../Contexts/ExpensesContext";

import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";

function ExpenseCard(props) {
  const currentDate = new Date().toISOString().substring(0, 10);

  // data.title works
  const [data, setData] = useState({
    title: props.title || "",
    company: props.company || "",
    currency: props.currency || "",
    amount: props.amount || "",
    category: props.category || "",
    date: props.date || currentDate,
    invoice: props.invoice,
    createdAt: serverTimestamp(),
    recurring: props.recurring || false,
  });
  console.log(props.recurring);
  // const [addExpenseError, setAddExpenseError] = useState({
  //   title: false,
  //   amount: false,
  // });
  console.log(data.recurring);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const navigate = useNavigate();
  const expenseRef = collection(db, "expense");

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  useEffect(() => {}, [data]);

  // Allows lower case, uppercase, numbers and underscores
  // function titleChecker() {
  //   if (data.title !== "")
  //     setAddExpenseError(prevError => ({
  //       ...prevError,
  //       title: !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]$/i.test(data.title),
  //     }));
  // }

  // Checks the amount is a valid input (requires numbers, thousands separators, two digit fraction, cents/pence optional)
  // function amountChecker() {
  //   if (data.amount !== "")
  //     setAddExpenseError(prevError => ({
  //       ...prevError,
  //       amount:
  //         !/^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/.test(
  //           data.amount
  //         ),
  //     }));
  // }

  useEffect(() => {
    checkForErrors();
    //   titleChecker();
    //   amountChecker();
  }, [data]);

  function handleSubmit(event) {
    event.preventDefault();
    // if (!addExpenseError.title && !addExpenseError.amount) {

    const error = checkForErrors();
    if (!error) props.handleClick(data);

    // props.setSort([...props.prevSort]);
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

  // function handleEdit(event) {
  // 	event.preventDefault();
  // 	if (data.invoice === props.currentExpenseId) {
  // 		props.edit(event, data.invoice);
  // 		props.setEditExpense(true)
  // 	}
  // }

  function handleDisable() {
    if (props.currentExpenseId !== data.invoice) {
      return;
    }
  }

  return (
    <div
      className={props.toggleDarkMode ? "expense-card dark" : "expense-card"}
    >
      <form
        className={props.class}
        onSubmit={(event) => props.handleClick(event)}
      >
        {props.title && (
          <div className="card-element name-business-container">
            <input
              className={
                !props.editExpense
                  ? "expense-card-text business"
                  : "expense-card-text edit business"
              }
              disabled={!props.editExpense}
              name="title"
              value={data.title}
              maxLength="20"
              placeholder="Name of expense"
              onChange={handleChange}
              required
            ></input>
            <input
              className={
                !props.editExpense
                  ? "expense-card-subtext company"
                  : "expense-card-subtext edit company"
              }
              disabled={!props.editExpense}
              name="company"
              value={data.company}
              maxLength="20"
              placeholder="Business"
              onChange={handleChange}
              required
            ></input>
          </div>
        )}
        {props.category && (
          <div className="card-element category">
            <div className="category-image-container">
              <CategoryImage key={props.id} expenseCategory={data.category} />
            </div>
            {!props.editExpense ? (
              <p className="expense-card-text category">{data.category}</p>
            ) : (
              <select
                className={
                  !props.editExpense
                    ? "expense-card-text category"
                    : "expense-card-text edit category"
                }
                disabled={!props.editExpense}
                name="category"
                defaultValue={data.category}
                onChange={handleChange}
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
            )}
          </div>
        )}
        {props.amount && props.recurringExpenses ? (
          <div className="card-element amount recurring">
            <p className="selected-currency">
              {props.currency} {props.amount}
            </p>
            {/* className="expense-card-text amount" */}
          </div>
        ) : props.amount ? (
          <div className="card-element amount">
            <span className="selected-currency">{props.currency}</span>
            <input
              className={
                !props.editExpense
                  ? "expense-card-text amount"
                  : "expense-card-text edit amount"
              }
              disabled={!props.editExpense}
              name="amount"
              type="tel"
              maxlength="10"
              defaultValue={data.amount}
              placeholder="Amount"
              onChange={handleChange}
              required
            ></input>
          </div>
        ) : (
          ""
        )}
        {props.date && (
          <div className="card-element date-container">
            <input
              className={
                !props.editExpense
                  ? "expense-card-text date"
                  : "expense-card-text edit date"
              }
              disabled={!props.editExpense}
              name="date"
              type="date"
              value={data.date}
              min="2021-01-01"
              max="2023-01-01"
              onChange={handleChange}
              required
            ></input>
          </div>
        )}
        {props.recurringExpense && (
          <div className="card-element checkbox">
            <input
              className={
                !props.editExpense
                  ? "expense-card-text checkbox-input"
                  : "expense-card-text edit checkbox-input"
              }
              disabled={!props.editExpense}
              type="checkbox"
              name="recurring"
              checked={data.recurring}
              onChange={handleChange}
            ></input>
          </div>
        )}
        {props.invoice && (
          <div className="card-element invoice">
            <p className="expense-card-text invoice">{data.invoice}</p>
          </div>
        )}
        {props.edit && (
          <div className="card-element button-container">
            {/* Edit = false, display edit button */}
            {!props.editExpense && (
              <button
                type="button"
                className="action-button"
                onClick={(event) => props.edit(event, data.invoice)}
              >
                Edit
              </button>
            )}

            {props.editExpense && !disableSubmit ? (
              <button className="action-button" onClick={handleSubmit}>
                Submit
              </button>
            ) : props.editExpense && disableSubmit ? (
              <button className="action-button disabled" onClick={handleSubmit}>
                Submit
              </button>
            ) : null}

            {props.editExpense && (
              <button
                className="action-button"
                value="Delete"
                onClick={(e) => {
                  e.preventDefault();
                  props.handleDelete();
                }}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default ExpenseCard;
