import React from "react";
import "./Filters.css";

export default function Filters({ expense }) {
	return (
		<div className="filter-form-container">
			<form className="filter-form">
				<div className="form-element">
					<select className="filter-select">
						<option>Name/Business</option>
						<option>pull data from firestore 'Title'</option>
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
			</form>
		</div>
	);
}
