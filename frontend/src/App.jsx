// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import { Navigate } from 'react-router-dom';



function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>

  )
}

export function ProtectedRoute(props){
  if(localStorage.getItem('user')){
    return props.children;
  } else{
    return <Navigate to="/login"/>
  }
}

export default App
