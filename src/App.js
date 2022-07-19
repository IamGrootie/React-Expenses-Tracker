import React from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';

export default function App() {
  return (
    <div className="App">
       <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='*' element={<div>Page not found</div>}/>
      </Routes>
    </div>
  );
}


