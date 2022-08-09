import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ExpensesContext from "./Contexts/ExpensesContext";

// import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Contexts/auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <AuthProvider>
    <ExpensesContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ExpensesContext>
  // </AuthProvider>
);
