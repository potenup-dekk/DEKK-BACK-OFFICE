"use client";

import { DailyAddedCodiPoint } from "@/shared/constants/back-office-data";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DailyAddedCodiBarChartProps {
  data: DailyAddedCodiPoint[];
}

const DailyAddedCodiBarChart = ({ data }: DailyAddedCodiBarChartProps) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="#bfbfbf" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#333333" tickLine={false} axisLine={false} />
          <YAxis stroke="#333333" tickLine={false} axisLine={false} />
          <Tooltip />
          <Bar dataKey="addedCount" fill="#333333" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyAddedCodiBarChart;
