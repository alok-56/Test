import React from "react";
import { Button, Col, Modal, Row, Spin, Typography } from "antd";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";
import QuestionList from "./QuestionsList";
import { EditOutlined } from "@ant-design/icons";
const { Title } = Typography;

interface InterviewPreparationModalProps {
  selectedInterview: Record<string, any> | null;
  handleCancel: () => void;
  onInterviewPraparationAdded: () => void;
  handleEdit: () => void;
  loading:boolean;
}

const ViewInterviewPreparation: React.FC<InterviewPreparationModalProps> = ({
  selectedInterview,
  handleCancel,
  handleEdit,
  loading
}) => {

  const renderListingItems = () => {
    if (!selectedInterview) return <p>No interview data available.</p>;
    return columnsView.map((item: any) => {
      const type = item?.type;
      const interviewQuestions = item.key === "questions";

      if (interviewQuestions) {
        return (
          <Col span={24}>
            <QuestionList
              questions={selectedInterview[item?.key]}
              difficultyLevel={selectedInterview?.difficultyLevel}
              notes={selectedInterview?.notes}
              tags={selectedInterview?.tags}
              selectedInterview={selectedInterview}
            />
          </Col>
        );
      }
      if (item.isFullRow) {
        return (
          <Col span={24}>
            <LabelWithValue item={item} data={selectedInterview} />
          </Col>
        );
      }

      if (type === "header") {
        return (
          <Col span={24}>
            <Title level={5} style={{ margin: 0, padding: "8px 0" }}>
              {item.label}
            </Title>
          </Col>
        );
      }
      return (
        <>
          <Col span={6} key={item.label}>
            <LabelWithValue item={item} data={selectedInterview} />
          </Col>
        </>
      );
    });
  };

  return (
    <Modal
      title="Interview Questions"
      open={true}
      onCancel={handleCancel}
      footer={[
        <Button
        type="primary"
        ghost
        icon={<EditOutlined />}
        style={{ marginLeft: 10 }}
        onClick={handleEdit}
      >
        Edit
      </Button>,
        <Button onClick={handleCancel}>Close</Button>,
      ]}
      width="70%"
      centered
    >
      <Spin spinning={loading}><div style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Row>{renderListingItems()}</Row>
      </div></Spin>
    </Modal>
  );
};

export default ViewInterviewPreparation;
