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
import { Typography, Box } from "@mui/material";

function HoursInWeek({ dailyTimes }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={dailyTimes}
        margin={{ top: 5, right: 15, bottom: 5, left: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        ba
        <XAxis dataKey={"day"} />
        <YAxis width={20} /> <Tooltip />
        <Bar barSize={30} dataKey={"hours"} fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default HoursInWeek;
