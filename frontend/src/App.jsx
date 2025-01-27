import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './page/Login'
import Signup from './page/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
//import 'bootstrap/dist/js/bootstrap.bundle.min'
import EventManager from './page/EventManager'
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
            {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/eventManager" element={<EventManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

