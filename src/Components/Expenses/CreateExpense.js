import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateExpense.css";
import { nanoid } from "nanoid";
import { db } from "../../firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import CategoryImage from "./CategoryImage";

export default function CreateExpense(props) {
  const [data, setData] = useState({
    title: "",
    company: "",
    currency: "",
    amount: "",
    category: "",
    date: "",
    // createdAt: serverTimestamp(),
    recurring: false,
    image: "",
  });

  //FIGURE AT CREATED AT TIME & DATE THEN ORGANISE ORDERBY

  // const [addExpenseError, setAddExpenseError] = useState({
  //   title: false,
  //   amount: false,
  // });

  const navigate = useNavigate();
  // const expenseRef = collection(db, "expense");

  // Compares UID being generated in state with UIDs in FireStore and generates a new one if they match
  // DOES IT CHECK AGAINST USERS DATA OR WHOLE COLLECTION?
  // useEffect(() => {
  //   props.expense.map(expense => {
  //     if (expense.id === addExpense.id) {
  //       addExpense.id = `MGL${nanoid(7)}`;
  //       // console.log("Duplicate ID")
  //       // console.log(addExpense.id)
  //     }
  //   });
  // }, [addExpense.id]);

  // Allows lower case, uppercase, numbers and underscores
  // function titleChecker() {
  //   if (addExpense.title !== "")
  //     setAddExpenseError(prevError => ({
  //       ...prevError,
  //       title: !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]$/i.test(
  //         addExpense.title
  //       ),
  //     }));
  // }

  // Checks the amount is a valid input (requires numbers, thousands separators, two digit fraction, cents/pence optional)
  // function amountChecker() {
  //   if (addExpense.amount !== "")
  //     setAddExpenseError(prevError => ({
  //       ...prevError,
  //       amount:
  //         !/^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/.test(
  //           addExpense.amount
  //         ),
  //     }));
  // }

  // useEffect(() => {
  //   titleChecker();
  //   amountChecker();

  // }, [addExpense]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  console.log(data);
  // const handleSubmit = async event => {
  //   event.preventDefault();
  //   if (!addExpenseError.title && !addExpenseError.amount) {
  //     await addDoc(expenseRef, addExpense);
  //     setAddExpense({
  //       id: `MGL${nanoid(7)}`,
  //       title: "",
  //       company: "",
  //       currency: "£",
  //       amount: "",
  //       category: "",
  //       date: "",
  //       recurring: false,
  //       image: "",
  //     });
  //   }
  //   handleCreateExpenseModalClose();
  // };

  function handleSubmit(event) {
    event.preventDefault();

    // setAddExpenseError("");
    // const isError = checkForErrors();
    // if (!addExpenseError)
    props.handleClick(data);
    // handleCreateExpenseModalClose();
  }

  // function checkForErrors() {
  //   for (let item in addExpense) {
  //     if (addExpense[item] === "") {
  //       setAddExpenseError("You need to fill all of the information");
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  function handleCreateExpenseModalClose() {
    props.displayCreateExpenseState(false);
    navigate("/expenses");
  }

  return (
    <section className="create-expense-background">
      <form onSubmit={event => handleSubmit(event)}>
        <div className="create-expense-form-container">
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
            ></input>
          </div>
          <div className="form-element">
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
          </div>
          <div className="form-element span-two">
            <input
              type="text"
              name="amount"
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
          <button className="add-expense span-two" type="submit">
            Add
          </button>
        </div>
      </form>
    </section>
  );
}
