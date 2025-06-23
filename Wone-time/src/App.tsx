import UserAccount from "./pages/LoginSignup"
import Home from "./pages/Home"
import Report from "./pages/Report"
import Footer from "./components/Footer"
import Header from "./components/Header"
import ForgotPassword from "./pages/ForgotPassword"
import AuthProvider from "./AuthLoader"

import { useLoginInfo } from './stores/loginState';
import { auth } from "./services/firebase";

import { Route, Routes, useNavigate, useLocation } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
import { useEffect, useState } from "react"

function App() {
  
  const loginStatus = useLoginInfo((state) => state.loginStatus)
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (!loginStatus && (location.pathname !== '/Login_Signup') )
      navigate('/Login_Signup') 
  })
  

  return (
    <>
      <Header/>
      <AuthProvider>
        <Routes>
          <Route path='/Login_Signup' element={<UserAccount/>}/> 
          <Route path='/' element={<Home/>}/> 
          <Route path='/Report' element={<Report/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>

        </Routes>
      </AuthProvider>
      <Footer/>
    </>
  )
}

export default App
