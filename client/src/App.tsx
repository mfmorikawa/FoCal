import { useState, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css'
import CategoryFilter from './components/CategoryFiler';

function App() {
  return (
    <Fragment>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Fragment>
  )
}

export default App;
