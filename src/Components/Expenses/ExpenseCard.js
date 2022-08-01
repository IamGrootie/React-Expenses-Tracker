import React from "react";
import "./ExpenseCard.css";
import addImage from "../../images/add-image.svg";

function ExpenseCard() {
  return (
    <div className="expense-card-container">
      <div className="name-business-container">
        <h5>Insert Title Here</h5>
        <h6>Insert Business Here</h6>
      </div>
      <div className="type-image-container">
        <img src={addImage} />
        <h5>Insert Type Here</h5>
      </div>
      <h5>Insert Amount Here</h5>
      <div className="date-container">
        <h5>Insert Data Here</h5>
        <h6>Insert Time Here</h6>
      </div>
      <h5>Insert Invoice ID Here</h5>
      <button className="edit-button">Edit</button>
    </div>
  );
}

export default ExpenseCard;
