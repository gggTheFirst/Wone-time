import { Button, Typography} from '@mui/material';
import Box from '@mui/material/Box';

function ReportSummary(){
    return(
        <Box sx={{border: "1px solid black",p:2, display: 'flex', width: "85vw", flexDirection:"column"}}>
            <Box  sx={{border: "1px solid black", mb: 2, display: 'flex', width:"100%", position: "relative"}}>
                <Typography variant='h4'>Reporting</Typography>
                <Button sx={{right:20, position:"absolute"}}>Export</Button>
            </Box>
            <Box  sx={{border: "1px solid black", display: 'flex'}}>
                <Box sx={{border: "1px solid black", mr:2, width:"55%", display:'flex', flexWrap:'wrap'}}>
                    <Box sx={{display: 'flex', maxWidth:"700px", width:"100%", flexWrap:'wrap'}}>
                        <Box sx={{m:1, border: "1px solid black", height:"200px", minWidth:"200px", width:"47%"}}></Box>
                        <Box sx={{m:1, border: "1px solid black", height:"200px", minWidth:"200px",width:"47%"}}></Box>
                    </Box>
                    <Box sx={{display: 'flex', width:"700px", flexWrap:'wrap'}}>
                        <Box sx={{m:1, border: "1px solid black", height:"200px",minWidth:"200px", width:"47%"}}></Box>
                        <Box sx={{m:1, border: "1px solid black", height:"200px", minWidth:"200px",width:"47%"}}></Box>
                    </Box>        
                    <Box sx={{m:1, border: "1px solid black", width:"100%", height: "400px"}}>

                    </Box>
                </Box>
                
                <Box sx={{display: 'flex', flexDirection: 'column', width:"45%", border: "1px solid black"}}>
                    <Box sx={{m:1, border: "1px solid black", flexDirection:"column"}}>
                        <Typography variant='h4'>Project Overview</Typography>
                        <Box sx={{ border: "1px solid black", height: "400px"}}>
                            Here is the graph
                        </Box>
                    </Box>
                    <Box  sx={{m:1, border: "1px solid black", flexDirection:"column"}}>
                        <Typography variant='h4'>Project Overview</Typography>
                        <Box sx={{border: "1px solid black", height: "400px"}}>
                            Here is the graph
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ReportSummary;