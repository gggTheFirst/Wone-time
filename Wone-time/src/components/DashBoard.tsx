import { Button, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import TimerIcon from '@mui/icons-material/Timer';
import DateRangeIcon from '@mui/icons-material/DateRange';

import ProjectSummary from './ProjectSummary';
import ProjectProgress from './ProjectProgress';
import NewProject from './NewProject';

import { useState } from 'react';
import { useLoginInfo } from '../stores/loginState';
import { useQuery } from '@tanstack/react-query';

import { type ProjectData, type TimeEntryData } from '../types';
import { getProjects, getTimeEntries } from '../services/api';

function DashBoard(){
    
    // getting projects
    const project_list : number[] = [1,2,4,5];
    const userId = useLoginInfo.getState().userId;

    const {project_data, project_isLoading} = useQuery<ProjectData>({
        queryKey: ["projects"],
        queryFn: () => getProjects(userId),
    })

    const {time_data, time_isLoading} = useQuery<TimeEntryData>({
        queryKey: ["time_entries", userId],
        queryFn: () => getTimeEntries(userId /* should be project id*/),
    })

    // need to go a bunch of math to get the statistics
    


    //Stuff for the pop up
    const [show, setShow] = useState<boolean>(false);
    const handleClick = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };

    return(
        <Box sx={{ border: "1px solid black",  width: "85vw", p:3}}>
            <Typography variant='h4'>Dashboard</Typography>
            <Box sx={{  height:"98%",display: "flex"}}>
                
                <Box sx={{ border: "1px solid black", width:"50%", p: 2, }}>
                    <Box sx={{ border: "1px solid black", width:"95%", height: "200px", display: "flex", p: 1, mb: 2,  justifyContent: "space-evenly"}}>

                        <Box sx={{ border: "1px solid black",  width:"48%", height: "100%"}}>

                            <Box sx={{position:"relative", height:"50px", display: "flex", p:"2px"}}>
                                <Typography variant='body1' >Total hours</Typography>
                                <TimerIcon sx={{position: "absolute", right: "5px"}}/>
                            </Box>
                            

                        </Box>

                        <Box sx={{ border: "1px solid black",  width:"48%", height: "100%"}}>
                            <Box sx={{position:"relative", height:"50px", display: "flex", p:"2px"}}>
                                <Typography variant='body1' >Week to date</Typography>
                                <DateRangeIcon sx={{position: "absolute", right: "5px"}}/>
                            </Box>                           
                        </Box>

                    </Box>
                    <Box sx={{ border: "1px solid black", width:"95%", height: "200px", display: "flex", p: 1, mb: 2, }}>
                        <Typography variant='h6' >Statisitics</Typography>

                      
                      

                    </Box>
                    <Box sx={{ border: "1px solid black", width:"95%", height: "200px", display: "flex", flexDirection: "column" , p: 1, }}>
                        <Typography variant='h6' >Projects Overview</Typography>

                        {project_list.map((project) => 
                            <ProjectProgress key={project}/>
                        )}
                      
                      

                    </Box>
                </Box>
                <Box sx={{ border: "1px solid black", width:"50%", p: 2, display:"flex", flexDirection: "column"}}>
                    <Box sx={{display: "flex", position: "relative", m:2, mt: 0}}>
                        <Typography variant='h5' >Projects</Typography>
                        <Button sx={{position: "absolute", right: "10px", px: 5}} onClick={handleClick}>Add new</Button>

                    </Box>

                    <Box sx={{ border: "1px solid black", width:"95%", height: "98%", display: "flex", flexDirection: "column",  p: 1}}>

                        {project_list.map((project) => 
                            <ProjectSummary key={project}/>
                        )}
                    
                    </Box>

                </Box>

            </Box>
            <NewProject closeFn={handleClose} visibility={show}/>
        </Box>
    )
}

export default DashBoard