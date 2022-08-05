import React from "react";
import addImage from "../../images/add-image.svg";
import Entertainment from "../../images/type_icons/entertainment.svg";
import Food from "../../images/type_icons/food.svg";
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
import "./CreateExpense.css";

export default function CategoryImage({ addExpense }) {
  return (
    <>
      {addExpense.category === "Entertainment" && (
        <img src={Entertainment} className="add-image" />
      )}

      {addExpense.category === "Food" && (
        <img src={Food} className="add-image" />
      )}

      {addExpense.category === "General" && (
        <img src={generalIcon} className="add-image" />
      )}

      {addExpense.category === "Healthcare" && (
        <img src={healthcareIcon} className="add-image" />
      )}

      {addExpense.category === "Household" && (
        <img src={householdIcon} className="add-image" />
      )}

      {addExpense.category === "Housing" && (
        <img src={housingIcon} className="add-image" />
      )}

      {addExpense.category === "Insurance" && (
        <img src={insuranceIcon} className="add-image" />
      )}

      {addExpense.category === "Investing" && (
        <img src={investingIcon} className="add-image" />
      )}

      {addExpense.category === "Mobile" && (
        <img src={mobileIcon} className="add-image" />
      )}

      {addExpense.category === "Payment" && (
        <img src={paymentIcon} className="add-image" />
      )}

      {addExpense.category === "Personal" && (
        <img src={personalIcon} className="add-image" />
      )}

      {addExpense.category === "Savings" && (
        <img src={savingsIcon} className="add-image" />
      )}

      {addExpense.category === "Subscriptions" && (
        <img src={subscriptionsIcon} className="add-image" />
      )}

      {addExpense.category === "Transport" && (
        <img src={transportIcon} className="add-image" />
      )}

      {addExpense.category === "Withdraw" && (
        <img src={withdrawIcon} className="add-image" />
      )}

      {!addExpense.category && <img src={addImage} />}
    </>
  );
}
