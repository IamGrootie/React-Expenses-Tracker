import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { subDays } from "date-fns";

import { createContext, useContext, useState, useEffect } from "react";

import { db } from "../firebase-config";

import { useAuth } from "./AuthContext";

const ExpensesContext = createContext();

export function useExpenses() {
  return useContext(ExpensesContext);
}

export default function ExpensesProvider({ children }) {
  const { currentUser } = useAuth();
  const uid = currentUser && currentUser.uid;
  const [expenses, setExpenses] = useState([]);
  const expensesRef = currentUser && collection(db, "users", uid, "expense");
  const [sort, setSort] = useState(["date", "asc"]);

  useEffect(() => {
    if (currentUser) {
      onSnapshot(expensesRef, async () => {
        const data = await getDocs(expensesRef);
        const expensesArray = data.docs.map((doc) => doc.data());
        setExpenses(expensesArray);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (expenses) {
      sortExpenses(sort[0], sort[1]);
      setExpenses((prevExpenses) => [...prevExpenses]);
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
        const itemA = a[value];
        const itemB = b[value];
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
      setExpenses((prevExpenses) => [...prevExpenses]);
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

  const weeklyTimePeriod = 7;
  const weeklyDateArray = Array(weeklyTimePeriod)
    .fill()
    .map((item, index) =>
      subDays(new Date(), index).toISOString().substring(0, 10)
    );

  const monthlyTimePeriod = 31;
  const monthlyDateArray = Array(monthlyTimePeriod)
    .fill()
    .map((item, index) =>
      subDays(new Date(), index).toISOString().substring(0, 10)
    );

  const totalTimePeriod = 365;
  const totalDateArray = Array(totalTimePeriod)
    .fill()
    .map((item, index) =>
      subDays(new Date(), index).toISOString().substring(0, 10)
    );

  const weeklyExpenses = fillAmount(weeklyDateArray, expenses);
  const monthlyExpenses = fillAmount(monthlyDateArray, expenses);
  const totalExpenses = fillAmount(totalDateArray, expenses);

  function fillAmount(dates, expenses) {
    return dates.reduce((array, date) => {
      expenses.forEach((item) => {
        const sameDate = array.find((newObj) => newObj.date === item.date);
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
      const sameDate = array.find((newObj) => newObj.date === date);
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
    weeklyExpenses,
    monthlyExpenses,
    monthlyDateArray,
    totalExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
    sort,
    setSort,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
