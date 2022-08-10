import "./App.css";
import AuthProvider from "./Contexts/RequireAuth";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Expenses from "./Components/Expenses/Expenses";
import Settings from "./Components/Settings/Settings";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import CreateExpense from "./Components/Expenses/CreateExpense";
import Filters from "./Components/Expenses/Filters";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* add ternary to hide Expense if create-expense = true and nest inside*/}
          <Route path="expenses" element={<Expenses />}>
            <Route path="create-expense" element={<CreateExpense />} />
          </Route>
          <Route path="filters" element={<Filters />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
