import {
  Button,
  Typography,
  Card,
  Box,
  Avatar,
  Skeleton,
  TableCell,
  TableBody,
  Table,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { getTimeEntries, getProjects } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { useLoginInfo } from "../stores/loginState";
import type { TimeEntryData, ProjectData } from "../types";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
} from "recharts";
import {
  workHours,
  timeSpentPercent,
  TopTimeEnteries,
} from "../assets/dummydata";

function ReportSummary() {
  //get time entries
  const userId = useLoginInfo.getState().userId;

  const timeQuery = useQuery<TimeEntryData>({
    queryKey: ["timeEntries"],
    queryFn: () => getTimeEntries(userId),
  });

  //get projects
  const projectQuery = useQuery<ProjectData>({
    queryKey: ["projects"],
    queryFn: () => getProjects(userId),
  });

  //do the math behind
  return (
    <Box
      sx={{
        border: "1px solid black",
        p: 2,
        display: "flex",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          mb: 2,
          display: "flex",
          width: "100%",
          position: "relative",
        }}
      >
        <Typography variant="h4">Reporting</Typography>
        <Button
          variant="contained"
          sx={{ right: 20, position: "absolute", px: 5 }}
        >
          Export
        </Button>
      </Box>
      <Grid
        container
        spacing={1}
        sx={{ border: "1px solid black", display: "flex" }}
      >
        <Grid
          size={{ sm: 12, md: 6 }}
          sx={{
            border: "1px solid black",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Grid
            container
            columns={12}
            spacing={1}
            sx={{
              display: "flex",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <Grid size={{ md: 6, sm: 6, xs: 12 }}>
              <Card
                sx={{
                  border: "1px solid black",
                  height: "200px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {timeQuery.isLoading ? (
                  <Skeleton variant="rectangular" width={210} height={118} />
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar>T</Avatar>
                    <Box>
                      <Typography>Total hours</Typography>
                      <Typography>0.0 h</Typography>
                    </Box>
                  </Box>
                )}
              </Card>
            </Grid>
            <Grid size={{ md: 6, sm: 6, xs: 12 }}>
              <Card
                sx={{
                  border: "1px solid black",
                  height: "200px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {timeQuery.isLoading ? (
                  <Skeleton variant="rectangular" width={210} height={118} />
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar>T</Avatar>
                    <Box>
                      <Typography>Total hours</Typography>
                      <Typography>0.0 h</Typography>
                    </Box>
                  </Box>
                )}
              </Card>
            </Grid>
            <Grid size={{ md: 6, sm: 6, xs: 12 }}>
              <Card
                sx={{
                  border: "1px solid black",
                  height: "200px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {timeQuery.isLoading ? (
                  <Skeleton variant="rectangular" width={210} height={118} />
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar>T</Avatar>
                    <Box>
                      <Typography>Total hours</Typography>
                      <Typography>0.0 h</Typography>
                    </Box>
                  </Box>
                )}
              </Card>
            </Grid>
            <Grid size={{ md: 6, sm: 6, xs: 12 }}>
              <Card
                sx={{
                  border: "1px solid black",
                  height: "200px",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {timeQuery.isLoading ? (
                  <Skeleton variant="rectangular" width={210} height={118} />
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar>T</Avatar>
                    <Box>
                      <Typography>Total hours</Typography>
                      <Typography>0.0 h</Typography>
                    </Box>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
          <Card
            sx={{
              border: "1px solid black",
              width: "100%",
              height: "400px",
              p: 2,
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Statistics
            </Typography>
            {timeQuery.isLoading ? (
              <Skeleton variant="rectangular" width={210} height={118} />
            ) : (
              <Box sx={{ height: "90%", width: "100%" }}>
                <ResponsiveContainer>
                  <BarChart data={workHours}>
                    <YAxis width={20} />
                    <XAxis dataKey={"day"} />
                    <CartesianGrid />
                    <Bar dataKey={"hours"} fill="#1976d2" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Card>
        </Grid>

        <Grid
          size={{ sm: 12, md: 6 }}
          container
          sx={{
            display: "flex",
            border: "1px solid black",
            flexDirection: "column",
          }}
        >
          <Grid size={12}>
            <Card
              sx={{ m: 1, border: "1px solid black", flexDirection: "column" }}
            >
              <Typography variant="h4">Project Overview</Typography>
              {timeQuery.isLoading ? (
                <Skeleton variant="rectangular" width={210} height={118} />
              ) : (
                <Box
                  sx={{
                    border: "1px solid black",
                    height: "400px",
                    width: "100%",
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip />
                      <Pie
                        data={timeSpentPercent}
                        dataKey={"percent"}
                        nameKey="project"
                        fill="#1976d2"
                        label
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Card>
          </Grid>
          <Grid size={12}>
            <Card
              sx={{ m: 1, border: "1px solid black", flexDirection: "column" }}
            >
              <Typography variant="h4" sx={{ margin: 1 }}>
                Top 5 entries
              </Typography>
              {timeQuery.isLoading ? (
                [1, 2, 3, 4, 5].map((number) => (
                  <Skeleton
                    key={number}
                    variant="rectangular"
                    width={210}
                    height={118}
                  />
                ))
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ width: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Project Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Duråation</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {TopTimeEnteries.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell>{entry.description}</TableCell>
                          <TableCell>{entry.projectName}</TableCell>
                          <TableCell>{entry.date}</TableCell>
                          <TableCell>{entry.time}h</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportSummary;
