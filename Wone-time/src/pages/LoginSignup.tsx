import { Card, Input, Button, Typography, InputLabel } from '@mui/material';
import Box from '@mui/material/Box';

import { useState } from 'react';
import { useNavigate } from "react-router";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { auth } from "../services/firebase";

import { useLoginInfo } from '../stores/loginState';
import { type ErrorMessage } from '../types';
import { parseError } from '../services/firebaseError';



const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out.");
    useLoginInfo.setState({loginStatus : false});

  } catch (error) {
    console.error("Sign-out error:", error);
  }
};



function Login(){
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<ErrorMessage>({hasError: false, message: ""});

    const changeStatus = useLoginInfo((state) => state.changeState)
    const navigate = useNavigate();

    const handleLogin = async (username : string, password : string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            console.log("Logged in as", userCredential.user.email);
            if (auth.currentUser?.emailVerified === false){
                handleLogout()
                const error = new Error("Email not verified!");
                (error as any).code = "unverified-email";
                throw error;
            }
            useLoginInfo.setState({loginStatus : true});
            navigate('/')
        } catch (error) {
            setError({hasError: true, message: parseError(error.code)})
            console.error(error.code);
            console.error(error.message);
        }
    };

    return(
        <Card  sx={{width:400, height: 500}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', p:2, alignContent: "center"}}>
                    <Typography variant="h2" >
                        Login
                    </Typography>

                    <InputLabel htmlFor="email_login">Email</InputLabel>
                    <Input id="email_login" onChange={(e) => setUsername(e.target.value)} placeholder='Enter you useranme'/>

                    <InputLabel htmlFor="password_login">Password</InputLabel>
                    <Input id="password_login" onChange={(e) => setPassword(e.target.value)} placeholder='Enter you password'/>  
    
                    {error.hasError &&
                    <>
                        <Typography variant='caption' color='red' >
                            {error.message}
                            
                        </Typography> 
                    </>
                    }
                
                    <Button onClick={() => {
                        handleLogin(username, password);
                        setError({hasError: false, message: ""});
                    }}>Login</Button> 

                    <Typography variant='caption' sx={{cursor: 'pointer'}} onClick={() => {navigate('/forgotpassword');}}>forgot password?</Typography>
                    <br />
                
                        <Typography variant='caption'>Don't have an account? </Typography>
                        <Button onClick={() => changeStatus(true)}>Create account</Button>     
                   
                    <Button onClick={() => console.log(auth.currentUser)}>View account infomration</Button>
               
            </Box>
        </Card>
    )
}

function Signup(){
     
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmpassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<ErrorMessage>({hasError: false, message: ""});
    
    const changeStatus = useLoginInfo((state) => state.changeState)
 
    const handleSignup = async (username : string, password : string, confirmpassword : string) => {
        if (password === confirmpassword){
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, username, password);
                console.log(userCredential.user);

                await sendEmailVerification(userCredential.user);
                alert("Go verify your email! or else you will not be able to login!");     
                handleLogout(); // need to first verify their account

            } catch (error) {
                setError({hasError: true, message: parseError(error.code)})
                console.error(error.code);
                console.error(error.message);
            }
        }else{ 
            setError({hasError: true, message: "passwords do not match"})
        }
        
    };

    return(
       <Card  sx={{width:400, height: 500, display: "flex", flexDirection: "column", p:2}}>
         
                <Typography variant="h2" >
                    SignUp
                </Typography>
          
                <InputLabel htmlFor="email_signup">Email</InputLabel>
                <Input required={error.hasError} 
                id="email_signup" 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder='Enter you email'/>

                <InputLabel htmlFor="password_signup">Password</InputLabel>
                <Input id="password_signup" 
                    required={error.hasError}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Enter you password'/> 

                <InputLabel htmlFor="confirm_password_signup">Confirm password</InputLabel>
                <Input id="confirm_password_signup"
                    required={error.hasError}
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder='Confirm you password'/>          
            
                    {error.hasError &&
                    <>
                        
                        <Typography variant='caption' color='red' >
                            {error.message}
                            
                        </Typography> 
                    </>
                    }
            
                <Button onClick={() => {    
                    setError({hasError: false, message: ""})
                    handleSignup(username, password, confirmpassword); 
                    }}>Sign up</Button> 
                <br />

                <Box>
                    <Typography variant='caption'>Already have an account? </Typography>
                    <Button onClick={() => changeStatus(false)}>Login</Button>     
                </Box>

                
                
             

        </Card>
    )
}




function UserAccount(){

    const debug : boolean = false
    function CheckUserstatus(){
                console.log(useLoginInfo.getState().loginStatus);

        if (auth.currentUser)
        {
            console.log("You are logged in as " + auth.currentUser.email);   
            console.log("Email verified? " + auth.currentUser?.emailVerified)  ;
        }       
        else{
            console.log("You are not logged in");
        }
            
    }

    const newUser = useLoginInfo((state) => state.newUser)

    return(
        <Box sx={{width:"100vw", height: "98vh", display: "flex", justifyContent: "center", alignContent: "center", flexWrap: "wrap" }}>

            {newUser ? <Signup /> : <Login/>}
            
            {debug && 
            <>
            <Button onClick={CheckUserstatus}>Check log in status</Button>
            <Button onClick={handleLogout}> Sign out</Button>
            </>
            }
        </Box>
    )
}

export default UserAccount