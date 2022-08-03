import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateExpense.css";
import addImage from "../../images/add-image.svg";
import { nanoid, customAlphabet } from "nanoid";
import { db } from "../../firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
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

export default function CreateExpense(props) {
  const [addExpense, setAddExpense] = useState({
    id: `MGL${nanoid(7)}`,
    title: "",
    amount: "",
    category: "",
    date: "",
    recurring: false,
    image: "",
  });
  // Create Regex for max character lengths
  const [categoryImage, setCategoryImage] = useState(addImage);
  const navigate = useNavigate();
  const expenseRef = collection(db, "expense");

  // Compares UID being generated in state with UIDs in FireStore and generates a new one if they match
  useEffect(() => {
    props.expense.map((expenseData) => {
      if (expenseData.id === addExpense.id) {
        addExpense.id = `MGL${nanoid(7)}`
        // console.log("Duplicate ID")
        // console.log(addExpense.id)
      }
    })
  }, [addExpense.id])


  //FIGURE THIS OUT FOR SWITCH STATEMENT INSTEAD OF INLINE
  // function iconSelector(event) {
  //   switch (expense.category) {
  //     case expense.category === "Entertainment":
  //       return setExpense(prevExpense => ({
  //         ...prevExpense,
  //         image: entertainmentIcon,
  //       }));
  //   }
  // }

  function handleChange(event) {
    const { name, value, type, checked, image } = event.target;
    setAddExpense(prevAddExpense => ({
      ...prevAddExpense,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleSubmit = async event => {
    event.preventDefault();
    await addDoc(expenseRef, addExpense);
    setAddExpense({
      id: `MGL${nanoid(7)}`,
      title: "",
      amount: "",
      category: "",
      date: "",
      recurring: false,
    });
  };

  // add REGEX for Submit button that closes the modal
  function handleCreateExpenseModalClose() {
    props.displayCreateExpenseState(false);
    navigate("/expenses");
  }

  return (
    <section className="create-expense-background">
      <form onSubmit={event => handleSubmit(event)}>
        <div className="create-expense-form-container">
          <button className="close-btn" onClick={handleCreateExpenseModalClose}>
            X
          </button>
          <div className="form-element span-two">
            <input
              type="text"
              name="title"
              value={addExpense.title}
              placeholder="Title"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-element span-two">
            <input
              type="text"
              name="amount"
              value={addExpense.amount}
              placeholder="Amount"
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-element span-two">
            <select
              className="select-type"
              name="category"
              value={addExpense.category}
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
              value={addExpense.date}
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
                checked={addExpense.recurring}
                onChange={handleChange}
              ></input>
              Recurring
            </label>
          </div>
          <label className="add-image-container">
            {addExpense.category === "Entertainment" ? (
              <img src={entertainmentIcon} className="add-image" />
            ) : addExpense.category === "Food" ? (
              <img src={foodIcon} className="add-image" />
            ) : addExpense.category === "General" ? (
              <img src={generalIcon} className="add-image" />
            ) : addExpense.category === "Healthcare" ? (
              <img src={healthcareIcon} className="add-image" />
            ) : addExpense.category === "Household" ? (
              <img src={householdIcon} className="add-image" />
            ) : addExpense.category === "Housing" ? (
              <img src={housingIcon} className="add-image" />
            ) : addExpense.category === "Insurance" ? (
              <img src={insuranceIcon} className="add-image" />
            ) : addExpense.category === "Investing" ? (
              <img src={investingIcon} className="add-image" />
            ) : addExpense.category === "Mobile" ? (
              <img src={mobileIcon} className="add-image" />
            ) : addExpense.category === "Payment" ? (
              <img src={paymentIcon} className="add-image" />
            ) : addExpense.category === "Personal" ? (
              <img src={personalIcon} className="add-image" />
            ) : addExpense.category === "Savings" ? (
              <img src={savingsIcon} className="add-image" />
            ) : addExpense.category === "Subscriptions" ? (
              <img src={subscriptionsIcon} className="add-image" />
            ) : addExpense.category === "Transport" ? (
              <img src={transportIcon} className="add-image" />
            ) : addExpense.category === "Withdraw" ? (
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
