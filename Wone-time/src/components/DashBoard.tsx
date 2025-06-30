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

import ProjectSummary from "./ProjectSummary";
import ProjectProgress from "./ProjectProgress";
import NewProject from "./NewProject";

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
} from "recharts";
import { workHours, projectWorkData } from "../assets/dummydata";

const skeleton_load: boolean = false;
function DashBoard() {
  // getting projects
  const project_list: number[] = [1, 2, 4, 5];
  const userId = useLoginInfo.getState().userId;

  const projectQuery = useQuery<ProjectData>({
    queryKey: ["projects"],
    queryFn: () => getProjects(userId),
  });

  const timeQuery = useQuery<TimeEntryData>({
    queryKey: ["timeEntries", userId],
    queryFn: () => getTimeEntries(userId /* should be project id*/),
  });

  // need to go a bunch of math to get the statistics

  //Stuff for the pop up
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Box sx={{ border: "1px solid black", width: "100vw", p: 3 }}>
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
                    0.0h
                  </Typography>
                  <Box
                    sx={{
                      position: "relative",
                      height: "50px",
                      display: "flex",
                      p: "2px",
                    }}
                  >
                    <Box sx={{ borderRight: 1, minWidth: "48%" }}>
                      <Typography>All projects</Typography>
                      <Typography>2 projects</Typography>
                    </Box>
                    <Box sx={{ minWidth: "48%", pl: 3 }}>
                      <Typography>Daily average</Typography>
                      <Typography>0.0h</Typography>
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
                  }}
                >
                  <Typography variant="h4" sx={{ mb: 2 }}>
                    0.0h
                  </Typography>

                  <Box sx={{ width: "100%", height: "50px", display: "flex" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={workHours}>
                        <Bar dataKey={"hours"} fill="#1976d2" />
                      </BarChart>
                    </ResponsiveContainer>
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
            {/* <Typography variant='h6' >Statisitics</Typography> */}
            {timeQuery.isLoading || skeleton_load ? (
              <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Box
                sx={{ width: "100%", height: "100%", display: "flex", p: 0 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectWorkData}
                    margin={{ top: 5, right: 15, bottom: 5, left: 5 }}
                    title="Statisics"
                  >
                    <Legend verticalAlign="top" height={36} />
                    <XAxis dataKey={"day"} />
                    <YAxis width={20} />

                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey={"ProjectA"} fill="#1976d2" />
                    <Bar dataKey={"ProjectB"} fill="#1986d2" />
                    <Bar dataKey={"ProjectC"} fill="#1996d2" />
                  </BarChart>
                </ResponsiveContainer>
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
              Projects Overview
            </Typography>
            {timeQuery.isLoading || skeleton_load
              ? [1, 2, 3, 4].map((number) => (
                  <Skeleton
                    key={number}
                    variant="rectangular"
                    sx={{ width: "100%", height: "20px", mb: 2 }}
                  />
                ))
              : project_list.map((project) => (
                  <ProjectProgress key={project} />
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
              : projectQuery?.data.map((project) => (
                  <ProjectSummary key={project.id} project={project} />
                ))}
          </Box>
        </Grid>
      </Grid>
      <NewProject closeFn={handleClose} visibility={show} />
    </Box>
  );
}

export default DashBoard;
