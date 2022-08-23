import React, { useEffect } from "react";
import { useState } from "react";
import { useExpenses } from "../../Contexts/ExpensesContext";
import "./Filters.css";

export default function Filters(props) {
	const { sort, setSort } = useExpenses();
	console.log(sort[1]);
	const [nameBusinessArray, setNameBusinessArray] = useState([]);

	function handleClick(event) {
		const { name } = event.target;
		setSort((prevSort) => {
			return prevSort[0] !== name
				? [name, "asc"]
				: prevSort[1] === "asc"
				? [name, "desc"]
				: [name, "asc"];
		});
	}
	useEffect((expensesArr) => {});

	return (
		<div className="input-titles">
			<button className="category-btn">NAME/BUSINESS</button>
			<button className="category-btn">CATEGORY</button>
			<button className="category-btn">AMOUNT</button>
			<button className="category-btn">DATE</button>
			<button className="category-btn">INVOICE ID</button>
			<button className="category-btn">ACTION</button>
		</div>
	);
}

{
	/* <form className="filter-form">
				<div className="form-element">
					<select className="filter-select">
						<option>Name/Business</option>
						<option>{props.expensesArr.title}</option>
					</select>
				</div>
				<div className="form-element">
					<select className="filter-select">
						<option>Category</option>
						<option>pull data from firestore 'Type'</option>
					</select>
				</div>
				<div className="form-element">
					<select className="filter-select">
						<option>Amount</option>
						<option>pull data from firestore 'Amount'</option>
					</select>
				</div>
				<div className="form-element">
					<select className="filter-select">
						<option>Date</option>
						<option>pull data from firestore 'Date'</option>
					</select>
				</div>
				<div className="form-element">
					<label className="checkbox-input-text">
						<input
							className="checkbox-input"
							type="checkbox"
							name="recurring"
						></input>
						Recurring
					</label>
				</div>
			</form> */
}
