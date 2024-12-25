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
import AppUtils from "../../utils/AppUtils";

interface ChartProps {
  data: any[];
  height?: number;
}
const tooltipDateFormat = "DD MMM, YYYY";

const SubmissionsChart: React.FC<ChartProps> = ({ data, height = 380 }) => {
  return (
    <ResponsiveContainer height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="submissions" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="15%"
              stopColor="rgb(21, 181, 212)"
              stopOpacity={0.8}
            />
            <stop offset="95%" stopColor="rgb(21, 181, 212)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="interviews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => AppUtils.formatDate(date)}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(value) => {
            return AppUtils.formatDate(value, tooltipDateFormat);
          }}
        />

        <Area
          type="monotone"
          dataKey="submissions"
          stroke="rgb(21, 181, 212)"
          fillOpacity={1}
          fill="url(#submissions)"
        />
        <Area
          type="monotone"
          dataKey="interviews"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#interviews)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SubmissionsChart;
