import { Card, Typography, Box, CardContent } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useNavigate } from "react-router-dom";

function ProjectSummary({ project }) {
  const navigate = useNavigate();
  function navigateToProject(projectId: string) {
    navigate(`/timeEntries?projectId=${projectId}`);
  }

  return (
    <Card
      onClick={() => navigateToProject(project.id)}
      sx={{
        cursor: "pointer",
        width: "98%",
        display: "flex",
        m: "2px",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ width: "15%", position: "relative", paddingTop: "15%" }}>
        <AccountTreeIcon
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
      </Box>

      <CardContent
        sx={{ display: "flex", flexDirection: "column", width: "70%" }}
      >
        <Typography variant="h6">{project.name}</Typography>
        <Typography variant="body2">{project.description}</Typography>
      </CardContent>

      <Box sx={{ alignItems: "center", display: "flex" }}>
        <Typography variant={"h5"}>{project.totalHours.toFixed(2)}h</Typography>
      </Box>
    </Card>
  );
}

export default ProjectSummary;
