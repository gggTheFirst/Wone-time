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

import FunctionsIcon from "@mui/icons-material/Functions";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

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
  calcTotalHours,
  getProjectName,
  getProjectWorkData,
  getTopTimeEntries,
  projectTimeInfo,
  weekInfo,
} from "../services/getStatistics";
import HoursInWeek from "./graphs/totalWeekHours";
import DailyProjectHours from "./graphs/DailyProjectHours";
import PieHours from "./graphs/PieHours";

const skeleton_load: boolean = false;
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
  let topEnrtries = [];
  let weeklyStats = [];
  let totalHours: number = 0;
  let projectDetails = [];
  let projectWeekInfo: {
    day: string;
    [projectName: string]: number;
  } = [];

  // need to go a bunch of math to get the statistics
  if (!timeQuery.isLoading && !projectQuery.isLoading) {
    weeklyStats = weekInfo(timeQuery.data);
    totalHours = calcTotalHours(timeQuery.data).toFixed(2);
    projectDetails = projectTimeInfo(timeQuery.data, projectQuery.data);
    projectWeekInfo = getProjectWorkData(timeQuery.data, projectQuery.data);
    topEnrtries = getTopTimeEntries(timeQuery.data);
  }
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
                {timeQuery.isLoading || skeleton_load ? (
                  <Skeleton variant="rectangular" width={210} height={118} />
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <FunctionsIcon
                        color="primary"
                        sx={{ fontSize: "100px" }}
                      />
                    </Box>

                    <Box>
                      <Typography variant="h4">Total hours</Typography>
                      <Typography variant="h5">{totalHours} h</Typography>
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
                {timeQuery.isLoading || skeleton_load ? (
                  <Skeleton variant="rectangular" width={210} height={118} />
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <HourglassBottomIcon
                        color="primary"
                        sx={{ fontSize: "80px" }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h4">Daily average</Typography>
                      <Typography variant="h5">
                        {weeklyStats?.averageHours} h
                      </Typography>
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
              Hours spent on top 3 projects
            </Typography>
            {timeQuery.isLoading || skeleton_load ? (
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: "90%" }}
              />
            ) : (
              <Box sx={{ height: "90%", width: "100%" }}>
                <DailyProjectHours projectWeekInfo={projectWeekInfo} />
                {/* <HoursInWeek dailyTimes={weeklyStats?.dailyTimes} /> */}
              </Box>
            )}
          </Card>
          <Card
            sx={{
              border: "1px solid black",
              width: "100%",
              height: "400px",
              p: 2,
            }}
          >
            <Typography variant="h5" sx={{ mb: 1 }}>
              Statistics of last days
            </Typography>
            {timeQuery.isLoading || skeleton_load ? (
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: "90%" }}
              />
            ) : (
              <Box sx={{ height: "90%", width: "100%" }}>
                <HoursInWeek dailyTimes={weeklyStats?.dailyTimes} />
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
              {timeQuery.isLoading || skeleton_load ? (
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "400px", height: "300px", m: 1 }}
                />
              ) : (
                <Box
                  sx={{
                    border: "1px solid black",
                    height: "400px",
                    width: "100%",
                  }}
                >
                  <PieHours projectDetails={projectDetails} />
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
              {timeQuery.isLoading || skeleton_load ? (
                [1, 2, 3, 4, 5].map((number) => (
                  <Skeleton
                    key={number}
                    variant="rectangular"
                    sx={{ width: "100%", height: "100px", mb: 1 }}
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
                      {topEnrtries.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell>{entry.notes}</TableCell>
                          <TableCell>
                            {getProjectName(entry.projectId, projectQuery.data)}
                          </TableCell>
                          <TableCell>
                            {new Date(entry.date).toISOString().split("T")[0]}
                          </TableCell>
                          <TableCell>
                            {(entry.hours + entry.minutes / 60).toFixed(2)}h
                          </TableCell>
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
