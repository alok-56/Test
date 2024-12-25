import React from "react";
import { Card, Col, Row, Statistic, Tooltip} from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DashboardService from "../../services/DashboardService";

type CardsProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  growth: string | number;
  link: string;
};

const dashboardService = new DashboardService();

const Cards: React.FC<CardsProps> = ({
  title,
  value,
  icon,
  growth,
  link,
}): JSX.Element => {
  return (
    <Col span={6}>
      <Card
        size="small"
        title={title}
        extra={
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={`In last ${dashboardService.recentDays} days`}>
              <div style={{ display: "flex" }}>
                <CaretUpOutlined style={{ fontSize: 20, color: "#3f8600" }} />

                <Statistic
                  value={growth}
                  valueStyle={{ color: "#3f8600", fontSize: 14, marginLeft: 4 }}
                />
              </div>
            </Tooltip>
          </div>
        }
        style={{
          borderRadius: 8,
          boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Statistic
              value={value}
              valueStyle={{ fontSize: 30, fontWeight: 400, paddingBottom: 8 }}
            />

            <div style={{ fontSize: 12 }}>
              <Link to={link}>See {title}</Link>
            </div>
          </Col>
          <Col>
            <span
              style={{
                fontSize: 18,
                padding: 5,
                borderRadius: 5,
                alignSelf: "flex-end",
              }}
            >
              {icon}
            </span>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default Cards;
