import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAuth } from "../../contexts/AuthProvider";

// Define the interface for your data structure
interface ChartData {
  apiDate?: string;
  apiCalls?: number;
}

// Convert to functional component with TypeScript
const AreaChartExample: React.FC = () => {
  const { state } = useAuth();
  const { apiUsage } = state.userData?.user || {};

  const chartData: ChartData[] = apiUsage?.dates
    ? Object.entries(apiUsage.dates).map(([date, count]) => ({
        apiDate: date, // e.g., "2025-04-24"
        apiCalls: count, // API call count for that date
      }))
    : [];

  console.log("Chart Data:", chartData);
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="apiDate" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="apiCalls"
            stroke="#020267"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartExample;
