import React from "react";
import { useExpenses } from "../../Contexts/ExpensesContext";
import "./Filters.css";
import chevron from "../../images/chevron.svg";

export default function Filters(props) {
  const { sort, setSort } = useExpenses();
  // console.log(sort[1]);
  function handleClick(e) {
    const { name } = e.target;
    setSort((prevSort) => {
      return prevSort[0] !== name
        ? [name, "asc"]
        : prevSort[1] === "asc"
        ? [name, "desc"]
        : [name, "asc"];
    });
  }

  console.log(sort);
  return (
    <div
      className={
        props.toggleDarkMode && props.displayAll
          ? "input-titles-expenses dark"
          : props.displayAll
          ? "input-titles-expenses"
          : props.toggleDarkMode
          ? "input-titles dark"
          : "input-titles"
      }
    >
      <button
        className={
          props.displayFilters ? "category-btn" : "category-btn hidden"
        }
        name="title"
        disabled={!props.displayFilters}
        onClick={handleClick}
      >
        NAME/BUSINESS
        {props.displayFilters && (
          <img src={sort[0] === "title" ? chevron : null} className={sort[1]} />
        )}
      </button>
      <button
        className={
          props.displayFilters ? "category-btn" : "category-btn hidden"
        }
        name="company"
        disabled={!props.displayFilters}
        onClick={handleClick}
      >
        CATEGORY
        {props.displayFilters && (
          <img
            src={sort[0] === "company" ? chevron : null}
            className={sort[1]}
          />
        )}
      </button>
      <button
        className={
          props.displayFilters ? "category-btn" : "category-btn hidden"
        }
        name="amount"
        disabled={!props.displayFilters}
        onClick={handleClick}
      >
        AMOUNT
        {props.displayFilters && (
          <img
            src={sort[0] === "amount" ? chevron : null}
            className={sort[1]}
          />
        )}
      </button>
      <button
        className={
          props.displayFilters ? "category-btn" : "category-btn hidden"
        }
        name="date"
        disabled={!props.displayFilters}
        onClick={handleClick}
      >
        DATE
        <img
          src={sort[0] === "date" ? chevron : null}
          onClick={handleClick}
          className={sort[1]}
        />
      </button>

      {props.displayAll && (
        <>
          <button
            className={
              props.displayFilters ? "category-btn" : "category-btn hidden"
            }
            name="recurring"
            disabled={!props.displayFilters}
            onClick={handleClick}
          >
            RECURRING
            <img
              src={sort[0] === "recurring" ? chevron : null}
              onClick={handleClick}
              className={sort[1]}
            />
          </button>
          <button
            className={
              props.displayFilters
                ? "category-btn invoice"
                : "category-btn invoice hidden"
            }
            name="invoice"
            disabled={!props.displayFilters}
            onClick={handleClick}
          >
            INVOICE ID
            {props.displayFilters && (
              <img
                src={sort[0] === "invoice" ? chevron : null}
                className={sort[1]}
                disabled
              />
            )}
          </button>

          <button
            className={
              props.displayFilters
                ? "category-btn action"
                : "category-btn hidden"
            }
            disabled
          >
            ACTION
          </button>
        </>
      )}
    </div>
  );
}
