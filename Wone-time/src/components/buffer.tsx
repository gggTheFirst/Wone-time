import { Box, CircularProgress } from "@mui/material";

function BufferLoader() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(255,255,255,0.5)", // semi-transparent background
        zIndex: 1300, // higher than most MUI elements
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={"70px"} />
    </Box>
  );
}

export default BufferLoader;
