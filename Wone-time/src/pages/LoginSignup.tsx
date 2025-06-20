import Box from '@mui/material/Box';
import { Card, Input, Button, Typography, InputLabel } from '@mui/material';
import { useState } from 'react';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../services/firebase";

import { useLoginInfo } from '../stores/loginState';

const handleSignup = async (username : string, password : string, confirmpassword : string) => {

    if (password === confirmpassword){
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, username, password);
            console.log(userCredential.user);
        } catch (error) {
            console.error(error.code);
            console.error(error.message);
        }
    }else{
        console.log("Passwords don't match")
    }
    
};

const handleLogin = async (username : string, password : string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    console.log("Logged in as", userCredential.user.email);
    useLoginInfo.setState({loginStatus : true});
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

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

    const changeStatus = useLoginInfo((state) => state.changeState)

    return(
        <Card  sx={{width:400, height: 500}}>
            <Box>
                <Typography variant="h2" >
                    Login
                </Typography>
            </Box>
            <Box>
                <InputLabel htmlFor="email_login">Email</InputLabel>
                <Input id="email_login" onChange={(e) => setUsername(e.target.value)} placeholder='Enter you useranme'/>
            </Box>

            <Box>
                <InputLabel htmlFor="password_login">Password</InputLabel>
                <Input id="password_login" onChange={(e) => setPassword(e.target.value)} placeholder='Enter you password'/>  
            </Box>

            <Box>
                <Button onClick={() => handleLogin(username, password)}>Login</Button> 
                <br />
                <Box>
                    <Typography variant='caption'>Don't have an account? </Typography>
                    <Button onClick={() => changeStatus(true)}>Create account</Button>     
                </Box>
            </Box>         

        </Card>
    )
}

function Signup(){

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [confirmpassword, setConfirmPassword] = useState<string>("");

    const changeStatus = useLoginInfo((state) => state.changeState)

    return(
       <Card  sx={{width:400, height: 500}}>
            <Box>
                <Typography variant="h2" >
                    SignUp
                </Typography>
            </Box>
            <Box>
                <InputLabel htmlFor="email_signup">Email</InputLabel>
                <Input id="email_signup" onChange={(e) => setUsername(e.target.value)} placeholder='Enter you email'/>
            </Box>

            <Box>
                <InputLabel htmlFor="password_signup">Password</InputLabel>
                <Input id="password_signup" type="password"onChange={(e) => setPassword(e.target.value)} placeholder='Enter you password'/> 
                <br />
                <InputLabel htmlFor="confirm_password_signup">Confirm password</InputLabel>
                <Input id="confirm_password_signup"type="password"onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm you password'/> 
 
            </Box>

            <Box>
                <Button onClick={() => handleSignup(username, password, confirmpassword)}>Sign up</Button> 
                <br />

                <Box>
                    <Typography variant='caption'>Already have an account? </Typography>
                    <Button onClick={() => changeStatus(false)}>Create account</Button>     
                </Box>
                
            </Box>         

        </Card>
    )
}




function UserAccount(){

    function CheckUserstatus(){
                console.log(useLoginInfo.getState().loginStatus);

        if (auth.currentUser)
            console.log("You are logged in as " + auth.currentUser.email);      
        else
            console.log("You are not logged in");
    }

    const newUser = useLoginInfo((state) => state.newUser)

    return(
        <Box sx={{width:1000, height: 1000}}>

            {newUser ? <Signup /> : <Login/>}
            
            <Button onClick={CheckUserstatus}>Check log in status</Button>
            <Button onClick={handleLogout}> Sign out</Button>
        </Box>
    )
}

export default UserAccount