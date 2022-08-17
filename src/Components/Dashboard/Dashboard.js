import React from "react";
import "./dashboard.css";
import wallet from "../Images/wallet_icon.svg";
import greenWallet from "../../images/green_wallet_icon.svg";
import dailyWallet from "../../images/daily_wallet_icon.svg";
import expand from "../../images/expand_icon.svg";

export default function Dashboard() {
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
								<h2 className="amount-value">props.total</h2>
							</div>
						</div>

						<div className="amount-itm">
							<img src={wallet} alt="" />
							<div>
								<p className="amount-title">Monthly spending</p>
								<h2 className="amount-value">props.monthly</h2>
							</div>
						</div>

						<div className="amount-itm">
							<img src={dailyWallet} alt="" />
							<div>
								<p className="amount-title">Daily spending</p>
								<h2 className="amount-value">props.daily</h2>
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
						<div className="reccurring-expenses-card-expense">
							<img src={wallet} />
							<div className="reccurring-expenses-card-expense-text">
								<p className="expense-card-text">Netlfix Subscription</p>
								<p className="expense-card-subtext">Netlfix</p>
							</div>
						</div>
						<p className="expense-card-text amount">£10</p>
					</div>
				</div>
			</div>
		</div>
	);
}
