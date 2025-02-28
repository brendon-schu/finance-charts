import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "T-Shirts", value: 400 },
  { name: "Mugs", value: 300 },
  { name: "Stickers", value: 200 },
  { name: "Hoodies", value: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MerchPieChart = () => {
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default MerchPieChart;
