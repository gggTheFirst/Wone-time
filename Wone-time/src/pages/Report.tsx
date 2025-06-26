import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar';
import ReportSummary from '../components/ReportSummary';

function Report(){



    return(
        <>
        <Box sx={{minWidth: "100vw", minHeight: "95vh", display: "flex"}}>
            <Sidebar/>
            <ReportSummary/>
        </Box>
        </>
    )
}

export default Report