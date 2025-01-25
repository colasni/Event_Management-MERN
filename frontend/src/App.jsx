import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './page/Login'
import Signup from './page/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import EventManager from './page/EventManager'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/eventManager" element={<EventManager/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

