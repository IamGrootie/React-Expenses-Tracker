import "./ExpenseCard.css";
import CategoryImage from "./CategoryImage";
import "./CreateExpense.css";

function ExpenseCard(props) {
  return (
    <div
      className={props.toggleDarkMode ? "expense-card dark" : "expense-card"}
    >
      <div className={props.class}>
        {props.title && (
          <div className="card-element name-business-container">
            <p className="expense-card-text business">{props.title}</p>
            <p className="expense-card-subtext company">{props.company}</p>
          </div>
        )}
        {props.category && (
          <div className="card-element category">
            <div className="category-image-container">
              <CategoryImage key={props.id} expenseCategory={props.category} />
            </div>
            <p className="expense-card-text category">{props.category}</p>
          </div>
        )}
        {props.amount && props.recurringExpenses ? (
          <div className="card-element amount recurring">
            <p className="selected-currency">
              {props.currency}
              <span className="selected-currency-span"></span>
              {props.amount}
            </p>
          </div>
        ) : props.amount ? (
          <div className="card-element amount">
            <span className="selected-currency">{props.currency}</span>
            <p className="expense-card-text amount">{props.amount}</p>
          </div>
        ) : (
          ""
        )}
        {props.date && (
          <div className="card-element date-container">
            <p className="expense-card-text date">{props.date}</p>
          </div>
        )}
        {props.recurringExpense && (
          <div className="card-element checkbox">
            <input
              className="expense-card-text checkbox-input"
              disabled
              type="checkbox"
              name="recurring"
              checked={props.recurring}
            ></input>
          </div>
        )}
        {props.invoice && (
          <div className="card-element invoice">
            <p className="expense-card-text invoice">{props.invoice}</p>
          </div>
        )}
        {props.edit && (
          <div className="card-element button-container">
            <button
              type="button"
              className="action-button"
              onClick={(event) => props.edit(event, props.invoice)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseCard;
