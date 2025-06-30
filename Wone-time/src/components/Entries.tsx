import {
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Skeleton,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import NewTimeEntry from "./NewTimeEntry";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { TimeEntryData, ProjectData } from "../types";
import { useLoginInfo } from "../stores/loginState";
import { getProjects, getTimeEntries, editTimeRecords } from "../services/api";
import { TopTimeEnteries } from "../assets/dummydata";

const skeleton_load: boolean = false;

function Entries() {
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
  const projectQuery = useQuery<ProjectData>({
    queryKey: ["projects"],
    queryFn: () => getProjects(userId),
  });

  //get time entries
  const timeQuery = useQuery<TimeEntryData>({
    queryKey: ["timeEntries"],
    queryFn: () => getTimeEntries(userId),
  });

  //editing time entries
  const editMutation = useMutation({
    mutationFn: editTimeRecords,
    onSuccess: () => {
      // Refetch user or update cache
      alert("You have successfully updated the record");
    },
  });
  function changeRecord(entry_id: string, entryData: TimeEntryData) {
    editMutation.mutate({
      id: entry_id,
      newData: entryData,
    });
  }

  const project_list: string[] = [
    "Project A",
    "Project B",
    "Project C",
    "Project D",
  ];
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", p: 2, width: "100vw" }}
    >
      <Box sx={{ display: "flex", position: "relative", mb: 2 }}>
        <Typography variant="h4">Time Entry</Typography>
        <Button
          variant="contained"
          disabled={projectQuery.isLoading}
          onClick={handleClick}
          sx={{ right: "10px", position: "absolute", px: 5 }}
        >
          Track Time
        </Button>
      </Box>
      <Box
        sx={{
          p: 1,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2, // spacing between columns
          border: "1px solid black",
          width: "80%",
        }}
      >
        <TextField id="search_box" placeholder="Search 🔎" />
        <TextField
          id="project_selection"
          select
          label="Project x"
          defaultValue={project_list[0]}
          sx={{ minWidth: "200px" }}
        >
          {projectQuery.data &&
            projectQuery.data.map((project: ProjectData) => (
              <MenuItem key={project.id} value={project.id}>
                {project.name}
              </MenuItem>
            ))}
        </TextField>
        <TextField id="date_field" type="date" placeholder="Date" />
      </Box>
      <Box
        sx={{
          border: "1px solid black",
          width: "100%",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell sx={{ pl: 4 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {timeQuery.isLoading || skeleton_load
                ? [1, 2, 3, 4, 5].map((number) => (
                    <TableRow key={number}>
                      {[1, 2, 3, 4, 5].map((my_col) => (
                        <TableCell>
                          <Skeleton
                            key={my_col}
                            variant="rectangular"
                            sx={{
                              height: "35px",
                              width: "100%",
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : TopTimeEnteries.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.projectName}</TableCell>
                      <TableCell>{entry.description}</TableCell>
                      <TableCell>{entry.time} h</TableCell>
                      <TableCell>
                        {/* <Button onClick={changeRecord('1', entry as TimeEntryData)}>Edit</Button> */}
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* <NewTimeEntry myProjects={project_data} closeFn={handleClose} visibility={show}/> */}
      <NewTimeEntry
        myProjects={projectQuery.data}
        closeFn={handleClose}
        visibility={show}
      />
    </Box>
  );
}

export default Entries;
