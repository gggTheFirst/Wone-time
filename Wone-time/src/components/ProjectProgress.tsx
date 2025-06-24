import { LinearProgress, Box, Typography} from '@mui/material';


function ProjectProgress(){
    const percent_complete : number = 70;
    
    return(
        <Box sx={{display: "flex",  flexWrap: 'wrap', position: 'relative'}}>
            <Box sx={{alignContent: "center", width: "55%", px: 2}}>
                <LinearProgress variant="determinate" value={percent_complete}/>
            </Box>
            
            <Typography sx={{mx:1}}> {percent_complete}%</Typography>
            <Typography variant='subtitle2' sx={{ position: "absolute", right:"10px"}}> Project name </Typography>
        </Box> 
    )
}

export default ProjectProgress