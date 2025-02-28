import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useUserStatisticsQuery } from "../../../redux/apiSlices/dashboardSlice";

const UserEngagement = () => {
  const { data: userStatistics, isLoading } = useUserStatisticsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const statistics = userStatistics?.data;
  //console.log(statistics);

  return (
    <div className="bg-white p-6 w-[100%] h-[350px] rounded-2xl border">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-lg">User Engagement</h2>
      </div>
      <ResponsiveContainer width="95%" height="100%">
        <LineChart
          data={statistics}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tickFormatter={(month) => month.slice(0, 3)} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" />
          <Line
            type="monotone"
            dataKey="barbers"
            stroke="#8b0000"
            activeDot={{ r: 8 }}
            fill="#8b0000"
          />
          <Line type="monotone" dataKey="customers" stroke="#5c2579cc" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserEngagement;
