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

import { createContext, useContext, useState, useEffect } from "react";

import { db } from "../firebase-config";

import { useAuth } from "./auth";

const ExpensesContext = createContext();

export function useExpenses() {
  return useContext(ExpensesContext);
}

export default function ExpensesProvider({ children }) {
  // const { currentUser } = useAuth();
  // const uid = currentUser && currentUser.uid;
  const [expenses, setExpenses] = useState([]);
  // const expensesRef = currentUser && collection(db, "users", uid, "expense");
  const expensesRef = collection(db, "expense");
  const displayQ = query(expensesRef, orderBy("date", "desc"));
  console.log(`this is expenses ${expenses}`)
  useEffect(() => {
    // if (currentUser) {
      onSnapshot(expensesRef, async () => {
        const data = await getDocs(displayQ);
        const expensesArray = data.docs.map(doc => doc.data());
        setExpenses(expensesArray);
      });
    // }
  }, []);
// }, [currentUser]);

  function createExpense(id, data) {
    return setDoc(doc(db, "expense", id), data);
  }
  // return setDoc(doc(db, "expense", id), data);
  // return setDoc(doc(db, "users", uid, "expense", id), data);
  function updateExpense(id, data) {
    return updateDoc(doc(db, "expense", id), data);
  }
  // return updateDoc(doc(db, "users", uid, "expense", id), data);
  function deleteExpense(id, data) {
    return deleteDoc(doc(db, "expense", id), data);
  }
  // return deleteDoc(doc(db, "users", uid, "expense", id), data);
  const value = {
    expenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
