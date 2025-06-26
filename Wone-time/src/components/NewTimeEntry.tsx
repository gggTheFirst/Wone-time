import { useRef } from 'react';

import { Button, Typography, Popover, InputLabel, TextField, MenuItem, Input} from '@mui/material';
import Box from '@mui/material/Box';

import CloseIcon from '@mui/icons-material/Close';

function NewTimeEntry({closeFn, visibility }: {closeFn : () => void; visibility : boolean}){

    const project_list : string[] = ["Project A","Project B","Project C","Project D"];

    const nameRef = useRef(null);
    const descRef = useRef(null);

    function addTime(){
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
                <CloseIcon onClick={closeFn} sx={{position:"absolute", right:"10px"}}/>
                <Typography variant='h3'>Manual Time Entry</Typography>
                <Typography>Add time entry manually</Typography>

                <InputLabel  sx={{mt:2, mb:1}} htmlFor="prioject_name">Project Name</InputLabel>
                <TextField
                    ref={nameRef}
                    id="prioject_name"
                    select
                    defaultValue={project_list[0]}
                    sx={{minWidth: "200px"}}
                > {project_list.map((project, index) => (
                    <MenuItem key={index} value={project}>
                        {project}
                    </MenuItem>
                ))}         
                </TextField>


                <InputLabel sx={{mt:2, mb:1}} htmlFor="time_entry_desc">Description</InputLabel>
                <TextField ref={descRef}  multiline rows={4} type='text' id="time_entry_desc"  placeholder='Description'/>  

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
                    <Button onClick={addTime} sx={{p:2}}>Add and Continue</Button>
                    <Button onClick={() => {addTime(); closeFn()}} sx={{p:2}}>Add</Button>
                </Box>
            </Box>

        </Popover>
    )
}

export default NewTimeEntry