import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';
import DashBoard from '../components/DashBoard';

function TimeEntries(){


    return(
        <>
        <Box sx={{minWidth: "100vw", minHeight: "95vh", display: "flex"}}>
            <Sidebar/>
            <DashBoard/>
        </Box>
        </>
    )
}

export default TimeEntries