import React from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {`${value.toFixed(2)}`}{" "}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
        <br />
      </text>
    </g>
  );
};

const getColor = (percentage: any) => {
  if (percentage >= 75) return "#87d068"; // green
  if (percentage >= 60) return "#FFA500"; // orange
  return "#f33a34"; // red
};

const getLighterColor = (color: any) => {
  switch (color) {
    case "#87d068":
      return "#d0f1c7"; // light green
    case "#FFA500":
      return "#f3b26d"; // light orange
    case "#FFBB28":
      return "#f8d972"; // light yellow
    case "#f33a34":
      return "#f8c2c0"; // light red
    default:
      return "#fff";
  }
};

const CustomPieChart = ({ resumeData }: any) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  const matchingPercentage = resumeData.matching_percentage;
  const matchedColor = getColor(matchingPercentage);
  const data = [
    { name: "Matched", value: matchingPercentage, color: matchedColor },
    {
      name: "Missing",
      value: 100 - matchingPercentage,
      color: getLighterColor(matchedColor),
    },
  ];

  return (
    <ResponsiveContainer height={260}>
      <PieChart >
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={"50%"}
          cy={"50%"}
          innerRadius={50}
          outerRadius={75}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
