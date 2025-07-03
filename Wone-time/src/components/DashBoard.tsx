import {
  Button,
  Typography,
  Card,
  Box,
  CardContent,
  Skeleton,
  Grid,
} from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import ProjectSummary from "./ProjectSummary";
import ProjectProgress from "./ProjectProgress";
import NewProject from "./NewProject";
import BufferLoader from "./buffer";
import DailyProjectHours from "./graphs/DailyProjectHours";
import HoursInWeek from "./graphs/totalWeekHours";

import { useState } from "react";
import { useLoginInfo } from "../stores/loginState";
import { useQuery } from "@tanstack/react-query";

import { type ProjectData, type TimeEntryData } from "../types";
import { getProjects, getTimeEntries } from "../services/api";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import {
  calcTotalHours,
  getProjectWorkData,
  projectTimeInfo,
  weekInfo,
} from "../services/getStatistics";

const skeleton_load: boolean = false;
function DashBoard() {
  // getting projects
  const project_list: number[] = [1, 2, 4, 5];
  const userId = useLoginInfo.getState().userId;

  const projectQuery = useQuery<ProjectData>({
    queryKey: ["projects"],
    queryFn: () => getProjects(userId),
  });

  // getting time entries
  const timeQuery = useQuery<TimeEntryData>({
    queryKey: ["timeEntries", userId],
    queryFn: () => getTimeEntries(userId /* should be project id*/),
  });

  let weeklyStats;
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
  }

  //Stuff for the pop up
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Grid size={12} sx={{ border: "1px solid black", p: 3, width: "100vw" }}>
      <Typography variant="h4">Dashboard</Typography>
      <Grid container spacing={1}>
        <Grid size={{ sm: 12, md: 6 }} sx={{ border: "1px solid black", p: 2 }}>
          <Box
            sx={{
              border: "1px solid black",
              p: 1,
              mb: 2,
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "red",
            }}
          >
            <Card
              sx={{
                border: "1px solid black",
                width: "48%",
                height: "100%",
                position: "relative",
              }}
            >
              <Box sx={{ Width: "100%", display: "flex", p: 1 }}>
                <Typography variant="h5">Total hours</Typography>
                <TimerIcon sx={{ position: "absolute", right: "5px" }} />
              </Box>
              {timeQuery.isLoading || skeleton_load ? (
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "100%", height: "120px" }}
                />
              ) : (
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "120px",
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    {totalHours}h
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      height: "50px",
                      display: "flex",
                      p: "2px",
                    }}
                  >
                    <Box sx={{}}>
                      <Typography variant="h6">All projects:</Typography>

                      <Typography>
                        {projectQuery?.data && projectQuery?.data.length}{" "}
                        Projects
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              )}
            </Card>

            <Card
              sx={{
                border: "1px solid black",
                width: "48%",
                height: "100%",
                position: "relative",
              }}
            >
              <Box sx={{ Width: "100%", display: "flex", p: 1 }}>
                <Typography variant="h5">Week to date</Typography>
                <DateRangeIcon sx={{ position: "absolute", right: "5px" }} />
              </Box>
              {timeQuery.isLoading || skeleton_load ? (
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "100%", height: "120px" }}
                />
              ) : (
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "120px",
                    pb: 0,
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    {weeklyStats?.totalHours}h
                  </Typography>
                  <Box sx={{ minWidth: "48%", pl: 3 }}>
                    <Typography variant="h6">Daily average</Typography>
                    <Typography>{weeklyStats?.averageHours}h</Typography>
                  </Box>
                </CardContent>
              )}
            </Card>
          </Box>
          <Card
            sx={{
              border: "1px solid black",
              height: "200px",
              display: "flex",
              p: 1,
              mb: 2,
              flexDirection: "column",
            }}
          >
            {projectWeekInfo?.length === 0 || skeleton_load ? (
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: 0,
                }}
              >
                <Typography variant="h5">Hours worked this week</Typography>
                <HoursInWeek dailyTimes={weeklyStats?.dailyTimes} />
              </Box>
            )}
          </Card>
          <Card
            sx={{
              border: "1px solid black",
              height: "200px",
              display: "flex",
              flexDirection: "column",
              p: 1,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Projects Overview of time spent
            </Typography>
            {timeQuery.isLoading || skeleton_load
              ? [1, 2, 3, 4].map((number) => (
                  <Skeleton
                    key={number}
                    variant="rectangular"
                    sx={{ width: "100%", height: "20px", mb: 2 }}
                  />
                ))
              : projectDetails.map((project, index) => (
                  <ProjectProgress
                    key={index}
                    projectTotal={project.totalHours}
                    totalHours={totalHours}
                    projName={project.name}
                  />
                ))}
          </Card>
        </Grid>
        <Grid
          size={{ sm: 12, md: 6 }}
          sx={{
            border: "1px solid black",
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", position: "relative", m: 2, my: 0 }}>
            <Typography variant="h5">Projects</Typography>
            <Button
              variant="contained"
              sx={{ position: "absolute", right: "10px", px: 5 }}
              onClick={handleClick}
            >
              Add new
            </Button>
          </Box>
          <Typography variant="body1" sx={{ ml: 2, mb: 2 }}>
            Overview of your projects
          </Typography>

          <Box
            sx={{
              border: "1px solid black",
              width: "95%",
              height: "98%",
              display: "flex",
              flexDirection: "column",
              p: 1,
            }}
          >
            {projectQuery.isLoading || skeleton_load
              ? [1, 2, 3, 4].map((number) => (
                  <Skeleton
                    key={number}
                    variant="rectangular"
                    sx={{ width: "100%", height: "80px", mb: 2 }}
                  />
                ))
              : projectDetails.map((project, index) => (
                  <ProjectSummary key={index} project={project} />
                ))}
          </Box>
        </Grid>
      </Grid>
      <NewProject closeFn={handleClose} visibility={show} />
    </Grid>
  );
}

export default DashBoard;
