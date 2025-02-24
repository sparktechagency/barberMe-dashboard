import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useRevenueStasticsQuery } from "../../../redux/apiSlices/dashboardSlice";

const SalesTrackingChart = () => {
  const { data: revenueData, isLoading } = useRevenueStasticsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const revenue = revenueData?.data;
  console.log(revenue);

  return (
    <ResponsiveContainer width="95%" height={250}>
      <BarChart
        data={revenue}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barCategoryGap="30%" // Adjust gap between bars
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Thinner bars */}
        <Bar
          dataKey="revenue"
          stackId="a"
          fill="#8b0000"
          radius={[20, 20, 0, 0]} // Optional: rounded top corners
          barSize={25} // Make bars thinner
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesTrackingChart;
