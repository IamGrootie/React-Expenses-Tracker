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

export default function CategoryImage(props) {
  return (
    <>
      {props.expenseCategory === "Entertainment" && (
        <img src={Entertainment} className="add-image" />
      )}

      {props.expenseCategory === "Food" && (
        <img src={Food} className="add-image" />
      )}

      {props.expenseCategory === "General" && (
        <img src={generalIcon} className="add-image" />
      )}

      {props.expenseCategory === "Healthcare" && (
        <img src={healthcareIcon} className="add-image" />
      )}

      {props.expenseCategory === "Household" && (
        <img src={householdIcon} className="add-image" />
      )}

      {props.expenseCategory === "Housing" && (
        <img src={housingIcon} className="add-image" />
      )}

      {props.expenseCategory === "Insurance" && (
        <img src={insuranceIcon} className="add-image" />
      )}

      {props.expenseCategory === "Investing" && (
        <img src={investingIcon} className="add-image" />
      )}

      {props.expenseCategory === "Mobile" && (
        <img src={mobileIcon} className="add-image" />
      )}

      {props.expenseCategory === "Payment" && (
        <img src={paymentIcon} className="add-image" />
      )}

      {props.expenseCategory === "Personal" && (
        <img src={personalIcon} className="add-image" />
      )}

      {props.expenseCategory === "Savings" && (
        <img src={savingsIcon} className="add-image" />
      )}

      {props.expenseCategory === "Subscriptions" && (
        <img src={subscriptionsIcon} className="add-image" />
      )}

      {props.expenseCategory === "Transport" && (
        <img src={transportIcon} className="add-image" />
      )}

      {props.expenseCategory === "Withdraw" && (
        <img src={withdrawIcon} className="add-image" />
      )}

      {!props.expenseCategory && <img src={addImage} />}
    </>
  );
}
