import React, { useState, useEffect } from "react";
import "./CreateExpense.css";
import addImage from "../../images/add-image.svg";

export default function CreateExpense() {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    type: "",
    date: "",
    recurring: "",
    image: ""
  })

  //figure out recurring checkbox event handler and type

  function handleChange(event) {
    const {name, value} = event.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      [name]: value
    }))
  }

  console.log(expense)
  return (
    <div className="create-expense-container">
      <form>
        <div className="create-expense-form-container">
          <div className="form-element span-two">
            <input type="text" name="title" placeholder="Title" onChange={handleChange}></input>
          </div>
          <div className="form-element span-two">
            <input type="text" name="amount" placeholder="Amount" onChange={handleChange}></input>
          </div>
          <div className="form-element span-two">
            <select className="select-type" required >
              <option>Type</option>
              <option>Debt</option>
              <option>Entertainment</option>
              <option>Food</option>
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
            <input
              className="form-date-input"
              type="date"
              name="date"
              min="2021-01-01"
              max="2030-01-01"
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
                
                required
              ></input>
              Recurring
            </label>
          </div>
          <button className="add-image" onChange={handleChange}>
            <img src={addImage} />
          </button>
          <button className="add-expense span-two">Add</button>
        </div>
      </form>
    </div>
  );
}
