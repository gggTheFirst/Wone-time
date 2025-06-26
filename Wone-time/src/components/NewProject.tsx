import { useRef } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { Button, Typography, Popover, InputLabel, TextField} from '@mui/material';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';
import api from '../services/api';

import { type ProjectData } from '../types';
import { useLoginInfo } from '../stores/loginState';
import { auth } from '../services/firebase';

import { useState } from 'react';

function NewProject({closeFn, visibility }: {closeFn : () => void; visibility : boolean}){

    
    const [projectname, setProjectName] = useState<string>("")
    const [projectdesc, setProjectDescription] = useState<string>("")

    const createProject = async (newProj : ProjectData) => {
        const key = await auth.currentUser?.getIdToken();

        const response = await api({
            method: 'post',
            url: '/projects',
            data: newProj,
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
        alert("You have made a project whoopie!");
        
        },
    });

    function handleClick(){
        const newProj : ProjectData ={
            name :  projectname,
            userId : useLoginInfo.getState().userId,
            description: projectdesc,
        }
        
        mutation.mutate(newProj)

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
                <CloseIcon sx={{position:"absolute", right:"10px"}} onClick={closeFn}/>
                <Typography variant='h3'>Create New Project</Typography>
                <Typography>Add a new project to start tracking time</Typography>

                <InputLabel htmlFor="project_name">Project Name</InputLabel>
                <TextField onChange={(e) => setProjectName(e.target.value)} type='text' id="project_name" placeholder='Project Name'/>  
    

                <InputLabel htmlFor="project_description">Description</InputLabel>
                <TextField onChange={(e) => setProjectDescription(e.target.value)}  multiline rows={4} type='text' id="project_description"  placeholder="Project Description"/>  
    
                <Box sx={{justifyContent: "right", display: "flex"}}>
                    <Button onClick={closeFn} sx={{p:2}}>Cancel</Button>
                    <Button onClick={handleClick} sx={{p:2}}>Create Project</Button>
                </Box>
            </Box>
            
        </Popover>
    )
}

export default NewProject