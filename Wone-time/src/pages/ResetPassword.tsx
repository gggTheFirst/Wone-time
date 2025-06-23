import { Card, Typography, InputLabel, Button, Box, Input } from "@mui/material";
import { useState } from "react";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../services/firebase"; 
import { type ErrorMessage } from '../types';
import { getAuth, updatePassword } from "firebase/auth";



function ResetPassword(){
    const [password, setPassword] = useState<string>("");
    const [confirmpassword, setConfirmPassword] = useState<string>("");

    const [error, setError] = useState<ErrorMessage>({hasError: false, message: ""});
    
    // const navigate = useNavigate();



    function changePassword(password: string, confirmpassword : string){
        if (password !== confirmpassword){
            setError({hasError: true, message: "passwords do not match"})
            return
        }else{
            const auth = getAuth();
            const user = auth.currentUser;

            updatePassword(user, password).then(() => {
                alert()
            }).catch((error) => {
            // An error ocurred
            // ...
            });
        }
    }

    return (
        <Card  sx={{width:400, height: 500}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h2" >
                        Reset Password
                    </Typography>

                    <Box>
                        <InputLabel htmlFor="password_signup">Password</InputLabel>
                        <Input id="password_signup" 
                            required={error.hasError}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder='Enter you password'/> 
                        <br />

                        <InputLabel htmlFor="confirm_password_signup">Confirm password</InputLabel>
                        <Input id="confirm_password_signup"
                            required={error.hasError}
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder='Confirm you password'/>          
                    </Box>

                    {error.hasError &&
                    <>
                        <Typography variant='caption' color='red' >
                            {error.message}
                            
                        </Typography> 
                    </>
                    }
                
                    <Button onClick={() => {
                        changePassword(username);
                    }}>Send email</Button> 

                

               
            </Box>
        </Card>
    )
}

export default ResetPassword