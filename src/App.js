import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Expenses from "./Components/Expenses/Expenses";
import Settings from "./Components/Settings/Settings";
import { Route, Routes } from "react-router-dom";
import React from 'react'
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';


export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="settings" element={<Settings />} />
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='*' element={<div>Page not found</div>}/>
       </Routes>
    </div>
  );
}
