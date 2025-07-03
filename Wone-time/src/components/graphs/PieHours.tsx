import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

function PieHours({ projectDetails }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip />
        <Pie
          data={projectDetails}
          dataKey={"totalHours"}
          nameKey="name"
          fill="#1976d2"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieHours;
