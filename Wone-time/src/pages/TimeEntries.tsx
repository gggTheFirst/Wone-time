import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';
import Entries from '../components/Entries';

function TimeEntries(){


    return(
        <>
        <Box sx={{minWidth: "100vw", minHeight: "95vh", display: "flex"}}>
            <Sidebar/>
            <Entries/>
        </Box>
        </>
    )
}

export default TimeEntries