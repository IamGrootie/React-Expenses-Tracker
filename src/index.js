import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Contexts/RequireAuth";
import ExpensesProvider from "./Contexts/ExpensesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ExpensesProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ExpensesProvider>
  </AuthProvider>
);
