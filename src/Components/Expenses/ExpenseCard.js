import React, { useState, useEffect } from "react";
import "./ExpenseCard.css";
import addImage from "../../images/add-image.svg";
import CategoryImage from "./CategoryImage";
import { useNavigate } from "react-router-dom";
import "./CreateExpense.css";
import { nanoid } from "nanoid";
import { db } from "../../firebase-config";
import {
  addDoc,
  doc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

function ExpenseCard(props) {
  const [edit, setEdit] = useState(false);

	const currentDate = new Date().toISOString().substring(0, 10);

  const [expenseData, setExpenseData] = useState({
  //   title: title || "",
  //   company: company || "",
  //   currency: currency || "",
  //   amount: amount || "",
  //   category: category || "",
  //   date: date || currentDate,
  //   createdAt: serverTimestamp(),
  //   recurring: reccuring || "false"
  });

  const [addExpenseError, setAddExpenseError] = useState({
    title: false,
    amount: false,
  });

  const navigate = useNavigate();
  const expenseRef = collection(db, "expense");

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


  // Checks the amount is a valid input (requires numbers, thousands separators, two digit fraction, cents/pence optional)



  //CREATE FUNCTION THAT SELECTS SPECIFIC CARD DEPENDING ON INVOICE ID FOR THE EDIT BUTTON BEING CLICKED
  function handleChange(event) {
    const { name, value } = event.target;
    setExpenseData(prevExpense => ({
      ...prevExpense,
      [name]: value,
    }));
  }

  

  const handleSubmit = async event => {
    event.preventDefault();
    // if (!addExpenseError.title && !addExpenseError.amount) {
    const expenseRef = doc(db, "expense", );

    updateDoc(expenseRef, {
      title: expenseData.title,
      company: expenseData.company,
      currency: expenseData.currency,
      amount: expenseData.amount,
      category: expenseData.category,
      date: expenseData.date,
      recurring: expenseData.recurring,
    });
    // }
    setEdit(false);
  };
  
  

  return (
    <div key={props.invoice}>
      <form
        className={!edit ? "expense-card-container" : "edit-selected"}
        onSubmit={event => handleSubmit(event)}
      >
        <div className="card-element name-business-container">
          <input
            className={!edit ? "expense-card-text" : "expense-card-text edit"}
            disabled={!edit}
            value={props.title}
            onChange={handleChange}
          ></input>
          <input
            className={
              !edit ? "expense-card-subtext" : "expense-card-subtext edit"
            }
            disabled={!edit}
            placeholder={props.company}
            onChange={handleChange}
          ></input>
        </div>
        <div className="card-element type">
          <div className="type-image-container">
            <CategoryImage key={props.id} expenseCategory={props.category} />
          </div>
          <input
            className={
              !edit ? "expense-card-text type" : "expense-card-text edit type"
            }
            disabled={!edit}
            placeholder={props.category}
            onChange={handleChange}
          ></input>
        </div>
        <div className="card-element">
          <input
            className={
              !edit
                ? "expense-card-text amount"
                : "expense-card-text edit amount"
            }
            disabled={!edit}
            placeholder={`${props.currency}${props.amount}`}
            onChange={handleChange}
          ></input>
        </div>
        <div className="card-element date-container">
          <input
            className={!edit ? "expense-card-text" : "expense-card-text edit"}
            disabled={!edit}
            placeholder={props.date}
            onChange={handleChange}
          ></input>
        </div>
        <div className="card-element">
          <input
            className={
              !edit
                ? "expense-card-text invoice"
                : "expense-card-text edit invoice"
            }
            disabled
            value={props.invoice}
            onChange={handleChange}
          ></input>
        </div>
        <div className="card-element">
          {/* Edit = false, display edit button */}
          {!edit && (
            <button className="edit-button" onClick={() => setEdit(true)}>
              Edit
            </button>
          )}
          {/* Edit = true, display submit button */}
          {edit && (
            <button className="edit-button" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseCard;
