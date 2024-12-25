import React, { CSSProperties, useMemo } from "react";
import {
  Card,
  Col,
  Collapse,
  Flex,
  List,
  Row,
  Table,
  Tag,
  Tooltip,
  Typography,
  message,
  theme,
} from "antd";
import { CaretRightOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { capitalizeFirstLetter } from "../../../components/User/UserModal";
import { formatResumeData } from "./helper";
import MatchingKeywordsChart from "./MatchingChart";
import CustomPieChart from "./OverviewChart";

const { Panel } = Collapse;
const { Text } = Typography;

interface CardItemsProps {
  resumeData: any;
}

const CustomTag = ({ value, isFound, tooltip }: any) => {
  return (
    <Tooltip title={tooltip}>
      <Tag color={isFound ? "#87d068" : "#f50"}>{value}</Tag>
    </Tooltip>
  );
};

const renderBasicValidationItems = (
  items: { key: string; value: string | boolean | number | null }[]
) => {
  return items.map(({ key, value }) => {
    const _value = capitalizeFirstLetter(key);

    return (
      <CustomTag
        key={key}
        value={_value}
        isFound={value}
        tooltip={value ? "Found" : "Missing"}
      />
    );
  });
};

const renderRecommendations = (recommendations: string[]) => {
  return (
    <List
      dataSource={recommendations}
      renderItem={(item) => (
        <List.Item>
          <Row gutter={4} align={"bottom"}>
            <Col>
              <Text>
                <CheckCircleTwoTone
                  twoToneColor="#87d068"
                  style={{ fontSize: 18 }}
                />
              </Text>
            </Col>
            <Col> {item}</Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

const renderKeywords = (keywords: any) => {
  const keywordCounts: any = useMemo(
    () =>
      Object.entries(keywords)
        .map(([keyword, count]) => ({
          keyword,
          count,
        }))
        .sort((a: any, b: any) => b.count - a.count),
    [keywords]
  );
  const columns = [
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      render: (text: any, record: any) => (
        <Tag color={record.count > 0 ? "#87d068" : "#f50"}>{text}</Tag>
      ),
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      sorter: (a: any, b: any) => a.count - b.count,
    },
  ];
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title="Table Representation" size="small" style={{ flex: 1 }}>
          <Table
            dataSource={keywordCounts}
            columns={columns as any}
            pagination={false}
            size="small"
            style={{ maxHeight: 420, overflow: "auto" }}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card size="small" title="Graphical Representation">
          <MatchingKeywordsChart data={keywordCounts} />
        </Card>
      </Col>
    </Row>
  );
};

const getItems = (
  resumeData: any,
  panelStyle: CSSProperties
): React.ReactNode => {
  if (!resumeData) return null;
  const { basicValidations, recommendations, keywords } = useMemo(
    () => formatResumeData(resumeData),
    [resumeData]
  );
  return (
    <>
      <Panel
        key="basic-validation"
        header={<Text strong>Overall</Text>}
        style={panelStyle}
      >
        <Row>
          <Col span={12}>
            <CustomPieChart resumeData={resumeData} />
          </Col>
          <Col span={12}>
            <Card title="Basic Validation" style={{ paddingBottom: 16 }}>
              <Flex gap={4} wrap="wrap">
                {renderBasicValidationItems(basicValidations)}
              </Flex>
            </Card>
          </Col>
        </Row>
      </Panel>

      <Panel
        key="keywords"
        header={<Text strong>Keywords</Text>}
        style={panelStyle}
        showArrow={true}
      >
        {/* <Flex gap={4} wrap="wrap" align="center"> */}
        {renderKeywords(keywords)}
        {/* </Flex> */}
      </Panel>

      <Panel
        key="recommendations"
        header={<Text strong>Recommendations</Text>}
        style={panelStyle}
        showArrow={true}
      >
        {renderRecommendations(recommendations)}
      </Panel>
    </>
  );
};

const CardItems: React.FC<CardItemsProps> = ({ resumeData }) => {
  const { token } = theme.useToken();

  const panelStyle: CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  if (
    !resumeData ||
    typeof resumeData.matched_keywords !== "object" 
  ) {
    message.error("Data is invalid")
    return(<div>Invalid Data</div>)
  }
  return (
    <div style={{ width: "100%" }}>
      <Collapse
        bordered={false}
        style={{ background: token.colorBgContainer }}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            rotate={isActive ? 270 : 90}
            style={{ color: "rgb(21, 181, 212)", fontSize: 16 }}
          />
        )}
        expandIconPosition="end"
        defaultActiveKey={["basic-validation", "keywords", "recommendations"]}
      >
        {getItems(resumeData, panelStyle)}
      </Collapse>
    </div>
  );
};

export default CardItems;
