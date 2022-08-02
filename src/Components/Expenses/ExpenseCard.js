import React from "react";
import "./ExpenseCard.css";
import addImage from "../../images/add-image.svg";

function ExpenseCard() {
  return (
    <div className="expense-card-container">
      <div className="card-element name-business-container">
        <h5 className="expense-card-text">Iphone 13 Pro MAX</h5>
        <h6 className="expense-card-subtext">Apple. Inc</h6>
      </div>
      <div className="card-element type">
      <div className="type-image-container">
        <img src={addImage} />
        </div>
        <h5 className="expense-card-text type">Subscriptions</h5>
      </div>
      <div className="card-element">
      <h5 className="expense-card-text amount">£1000.00</h5>
      </div>
      <div className="card-element date-container">
        <h5 className="expense-card-text">02/08/2022</h5>
        <h6 className="expense-card-subtext">at 8:00 PM</h6>
      </div>
      <div className="card-element">
      <h5 className="expense-card-text invoice">MGL0124877</h5>
      </div>
      <div className="card-element">
      <button className="edit-button">Edit</button>
      </div>
    </div>
  );
}

export default ExpenseCard;
