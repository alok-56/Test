import { Button, Empty } from "antd";
import React from "react";

interface EmptyProps {
  onClear: () => void;
}
const EmptyGraph: React.FC<EmptyProps> = ({ onClear }) => {
  return (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ height: 60 }}
        style={{
          width: "100%",
          height: 390,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        description={<span>No Recruiters data found in the Range</span>}
      >
        <Button type="link" onClick={onClear}>
          Remove Filter
        </Button>
      </Empty>
    </div>
  );
};

export default EmptyGraph;
