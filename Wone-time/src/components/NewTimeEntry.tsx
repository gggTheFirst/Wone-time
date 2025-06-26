import { useRef } from 'react';

import { Button, Typography, Popover, InputLabel, TextField, MenuItem, Input} from '@mui/material';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';

import api from '../services/api';
import { auth } from '../services/firebase';
import { type ProjectData, type TimeEntryData } from '../types';
import { useMutation } from '@tanstack/react-query';
import { useLoginInfo } from '../stores/loginState';

function NewTimeEntry({myProjects, closeFn, visibility }: {myProjects: ProjectData[] ,closeFn : () => void; visibility : boolean}){

    //getting projects
    const projNameRef = useRef(null);
    const notesRef = useRef(null);


    // adding time entries
    const createProject = async (LogEntry : TimeEntryData) => {
        const key = await auth.currentUser?.getIdToken();
        console.log(key)
        const response = await api({
            method: 'post',
            url: '/time-entries',
            data: LogEntry,
            headers: {
                "Authorization" : `Bearer ${key}`
            },
            });
            console.log(response)
            return response

    }

    const mutation = useMutation({
        mutationFn: createProject,
        onSuccess: () => {
        // Optionally refetch project list
        //queryClient.invalidateQueries(['projects']);
        alert("You have made a new time entry!");
        
        },
    });

    function handleClick(){
        const LogEntry : TimeEntryData ={
            // add id 
            projectId: projNameRef.current?.value,
            userId : useLoginInfo.getState().userId,
            notes: notesRef.current?.value,
            date: new Date(),
            time: new Date(),
            created: new Date(),
            updated: new Date(),

        }
        
        mutation.mutate(LogEntry)

    }




    return(
        <Popover 
            open={visibility}
            onClose={closeFn}
            anchorReference="anchorPosition"
            anchorPosition={{top: window.innerHeight / 2, left: window.innerWidth / 2  }}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            >
            <Box sx={{minHeight: "10vh", minWidth: "50vw", p:2, display: "flex", flexDirection: 'column', position:"relative"}}>
                <CloseIcon onClick={closeFn} sx={{position:"absolute", right:"10px"}}/>
                <Typography variant='h3'>Manual Time Entry</Typography>
                <Typography>Add time entry manually</Typography>

                <InputLabel  sx={{mt:2, mb:1}} htmlFor="prioject_name">Project Name</InputLabel>
                <TextField
                    ref={projNameRef}
                    id="prioject_name"
                    select
                    sx={{minWidth: "200px"}}
                > 
                
                {
                    myProjects? myProjects.map((project) => (
                        <MenuItem key={project.id} value={project.id /*project id*/}>
                            {project.name}
                        </MenuItem>
                )) : 'nothing to see'}
                        
                </TextField>


                <InputLabel sx={{mt:2, mb:1}} htmlFor="time_entry_desc">Description</InputLabel>
                <TextField ref={notesRef}  multiline rows={4} type='text' id="time_entry_desc"  placeholder='Description'/>  

                <Box sx={{display: "flex", my:3}}>
                    <Box sx={{pr:4}}>
                        <Typography>Hours</Typography>
                        <Input type='number'/>
                    </Box>
                    <Box>
                        <Typography>Minutes</Typography>
                        <Input type='number'/>
                    </Box>
                </Box>
                <Box sx={{justifyContent: "right", display: "flex"}}>
                    <Button onClick={closeFn} sx={{p:2}}>Cancel</Button>
                    <Button onClick={handleClick} sx={{p:2}}>Add and Continue</Button>
                    <Button onClick={() => {handleClick(); closeFn()}} sx={{p:2}}>Add</Button>
                </Box>
            </Box>

        </Popover>
    )
}

export default NewTimeEntry