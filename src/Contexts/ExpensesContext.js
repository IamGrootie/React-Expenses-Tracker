import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { subDays } from "date-fns";

import { createContext, useContext, useState, useEffect } from "react";

import { db } from "../firebase-config";

import { useAuth } from "./RequireAuth";

const ExpensesContext = createContext();

export function useExpenses() {
  return useContext(ExpensesContext);
}

export default function ExpensesProvider({ children }) {
  const { currentUser } = useAuth();
  const uid = currentUser && currentUser.uid;
  const [expenses, setExpenses] = useState([]);
  const expensesRef = currentUser && collection(db, "users", uid, "expense");
  const displayQ = query(expensesRef, orderBy("date", "desc"));
  const [sort, setSort] = useState(["date", "asc"]);
  const [timePeriod, setTimePeriod] = useState(7);

  useEffect(() => {
    if (currentUser) {
      onSnapshot(expensesRef, async () => {
        const data = await getDocs(displayQ);
        const expensesArray = data.docs.map(doc => doc.data());
        setExpenses(expensesArray);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (expenses) {
      sortExpenses(sort[0], sort[1]);
      setExpenses(prevTransactions => [...prevTransactions]);
    }
  }, [sort]);

  function sortExpenses(value, order) {
    if (value === "amount") {
      const expensePart = expenses.sort((a, b) => a.amount - b.amount);
      setExpenses(
        order === "asc" ? [...expensePart] : [...expensePart].reverse()
      );
    } else
      return expenses.sort((a, b) => {
        const itemA = a[value].toUpperCase();
        const itemB = b[value].toUpperCase();
        if (itemA < itemB) {
          return order === "asc" ? 1 : -1;
        }
        if (itemA > itemB) {
          return order === "asc" ? -1 : 1;
        }
        return 0;
      });
  }

  useEffect(() => {
    if (expenses) {
      sortExpenses(sort[0], sort[1]);
      setExpenses(prevExpenses => [...prevExpenses]);
    }
  }, [sort]);

  function createExpense(id, data) {
    return setDoc(doc(db, "users", uid, "expense", id), data);
  }

  function updateExpense(id, data) {
    return updateDoc(doc(db, "users", uid, "expense", id), data);
  }

  function deleteExpense(id) {
    return deleteDoc(doc(db, "users", uid, "expense", id));
  }

  const dateArray = Array(timePeriod)
    .fill()
    .map((item, index) =>
      subDays(new Date(), index).toISOString().substring(0, 10)
    );

  const expensesThroughTime = fillAmount(dateArray, expenses);

  function fillAmount(dates, transactions) {
    return dates.reduce((array, date) => {
      transactions.forEach(item => {
        const sameDate = array.find(newObj => newObj.date === item.date);
        if (item.date === date) {
          if (sameDate) {
            sameDate.amount += item.amount;
          } else
            array.push({
              date: date,
              amount: item.amount,
            });
        }
      });
      const sameDate = array.find(newObj => newObj.date === date);
      if (!sameDate) {
        array.push({
          date: date,
          amount: 0,
        });
      }
      return array;
    }, []);
  }

  const value = {
    expenses,
    expensesThroughTime,
    dateArray,
    createExpense,
    updateExpense,
    deleteExpense,
    setTimePeriod,
    timePeriod,
    sort,
    setSort,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
