import { useState } from 'react';
import Home from '../src/pages/Home';
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import About from './pages/About';

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={ <Home /> }/>
      <Route path='/about' element={ <About /> }/>

    </Routes>
    </>
  )
}

export default App
