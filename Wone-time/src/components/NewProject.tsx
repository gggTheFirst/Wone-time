import {
  Button,
  Typography,
  Popover,
  InputLabel,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../services/api";

import { type ProjectData } from "../types";
import { useLoginInfo } from "../stores/loginState";

import { useState } from "react";
import BufferLoader from "./buffer";

function NewProject({
  closeFn,
  visibility,
}: {
  closeFn: () => void;
  visibility: boolean;
}) {
  const queryClient = useQueryClient();
  const [projectname, setProjectName] = useState<string>("");
  const [projectdesc, setProjectDescription] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  //creating project
  const { mutate, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      // Optionally refetch project list
      queryClient.invalidateQueries(["projects"]);
      handleClose();
    },
  });
  function handleClose() {
    setProjectName("");
    setProjectDescription("");
    setValidationError("");

    closeFn();
  }
  function handleClick() {
    const newProj: ProjectData = {
      name: projectname,
      userId: useLoginInfo.getState().userId,
      description: projectdesc,
    };
    // check if project name is empty
    if (projectname.trim() === "" || projectdesc.trim() === "") {
      setValidationError("Project name and description cannot be empty.");
    } else {
      setValidationError("");
      mutate(newProj);
    }
  }

  return (
    <Popover
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
          sx={{ position: "absolute", right: "10px" }}
          onClick={handleClose}
        />
        <Typography variant="h3">Create New Project</Typography>
        <Typography>Add a new project to start tracking time</Typography>

        <InputLabel htmlFor="project_name">Project Name</InputLabel>
        <TextField
          onChange={(e) => setProjectName(e.target.value)}
          type="text"
          id="project_name"
          value={projectname}
          required
          placeholder="Project Name"
        />

        <InputLabel htmlFor="project_description">Description</InputLabel>
        <TextField
          onChange={(e) => setProjectDescription(e.target.value)}
          multiline
          rows={4}
          value={projectdesc}
          type="text"
          id="project_description"
          required
          placeholder="Project Description"
        />
        {validationError && (
          <Typography color="red" sx={{ mt: 1 }}>
            {validationError}
          </Typography>
        )}

        <Box sx={{ justifyContent: "right", display: "flex", mt: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ px: 4, mx: 1 }}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClick} sx={{ px: 2 }}>
            Create Project
          </Button>
        </Box>
      </Box>
      {isPending && <BufferLoader />}
    </Popover>
  );
}

export default NewProject;
