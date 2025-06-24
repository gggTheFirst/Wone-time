import { Button } from '@mui/material';
import { useLoginInfo } from '../stores/loginState';
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";


function Header(){
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await signOut(auth);
        console.log("User signed out.");
        useLoginInfo.setState({loginStatus : false});
        navigate('/Login_Signup') 
    
      } catch (error) {
        console.error("Sign-out error:", error);
      }
    };
    
    return(
        <div style={{backgroundColor:"grey", top:"0",width:"100vw"}}>
            This is the header

            <Button onClick={handleLogout} >Logout</Button>
        </div>
    )
}

export default Header