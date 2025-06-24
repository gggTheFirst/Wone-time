import Box from '@mui/material/Box';
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