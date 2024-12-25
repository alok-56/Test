import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  //LabelList,
} from "recharts";

interface ChartProps {
  height?: number;
  data: any[];
}

const MatchingKeywordsChart: React.FC<ChartProps> = ({
  height = 420,
  data,
}) => {
  return (
    <ResponsiveContainer height={height}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="keyword" />
        <Tooltip />
        <Bar
          dataKey="count"
          fill="rgb(21, 181, 212)"
          activeBar={{ fill: "rgb(21, 181, 212)" }}
        >
          {/* <LabelList
            dataKey="keyword"
            position="insideRight"
            angle={0}
            fill="white"
          /> */}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MatchingKeywordsChart;
