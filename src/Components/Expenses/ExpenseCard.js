import React, { useState, useEffect } from "react";
import "./ExpenseCard.css";
import addImage from "../../images/add-image.svg";
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

function ExpenseCard(props) {
  const expenseRef = collection(db, "expense");
  const [expense, setExpense] = useState(() => []);

  useEffect(() => {
    onSnapshot(expenseRef, async () => {
      const data = await getDocs(expenseRef);
      const expenseArray = data.docs.map(doc => doc.data());
      setExpense(expenseArray);
    });
  }, []);

  const expenseElements = expense.map((expenseData, index) => (
    
      <div className="expense-card-container" key={expenseData.id}>
        <div
          className="card-element name-business-container"
         
        >
          <h5 className="expense-card-text">{expenseData.title}</h5>
          <h6 className="expense-card-subtext">Apple. Inc</h6>
        </div>
        <div className="card-element type">
          <div className="type-image-container">
            <img src={addImage} />
          </div>
          <h5 className="expense-card-text type">{expenseData.category}</h5>
        </div>
        <div className="card-element">
          <h5 className="expense-card-text amount">{expenseData.amount}</h5>
        </div>
        <div className="card-element date-container">
          {/* FIX THIS SO THAT DATE AND TIME ARE RENDERED */}
          <h5 className="expense-card-text">{expenseData.date}</h5>
          <h6 className="expense-card-subtext">{expenseData.date}</h6>
        </div>
        <div className="card-element">
          <h5 className="expense-card-text invoice">{expenseData.id}</h5>
        </div>
        <div className="card-element">
          <button className="edit-button">Edit</button>
        </div>
      </div>
    
  ));

  console.log(expense);
  console.log(expense.title);

  return <>{expenseElements}</>;
}

export default ExpenseCard;
