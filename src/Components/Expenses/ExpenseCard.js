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

  const [expenseData, setExpenseData] = useState({
    title: props.expense.recurring,
    company: props.expense.company,
    currency: props.expense.currency,
    amount: props.expense.amount,
    category: props.expense.category,
    date: props.expense.date,
    createdAt: serverTimestamp(),
    recurring: props.expense.recurring,
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
  function titleChecker() {
    if (expenseData.title !== "")
      setAddExpenseError(prevError => ({
        ...prevError,
        title: !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]$/i.test(
          expenseData.title
        ),
      }));
  }

  // Checks the amount is a valid input (requires numbers, thousands separators, two digit fraction, cents/pence optional)
  function amountChecker() {
    if (expenseData.amount !== "")
      setAddExpenseError(prevError => ({
        ...prevError,
        amount:
          !/^[+-]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/.test(
            expenseData.amount
          ),
      }));
  }

  useEffect(() => {
    titleChecker();
    amountChecker();
  }, [expenseData]);

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
  
  console.log(`expensedata.title ${expenseData.title}`)
  console.log(addExpenseError);
  console.log(props.expense);

  const expenseElements = props.expense.map(expense => (
    <div key={expense.id}>
      <form
        className={!edit ? "expense-card-container" : "edit-selected"}
        onSubmit={event => handleSubmit(event)}
      >
        <div className="card-element name-business-container">
          <input
            className={!edit ? "expense-card-text" : "expense-card-text edit"}
            disabled={!edit}
            placeholder={expense.title}
            onChange={handleChange}
          ></input>
          <input
            className={
              !edit ? "expense-card-subtext" : "expense-card-subtext edit"
            }
            disabled={!edit}
            placeholder={expense.company}
            onChange={handleChange}
          ></input>
        </div>
        <div className="card-element type">
          <div className="type-image-container">
            <CategoryImage key={expense.id} addExpense={expense} />
          </div>
          <input
            className={
              !edit ? "expense-card-text type" : "expense-card-text edit type"
            }
            disabled={!edit}
            placeholder={expense.category}
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
            placeholder={`${expense.currency}${expense.amount}`}
            onChange={handleChange}
          ></input>
        </div>
        <div className="card-element date-container">
          <input
            className={!edit ? "expense-card-text" : "expense-card-text edit"}
            disabled={!edit}
            placeholder={expense.date}
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
            value={expense.id}
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
  ));

  return <>{expenseElements}</>;
}

export default ExpenseCard;
