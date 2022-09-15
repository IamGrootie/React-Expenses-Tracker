import React, { useState, useEffect } from "react";
import "./ExpenseCard.css";
import CategoryImage from "./CategoryImage";
import "./CreateExpense.css";
import { serverTimestamp } from "firebase/firestore";

function ExpenseCard(props) {
  const currentDate = new Date().toISOString().substring(0, 10);

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

  const [disableSubmit, setDisableSubmit] = useState(false);

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  useEffect(() => {
    checkForErrors();
  }, [data]);

  function handleSubmit(event) {
    event.preventDefault();
    const error = checkForErrors();
    if (!error) props.handleClick(data);
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

  return (
    <div
      className={props.toggleDarkMode ? "expense-card dark" : "expense-card"}
    >
      <div className={props.class}>
        {props.title && (
          <div className="card-element name-business-container">
            <p className="expense-card-text business">{data.title}</p>
            <p className="expense-card-subtext company">{data.company}</p>
          </div>
        )}
        {props.category && (
          <div className="card-element category">
            <div className="category-image-container">
              <CategoryImage key={props.id} expenseCategory={data.category} />
            </div>
            <p className="expense-card-text category">{data.category}</p>
          </div>
        )}
        {props.amount && props.recurringExpenses ? (
          <div className="card-element amount recurring">
            <p className="selected-currency">
              {props.currency}
              {props.amount}
            </p>
          </div>
        ) : props.amount ? (
          <div className="card-element amount">
            <span className="selected-currency">{props.currency}</span>
            <p className="expense-card-text amount">{data.amount}</p>
          </div>
        ) : (
          ""
        )}
        {props.date && (
          <div className="card-element date-container">
            <p className="expense-card-text date">{data.date}</p>
          </div>
        )}
        {props.recurringExpense && (
          <div className="card-element checkbox">
            <input
              className="expense-card-text checkbox-input"
              disabled
              type="checkbox"
              name="recurring"
              checked={data.recurring}
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
            <button
              type="button"
              className="action-button"
              onClick={event => props.edit(event, data.invoice)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseCard;
