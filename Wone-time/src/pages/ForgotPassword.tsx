import { Card, Typography, InputLabel, Button, Box, Input } from "@mui/material";
import { useState } from "react";
import { fetchSignInMethodsForEmail,sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase"; 
import { type ErrorMessage } from '../types';
import { parseError } from '../services/firebaseError';





function ForgotPassword(){
    const [username, setUsername] = useState<string>("");
    const [error, setError] = useState<ErrorMessage>({hasError: false, message: ""});
    
    // const navigate = useNavigate();



    async function checkIfEmailExists(email: string){
        try {

            await sendPasswordResetEmail(auth, email)
            alert("Reset password like has been sent to you email!")
            setError({hasError: false, message: ""}) 

        } catch (error) {
            setError({hasError: true, message: parseError(error.code)}) 
        }
    }

    return (
        <Card  sx={{width:400, height: 500}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h2" >
                        Forgot Password
                    </Typography>

                    <InputLabel htmlFor="email_login">Email</InputLabel>
                    <Input id="email_login" onChange={(e) => setUsername(e.target.value)} placeholder='Enter you email'/>

                    {error.hasError &&
                    <>
                        <Typography variant='caption' color='red' >
                            {error.message}
                            
                        </Typography> 
                    </>
                    }
                
                    <Button onClick={() => {
                        checkIfEmailExists(username);
                    }}>Send email</Button> 

                

               
            </Box>
        </Card>
    )
}

export default ForgotPassword