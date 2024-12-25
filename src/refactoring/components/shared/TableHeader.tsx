// import { Button, Typography, Row, Col } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import React from "react";

// const { Title } = Typography;

// interface TableHeaderProps {
//   title?: string;
//   btnText?: string | React.ReactNode;
//   onAddClick?: () => void;
//   centerComponent:React.ReactNode;
// }

// const TableHeader: React.FC<TableHeaderProps> = ({
//   title = "Header",
//   btnText = "Add",
//   onAddClick,
//   centerComponent
// }) => {
//   return (
//     <Row
//       justify="space-between"
//       align="middle"
//       style={{ marginBottom: "10px" }}
//     >
//       <Col >
//         <Title level={4} style={{ margin: "10px 0" }}>
//           {title}
//         </Title>
//       </Col>

//       <Col flex="1 0 auto" >
//         {centerComponent} {/* Render center component */}

//       <Col>
//       </Col>
//         <Col span={3}>
//           <Button type="primary" onClick={onAddClick} icon={<PlusOutlined />}>
//             {btnText}
//           </Button>
//         </Col>
//       </Col>
//     </Row>
//   );
// };

// export default TableHeader;


import { Button, Typography, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

const { Title } = Typography;

interface TableHeaderProps {
  title?: string;
  btnText?: string | React.ReactNode;
  onAddClick?: () => void;
  centerComponent: React.ReactNode;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  title = "Header",
  btnText = "Add",
  onAddClick,
  centerComponent,
}) => {
  return (
    <Row
      justify="space-between"
      align="middle"
      style={{
        marginBottom: "30px",
        display: "flex",
        flexWrap: "nowrap", // Prevent wrapping
      }}
    >
      {/* Title */}
      <Col style={{ margin: 0, padding: 0 }}>
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
      </Col>

      {/* Center Component (Filters) */}
      <Col flex="1" style={{ margin: 5, padding: 0 }}>
        {centerComponent}
      </Col>

      {/* Add Button */}
      {onAddClick && (
        <Col>
          <Button type="primary" onClick={onAddClick} icon={<PlusOutlined />}>
            {btnText}
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default TableHeader;

