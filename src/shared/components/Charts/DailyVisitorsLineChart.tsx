"use client";

import { DailyVisitorsPoint } from "@/shared/constants/back-office-data";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DailyVisitorsLineChartProps {
  data: DailyVisitorsPoint[];
}

const DailyVisitorsLineChart = ({ data }: DailyVisitorsLineChartProps) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="#bfbfbf" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#333333" tickLine={false} axisLine={false} />
          <YAxis stroke="#333333" tickLine={false} axisLine={false} />
          <Tooltip />
          <Line type="monotone" dataKey="visitors" stroke="#333333" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyVisitorsLineChart;
