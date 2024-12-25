

import React from "react";
import { Card, Spin } from "antd";
import SubmissionsChart from "./AreaChart";
import RecruitersCharts from "./BarChart";
import EmptyGraph from "./EmptyGraph";

interface GraphCardProp{
  title:string
    data:any[]
    loading:boolean
    handleClearFilters:()=>void
}

const GraphCard:React.FC<GraphCardProp> = ({ title, data, loading, handleClearFilters }) => {
  return (
    <Card
      title={title}
      size="small"
      style={{
        width: "100%",
        height: 450,
        borderRadius: 8,
      }}
    >
      <Spin spinning={loading}>
        {data?.length === 0 ? (
          <EmptyGraph onClear={handleClearFilters} />
        ) : title === "Submissions" ? (
          <SubmissionsChart data={data} />
        ) : (
          <RecruitersCharts data={data} />
        )}
      </Spin>
    </Card>
  );
};

export default GraphCard;
