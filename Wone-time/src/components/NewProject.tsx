import { useRef } from 'react';

import { Button, Typography, Popover, InputLabel, TextField} from '@mui/material';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';

function NewProject({closeFn, visibility }: {closeFn : () => void; visibility : boolean}){

    const nameRef = useRef(null);
    const descRef = useRef(null);

    function createProject(){
        // access APO and everything
        alert("Created!")
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
                <CloseIcon sx={{position:"absolute", right:"10px"}}/>
                <Typography variant='h3'>Create New Project</Typography>
                <Typography>Add a new project to start tracking time</Typography>

                <InputLabel htmlFor="prioject_name">Project Name</InputLabel>
                <TextField ref={nameRef} type='text' id="passwoprioject_namerd_login" placeholder='Project Name'/>  
    

                <InputLabel htmlFor="project_description">Description</InputLabel>
                <TextField ref={descRef}  multiline rows={4} type='text' id="project_description"  placeholder='Enter you password'/>  
    
                <Box sx={{justifyContent: "right", display: "flex"}}>
                    <Button onClick={closeFn} sx={{p:2}}>Cancel</Button>
                    <Button onClick={createProject} sx={{p:2}}>Create Project</Button>
                </Box>
            </Box>
            
        </Popover>
    )
}

export default NewProject