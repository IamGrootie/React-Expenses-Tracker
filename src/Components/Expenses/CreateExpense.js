import React, { useState, useEffect } from "react";
import "./CreateExpense.css";
import addImage from "../../images/add-image.svg";
import { db } from "../../firebase-config";
import { addDoc, collection } from "firebase/firestore";
import entertainmentIcon from "../../images/type_icons/entertainment.svg";
import foodIcon from "../../images/type_icons/food.svg";
import generalIcon from "../../images/type_icons/general.svg";
import healthcareIcon from "../../images/type_icons/healthcare.svg";
import householdIcon from "../../images/type_icons/household.svg";
import housingIcon from "../../images/type_icons/housing.svg";
import insuranceIcon from "../../images/type_icons/insurance.svg";
import investingIcon from "../../images/type_icons/investing.svg";
import mobileIcon from "../../images/type_icons/mobile.svg";
import paymentIcon from "../../images/type_icons/payment.svg";
import personalIcon from "../../images/type_icons/personal.svg";
import savingsIcon from "../../images/type_icons/savings.svg";
import subscriptionsIcon from "../../images/type_icons/subscriptions.svg";
import transportIcon from "../../images/type_icons/transport.svg";
import withdrawIcon from "../../images/type_icons/withdraw.svg";
import Expenses from "./Expenses";

export default function CreateExpense(props) {
  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    recurring: false,
    image: "",
  });

  const [categoryImage, setCategoryImage] = useState(addImage);

  const expenseRef = collection(db, "expense");

  //FIGURE THIS OUT
  function iconSelector(event) {
    switch (expense.category) {
      case expense.category === "Entertainment":
        return setExpense(prevExpense => ({
          ...prevExpense,
          image: entertainmentIcon,
        }));
    }
  }

  function handleChange(event) {
    const { name, value, type, checked, image } = event.target;
    setExpense(prevExpense => ({
      ...prevExpense,
      [name]: type === "checkbox" ? checked : value,
    }));

    // if (expense.category == "Entertainment") {
    //   setExpense(() => {
    //     image: entertainmentIcon,
    //   });
    // }
    if (expense.category == "Entertainment") {
      setExpense(prevExpense => ({
        ...prevExpense,
        image: entertainmentIcon,
      }));
    }
  }

  console.log(expense.category);

  // const handlePreview = e => {
  //   let file = e.target.files[0];
  //   let reader = new FileReader();
  //   if (e.target.files.length === 0) {
  //     return;
  //   }
  //   reader.onloadend = e => {
  //     setExpense({
  //       image: [reader.result],
  //     });
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleSubmit = async event => {
    event.preventDefault();
    await addDoc(expenseRef, expense);
    setExpense({
      title: "",
      amount: "",
      category: "",
      date: "",
      recurring: false,
    });
  };


  return (
    <section className="create-expense-background">
      <form onSubmit={event => handleSubmit(event)}>
        <div className="create-expense-form-container">
          <button
            className="close-btn"
            onClick={() => props.closeDisplayCreateExpense(false)}
          >
            X
          </button>
          <div className="form-element span-two">
            <input
              type="text"
              name="title"
              value={expense.title}
              placeholder="Title"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-element span-two">
            <input
              type="text"
              name="amount"
              value={expense.amount}
              placeholder="Amount"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-element span-two">
            <select
              className="select-type"
              name="category"
              value={expense.category}
              onChange={handleChange}
              required
            >
              <option>Category</option>
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
              value={expense.date}
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
                checked={expense.recurring}
                onChange={handleChange}
              ></input>
              Recurring
            </label>
          </div>
          <label className="add-image-container">
            {expense.category === "Entertainment" ? (
              <img src={entertainmentIcon} className="add-image" />
            ) : expense.category === "Food" ? (
              <img src={foodIcon} className="add-image" />
            ) : expense.category === "General" ? (
              <img src={generalIcon} className="add-image" />
            ) : expense.category === "Healthcare" ? (
              <img src={healthcareIcon} className="add-image" />
            ) : expense.category === "Household" ? (
              <img src={householdIcon} className="add-image" />
            ) : expense.category === "Housing" ? (
              <img src={housingIcon} className="add-image" />
            ) : expense.category === "Insurance" ? (
              <img src={insuranceIcon} className="add-image" />
            ) : expense.category === "Investing" ? (
              <img src={investingIcon} className="add-image" />
            ) : expense.category === "Mobile" ? (
              <img src={mobileIcon} className="add-image" />
            ) : expense.category === "Payment" ? (
              <img src={paymentIcon} className="add-image" />
            ) : expense.category === "Personal" ? (
              <img src={personalIcon} className="add-image" />
            ) : expense.category === "Savings" ? (
              <img src={savingsIcon} className="add-image" />
            ) : expense.category === "Subscriptions" ? (
              <img src={subscriptionsIcon} className="add-image" />
            ) : expense.category === "Transport" ? (
              <img src={transportIcon} className="add-image" />
            ) : expense.category === "Withdraw" ? (
              <img src={withdrawIcon} className="add-image" />
            ) : (
              <img src={addImage} />
            )}
          </label>
          {/* KEEP BELOW FOR USE TO UPLOAD THEIR OWN IMAGE(s) TO FIREBASE AND PULL FROM THERE  */}
          {/* <label className="add-image-container">
            <img src={addImage} />
            <input type="file" className="add-image"></input>
          </label> */}
          <button className="add-expense span-two" type="submit">
            Add
          </button>
        </div>
      </form>
    </section>
  );
}
