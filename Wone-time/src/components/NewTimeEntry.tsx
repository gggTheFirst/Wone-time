import { useEffect, useState } from "react";

import {
  Button,
  Typography,
  Popover,
  InputLabel,
  TextField,
  MenuItem,
  Input,
} from "@mui/material";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";

import api from "../services/api";
import { auth } from "../services/firebase";
import { type ProjectData, type TimeEntryData, type EditInfo } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLoginInfo } from "../stores/loginState";
import BufferLoader from "./buffer";

function NewTimeEntry({
  myProjects,
  closeFn,
  visibility,
  record_info,
}: {
  myProjects: ProjectData[];
  closeFn: () => void;
  visibility: boolean;
  record_info?: EditInfo;
}) {
  const queryClient = useQueryClient();
  //getting projects
  const [projName, setProjName] = useState(
    record_info?.entryId ? record_info?.projectId : ""
  );
  const [projDesc, setprojDesc] = useState<string>(
    record_info?.entryId ? record_info?.notes ?? "" : ""
  );
  const [hours, setHours] = useState<number>(
    record_info?.entryId ? Math.trunc(record_info?.duration ?? 0) : 0
  );
  const min =
    ((record_info?.duration ?? 0) - Math.trunc(record_info?.duration ?? 0)) *
    60;
  const [minutes, setMinutes] = useState<number>(Math.trunc(min));
  const [close, setClose] = useState<boolean>(false);

  // console.log("New Entries", record_info);
  // adding time entries
  const createTimeEntry = async (LogEntry: TimeEntryData) => {
    const key = await auth.currentUser?.getIdToken();
    console.log(key);
    const response = await api({
      method: "post",
      url: "/time-entries",
      data: LogEntry,
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });
    console.log(response);
    return response;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createTimeEntry,
    onSuccess: () => {
      // Optionally refetch project list
      queryClient.invalidateQueries(["timeEntries"]);
      alert("You have made a new time entry!");
      if (close) closeFn();
    },
  });
  function handleClick() {
    const LogEntry: TimeEntryData = {
      // add id
      projectId: projName,
      userId: useLoginInfo.getState().userId,
      notes: projDesc,
      date: new Date(),
      hours: hours,
      minutes: minutes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mutate(LogEntry);
  }

  return (
    <Popover
      keepMounted={false}
      open={visibility}
      onClose={closeFn}
      anchorReference="anchorPosition"
      anchorPosition={{
        top: window.innerHeight / 2,
        left: window.innerWidth / 2,
      }}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Box
        sx={{
          minHeight: "10vh",
          minWidth: "50vw",
          p: 2,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <CloseIcon
          onClick={closeFn}
          sx={{ position: "absolute", right: "10px" }}
        />
        <Typography variant="h3">Manual Time Entry</Typography>
        <Typography>Add time entry manually</Typography>

        <InputLabel sx={{ mt: 2, mb: 1 }} htmlFor="prioject_name">
          Project Name
        </InputLabel>
        <TextField
          onChange={(e) => setProjName(e.target.value)}
          id="prioject_name"
          select
          sx={{ minWidth: "200px" }}
          value={projName}
        >
          {myProjects
            ? myProjects.map((project) => (
                <MenuItem key={project?.id} value={project?.id}>
                  {project.name}
                </MenuItem>
              ))
            : "nothing to see"}
        </TextField>

        <InputLabel sx={{ mt: 2, mb: 1 }} htmlFor="time_entry_desc">
          Description
        </InputLabel>
        <TextField
          multiline
          rows={4}
          type="text"
          id="time_entry_desc"
          placeholder="Description"
          value={projDesc}
          onChange={(e) => setprojDesc(e.target.value)}
        />

        <Box sx={{ display: "flex", my: 3 }}>
          <Box sx={{ pr: 4 }}>
            <Typography>Hours</Typography>
            <Input
              type="number"
              onChange={(e) => setHours(Number(e.target.value))}
              defaultValue={hours}
            />
          </Box>
          <Box>
            <Typography>Minutes</Typography>
            <Input
              type="number"
              onChange={(e) => setMinutes(Number(e.target.value))}
              defaultValue={minutes}
            />
          </Box>
        </Box>
        <Box sx={{ justifyContent: "right", display: "flex" }}>
          <Button variant="outlined" onClick={closeFn} sx={{ px: 2, mr: 1 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleClick();
              setClose(false);
            }}
            sx={{ px: 2, mr: 1 }}
          >
            Add and Continue
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleClick();
              setClose(true);
            }}
            sx={{ px: 4 }}
          >
            Add
          </Button>
        </Box>
      </Box>
      {isPending && <BufferLoader />}
    </Popover>
  );
}

export default NewTimeEntry;
