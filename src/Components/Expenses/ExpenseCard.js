import React, { useState, useEffect } from "react";
import "./ExpenseCard.css";
import addImage from "../../images/add-image.svg";
import CategoryImage from "./CategoryImage";

function ExpenseCard(props) {

  const expenseElements = props.expense.map((expense) => (
    
    <div className="expense-card-container" key={expense.id}>
      <div className="card-element name-business-container">
        <h5 className="expense-card-text">{expense.title}</h5>
        <h6 className="expense-card-subtext">{expense.company}</h6>
      </div>
      <div className="card-element type">
        <div className="type-image-container">
        <CategoryImage key={expense.id} addExpense={expense}/>
        </div>
        <h5 className="expense-card-text type">{expense.category}</h5>
      </div>
      <div className="card-element">
        <h5 className="expense-card-text amount">{`${expense.currency}${expense.amount}`}</h5>
      </div>
      <div className="card-element date-container">
        {/* FIX THIS SO THAT DATE AND TIME ARE RENDERED */}
        <h5 className="expense-card-text">{expense.date}</h5>
      </div>
      <div className="card-element">
        <h5 className="expense-card-text invoice">{expense.id}</h5>
      </div>
      <div className="card-element">
        <button className="edit-button">Edit</button>
      </div>
    </div>
  ));

  return <>{expenseElements}</>;
}

export default ExpenseCard;
