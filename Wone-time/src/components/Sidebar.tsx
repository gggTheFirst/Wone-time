import { Typography } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import TimerIcon from '@mui/icons-material/Timer';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LogoutIcon from '@mui/icons-material/Logout';
import ContrastIcon from '@mui/icons-material/Contrast';

import Box from '@mui/material/Box';

import { useLoginInfo } from '../stores/loginState';
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router";


function Sidebar(){
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
        <Box sx={{ border: "1px solid black", width: "15vw", minHeight: "95vh", p:2, pt: 8, position: "relative"}}>

            <Box sx={{display: "flex", flexDirection: "column"}}>
                
                <Link to={"/"} >
                    <Box sx={{ display: 'flex', alignItems: "center"}}>
                        <HomeIcon sx={{pb:"3px"}}/>
                        <Typography variant='overline' sx={{pl:1, fontSize: 16}}>Dashboard</Typography>
                    </Box>  
                </Link>
                

                <Link to={"/timeEntries"}>
                    <Box sx={{ display: 'flex', alignItems: "center"}}>
                        <TimerIcon sx={{pb:"3px"}}/>
                        <Typography variant='overline' sx={{pl:1, fontSize: 16}}>Time Tracking</Typography>
                    </Box>  
                </Link>

                <Link to={"/report"}>
                    <Box sx={{ display: 'flex', alignItems: "center"}}>
                        <EqualizerIcon sx={{pb:"3px"}}/>
                        <Typography variant='overline' sx={{pl:1, fontSize: 16}}>Report</Typography>
                    </Box>  
                </Link>
            </Box>

            <Box sx={{display: "flex", flexDirection: "column", bottom: "100px", position: "absolute"}}>
                
                <Box sx={{ display: 'flex', alignItems: "center", cursor: 'pointer'}}>
                    <ContrastIcon sx={{pb:"3px"}}/>
                    <Typography variant='overline' sx={{pl:1, fontSize: 16}}>Switch Theme</Typography>
                </Box>  
                <Box sx={{ display: 'flex', alignItems: "center", cursor: 'pointer'}}>
                    <LogoutIcon sx={{pb:"3px"}}/>
                    <Typography onClick={handleLogout} variant='overline' sx={{pl:1, fontSize: 16}}>Logout</Typography>
                </Box>  

            </Box>
        </Box>
    )
}

export default Sidebar