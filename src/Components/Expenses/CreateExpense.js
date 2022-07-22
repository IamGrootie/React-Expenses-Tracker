import React from "react";
import "./CreateExpense.css";
import addImage from "../../images/add-image.svg";

export default function CreateExpense() {
  return (
    <div className="create-expense-container">
      <form>
        <div className="create-expense-form-container">
          <div className="form-element span-two">
            
            <input type="text" name="title" placeholder="Title"></input>
            
          </div>
          <div className="form-element span-two">
            <input type="text" name="amount" placeholder="Amount"></input>
          </div>
          <div className="form-element span-two">
            <select className="select-type">
              <option>Type</option>
              <option>Debt</option>
              <option>Entertainment</option>
              <option>Food</option>f
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
              <option>Utilities</option>
              <option>Withdraw</option>
            </select>
            {/* <button className="type-button" type="dropdown" name="type"></button> */}
            <p></p>
          </div>
          <div className="form-element">
            <input className="form-date-input" type="date" name="date" min="2021-01-01" max="2030-01-01"></input>
          </div>
          <div className="form-element checkbox">
            <label className="checkbox-input-text">
                
              <input
                className="checkbox-input"
                type="checkbox"
                name="recurring"
              ></input>
              Recurring
            </label>
          </div>
          <button className="add-image">
            <img src={addImage} />
          </button>
          <button className="add-expense span-two">Add</button>
        </div>
      </form>
    </div>
  );
}
