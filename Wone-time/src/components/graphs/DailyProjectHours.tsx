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
function DailyProjectHours({ projectWeekInfo }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={projectWeekInfo}
        margin={{ top: 5, right: 15, bottom: 5, left: 5 }}
        title="Statisics"
      >
        <Legend verticalAlign="top" height={36} />
        <XAxis dataKey={"day"} />
        <YAxis width={20} />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey={Object.keys(projectWeekInfo[0])[1]} fill="#1976d2" />
        <Bar dataKey={Object.keys(projectWeekInfo[0])[2]} fill="#1986d2" />
        <Bar dataKey={Object.keys(projectWeekInfo[0])[3]} fill="#1996d2" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default DailyProjectHours;
