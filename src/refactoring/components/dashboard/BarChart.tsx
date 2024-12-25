import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  data: any[];
  height?: number;
}

const RecruitersCharts: React.FC<ChartProps> = ({ data, height = 380 }) => {
    

  
  return (
    <>
      <ResponsiveContainer height={height}>
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip cursor={{ fill:"transparent" }} />
          
          <Bar
            dataKey="total"
            fill="rgb(21, 181, 212)"
            activeBar={<Rectangle fill="rgb(21, 181, 212)" stroke="dark"     />}
            
            
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RecruitersCharts;
