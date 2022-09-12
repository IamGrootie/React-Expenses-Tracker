import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateExpense.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import CategoryImage from "./CategoryImage";

export default function CreateExpense(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    company: "",
    // currency: "£",
    amount: "",
    category: "",
    date: "",
    createdAt: serverTimestamp(),
    recurring: false,
  });
  //FIGURE AT CREATED AT TIME & DATE THEN ORGANISE ORDERBY

  // const [addExpenseError, setAddExpenseError] = useState({
  //   title: false,
  //   amount: false,
  // });

  const [disableSubmit, setDisableSubmit] = useState(false);

  // Compares UID being generated in state with UIDs in FireStore and generates a new one if they match
  // DOES IT CHECK AGAINST USERS DATA OR WHOLE COLLECTION?
  // useEffect(() => {
  //   props.expense.map(expense => {
  //     if (expense.id === data.id) {
  //       data.id = `MGL${nanoid(7)}`;
  //       // console.log("Duplicate ID")
  //       // console.log(data.id)
  //     }
  //   });
  // }, [data.id]);

  // Allows lower case, uppercase, numbers and underscores
  // function titleChecker() {
  //   if (data.title !== "")
  //     setAddExpenseError(prevError => ({
  //       ...prevError,
  //       title: !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]$/i.test(data.title),
  //     }));
  //     setErrorMessage({name: "" })
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
  //     setErrorMessage({amount: "Invalid amount" })
  // }

  useEffect(() => {
    // titleChecker();
    // amountChecker();
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
    // setAddExpenseError("");
    // const isError = checkForErrors();
    // if (!addExpenseError.title && !addExpenseError.amount) {
    const error = checkForErrors();
    if (!error) props.handleClick(data);
    setData({
      title: "",
      company: "",
      // currency: "£",
      amount: "",
      category: "",
      date: "",
      recurring: false,
    });
    handleCreateExpenseModalClose();
    // }
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
        onSubmit={(event) => handleSubmit(event)}
      >
        <button className="close-btn" onClick={handleCreateExpenseModalClose}>
          X
        </button>
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
        {/* <div className="form-element">
          <select
            className="select-currency"
            name="currency"
            value={data.currency}
            onChange={handleChange}
          >
            <option>£</option>
            <option>$</option>
            <option>€</option>
          </select>
        </div> */}
        <div className="form-element span-two">
          <input
            type="number"
            name="amount"
            maxLength="10"
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
          {/* KEEP BELOW FOR USE TO UPLOAD THEIR OWN IMAGE(s) TO FIREBASE AND PULL FROM THERE  */}
          {/* <label className="add-image-container">
            <img src={addImage} />
            <input type="file" className="add-image"></input>
          </label> */}
        </label>
        {disableSubmit ? (
          <button className="add-expense span-two disabled" type="submit" disabled>
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
