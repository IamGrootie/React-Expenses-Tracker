import React from "react";
import { useEffect } from "react";
import "./dashboard.css";
import wallet from "../Images/wallet_icon.svg";
import greenWallet from "../../images/green_wallet_icon.svg";
import dailyWallet from "../../images/daily_wallet_icon.svg";
import expand from "../../images/expand_icon.svg";
import { useExpenses } from "../../Contexts/ExpensesContext";
import { Transaction } from "firebase/firestore";
import ExpenseCard from "../Expenses/ExpenseCard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
	const { expenses, setTimePeriod, expensesThroughTime, timePeriod, setSort } =
		useExpenses();

	const totalSpending = expensesThroughTime.reduce(
		(total, item) => total + +item.amount,
		0
	);

	const monthlySpending = expensesThroughTime.reduce(
		(total, item) => total + +item.amount,
		7
	);

	const dailySpending = expensesThroughTime.reduce(
		(total, item) => total + +item.amount,
		1
	);

	const recurringExpensesArr = expenses
		.filter((item) => item.recurring === true)
		.map((expense) => (
			<ExpenseCard
				key={expense.invoice}
				title={expense.title}
				company={expense.company}
				currency={expense.currency}
				amount={expense.amount}
				class="expense-dashboard-recurring"
			/>
		));

	const navigate = useNavigate();

	//Sort by recent transactions on load
	useEffect(() => {
		setSort(["date", "asc"]);
	}, [setSort]);

	return (
		<div className="dashboard-container">
			<nav className="navbar-container">
				<h1 className="title">Dashboard</h1>
				<button className="profile-btn">
					{/* // <img src=PROFILE PIC/>  */}
					<h3>NAME OF PROFILE-CHANGE</h3>
				</button>
			</nav>

			<div className="dash-container">
				<div className="resume-container">
					<section className="amounts-tab">
						<div className="amount-itm-total">
							<img src={greenWallet} alt="" />
							<div>
								<p className="amount-title">Total spending</p>
								<h2 className="amount-value">{`£${totalSpending}`}</h2>
							</div>
						</div>

						<div className="amount-itm">
							<img src={wallet} alt="" />
							<div>
								<p className="amount-title">Monthly spending</p>
								<h2 className="amount-value">{`£${totalSpending}`}</h2>
							</div>
						</div>

						<div className="amount-itm">
							<img src={dailyWallet} alt="" />
							<div>
								<p className="amount-title">Daily spending</p>
								<h2 className="amount-value">{`£${dailySpending}`}</h2>
							</div>
						</div>
					</section>

					<section className="graph-container">
						<h3 className="section-title">Working Capital</h3>
					</section>

					<section className="table-container">
						<div className="table-title">
							<h3 className="section-title">Recent Expenses</h3>
							<button className="expand-btn">
								View All
								<img src={expand} className="expand-icon" alt="" />
							</button>
						</div>

						<table>
							<tr>
								<th className="left">NAME/BUSINESS</th>
								<th>TYPE</th>
								<th>AMOUNT</th>
								<th>DATE</th>
							</tr>
							<tr>
								<td className="left">props.name.last</td>
								<td>props.type</td>
								<td>props.amount</td>
								<td>props.date</td>
							</tr>
							<tr>
								<td className="left">props.name.last</td>
								<td>props.type</td>
								<td>props.amount</td>
								<td>props.date</td>
							</tr>
							<tr className="last-line">
								<td className="left last-line">props.name.last</td>
								<td className="last-line">props.type</td>
								<td className="last-line">props.amount</td>
								<td className="last-line">props.date</td>
							</tr>
						</table>
					</section>
				</div>

				<div className="recurring-expenses-container">
					<div className="title-recurring-expenses">
						<h3 className="section-title">Recurring Expenses</h3>
						<button className="expand-btn">
							View All
							<img src={expand} className="expand-icon" alt="" />
						</button>
					</div>
					<div className="recurring-expenses-card">
						{recurringExpensesArr}
						{/* <div className="reccurring-expenses-card-expense">
							<img src={wallet} />
							<div className="reccurring-expenses-card-expense-text">
							recurringExpensesArr
								<p className="expense-card-text">Netlfix Subscription</p>
								<p className="expense-card-subtext">Netlfix</p>
							</div>
						</div>
						<p className="expense-card-text amount">£10</p> */}
					</div>
				</div>
			</div>
		</div>
	);
}
