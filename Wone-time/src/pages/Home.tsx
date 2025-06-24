import { useLoginInfo } from '../stores/loginState';
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import { Card, Input, Button, Typography, InputLabel } from '@mui/material';
import Sidebar from '../components/Sidebar';
import DashBoard from '../components/DashBoard';

function Home(){


    return(
        <>
        <Box sx={{minWidth: "100vw", minHeight: "95vh", display: "flex"}}>
            <Sidebar/>
            <DashBoard/>
        </Box>
        </>
    )
}

export default Home