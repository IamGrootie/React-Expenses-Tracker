import React, { useState, useEffect } from "react";
import "./ExpenseCard.css";
import addImage from "../../images/add-image.svg";

function ExpenseCard(props) {
 
  const expenseElements = props.expense.map((expenseData, index) => (
    <div className="expense-card-container" key={expenseData.id}>
      <div className="card-element name-business-container">
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

  return <>{expenseElements}</>;
}

export default ExpenseCard;
