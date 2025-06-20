import UserAccount from "./pages/LoginSignup"
import Home from "./pages/Home"
import Report from "./pages/Report"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Header/>
        <Routes>
          <Route path='/Login_Signup' element={<UserAccount/>}/> 
          <Route path='/' element={<Home/>}/> 
          <Route path='/Report' element={<Report/>}/>
        </Routes>
      <Footer/>
    </>
  )
}

export default App
