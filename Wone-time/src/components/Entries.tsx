import { Box, Button, Typography, TextField, MenuItem } from "@mui/material"
import { useState } from "react";
import NewTimeEntry from "./NewTimeEntry";
import { useMutation, useQuery } from "@tanstack/react-query";
import type{  TimeEntryData, ProjectData } from "../types";
import { useLoginInfo } from "../stores/loginState";
import { getProjects, getTimeEntries, editTimeRecords } from '../services/api';


function Entries(){
    //Stuff for the pop up
    const [show, setShow] = useState<boolean>(false);
    const handleClick = () => {
        setShow(true);
    };
    const handleClose = () => {
        setShow(false);
    };

    //getting projects
    const userId = useLoginInfo.getState().userId;
    const {data, isLoading} = useQuery<ProjectData>({
        queryKey: ["projects"],
        queryFn: () => getProjects(userId),
    })

    //get time entries
    const {time_data, time_isLoading} = useQuery<TimeEntryData>({
        queryKey: ["timeEntries"],
        queryFn: () => getTimeEntries(userId ),
    })

    //editing time entries
    const editMutation = useMutation({
        mutationFn: editTimeRecords,
        onSuccess: () => {
            // Refetch user or update cache
            alert('You have successfully updated the record')
        },
    });
    function changeRecord(entry_id : string, entryData: TimeEntryData){
        editMutation.mutate({
            id: entry_id, 
            newData: entryData
        });
    }

    const project_list : string[] = ["Project A","Project B","Project C","Project D"];
    return (
        <Box sx={{display:"flex", flexDirection: "column", p:2, width:"85vw"}}>
            <Box sx={{display: "flex", position: "relative", mb:2}}>
                <Typography variant="h4">Time Entry</Typography>
                <Button onClick={handleClick} sx={{right: "10px", position: "absolute"}}>Track Time</Button>
            </Box>
            <Box sx={{
                    p: 1,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2, // spacing between columns
                    border: "1px solid black",
                    width: "80%"}}>
                <TextField id="search_box" placeholder='Search 🔎'/>
                <TextField
                    id="project_selection"
                    select
                    label="Project x"
                    defaultValue={project_list[0]}
                    sx={{minWidth: "200px"}}
                > {project_list.map((project, index) => (
                    <MenuItem key={index} value={project}>
                        {project}
                    </MenuItem>
                ))}
                    
                </TextField>
                <TextField id="date_field" type="date" placeholder='Date'/>

            </Box>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: 2, // spacing between columns
                    border: "1px solid black",
                    width: "100%"
                }}
                >
                <Box sx={{border: "1px solid black"}}>
                    <Typography variant="h5" sx={{fontStyle: "b"}}>Date</Typography>
                </Box>
                <Box sx={{border: "1px solid black"}}>
                    <Typography variant="h5" sx={{fontStyle: "b"}}>Project</Typography>
                </Box>
                <Box sx={{border: "1px solid black"}}>
                    <Typography variant="h5" sx={{fontStyle: "b"}}>Notes</Typography>
                </Box>
                 <Box sx={{border: "1px solid black"}}>
                    <Typography variant="h5" sx={{fontStyle: "b"}}>Duration</Typography>
                </Box>
                 <Box sx={{border: "1px solid black"}}>
                    <Typography variant="h5" sx={{fontStyle: "b"}}>Action</Typography>
                </Box>

            </Box>
            {(data)? 'nothing to see': project_list.map((project) =>(
                // <Entry editFn={() => changeRecord(project.id, )} key={project.id}/>
                'filler'
            ))}
            <NewTimeEntry myProjects={data} closeFn={handleClose} visibility={show}/>
        </Box>
        
    )
}

export default Entries