import { LinearProgress, Box, Typography } from "@mui/material";

function ProjectProgress({
  projectTotal,
  totalHours,
  projName,
}: {
  projectTotal: number;
  totalHours: number;
  projName: string;
}) {
  const percent_complete: number = parseFloat(
    (projectTotal / (totalHours + 1)) * 100
  ).toFixed(2);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", position: "relative" }}>
      <Box sx={{ alignContent: "center", width: "55%", px: 2 }}>
        <LinearProgress variant="determinate" value={percent_complete} />
      </Box>

      <Typography sx={{ mx: 1 }}> {percent_complete}%</Typography>
      <Typography
        variant="subtitle2"
        sx={{ position: "absolute", right: "10px" }}
      >
        {projName}
      </Typography>
    </Box>
  );
}

export default ProjectProgress;
