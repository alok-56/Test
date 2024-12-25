import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Spin, Typography } from "antd";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";
import InterviewType from "../interviewQuestions/InterviewType";
import QuestionList from "../interviewQuestions/QuestionsList";
import InterviewPreparationService from "../../services/InterviewQuestions";
import useGet from "../../hooks/useGet";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
interface InterviewModalProps {
  selectedInterview: any | null;
  handleCancel: () => void;
  handleEditInterview: () => void;
  handleDelete: () => void;
}
const ViewInterview: React.FC<InterviewModalProps> = ({
  selectedInterview,
  handleCancel,
  handleEditInterview,
  handleDelete,
}) => {
  const { fetchData, data, loading } = useGet();
  const [showModal, setShowModal] = useState<any>(false);


  const getInterviewQuestion = async () => {
    await fetchData(
      new InterviewPreparationService().getInterviewQuestionsById(
        selectedInterview?._id
      )
    );
  };
  useEffect(() => {
    getInterviewQuestion();
  }, []);
  const onInterviewQuestionAdded = () => {
    getInterviewQuestion();
  };

  const handleAddQuestion = () => {
    setShowModal(true);
    //handleCancel()
  };
  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      const type = item?.type;
      const interview = item.key === "interviewQuestions";

      if (interview) {
        return (
          <Col span={24} key={item.key}>
            <Text>{item.label}</Text>
            <div>
              {data && Object.keys(data).length > 0 ? (
                <div>
                  <QuestionList
                    questions={data.questions}
                    difficultyLevel={data.difficultyLevel}
                    notes={data.notes}
                    tags={data.tags}
                    selectedInterview={selectedInterview}
                  />
                </div>
              ) : (
                <Text type="secondary">No questions available</Text>
              )}
            </div>
          </Col>
        );
      }
      if (item.isFullRow) {
        return (
          <Col span={24} key={item.key}>
            <LabelWithValue item={item} data={selectedInterview} />
          </Col>
        );
      }

      if (type === "header") {
        return (
          <Col span={24} key={item.key}>
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
    <>
      <Modal
        title="Interview Details"
        open={true}
        onCancel={handleCancel}
        footer={[
          data && data.questions && data.questions.length > 0 ? (
            <Button
              key="editInterview"
              icon={<EditOutlined />}
              type="primary"
              ghost
              onClick={handleAddQuestion}
            >
              Update Questions
            </Button>
          ) : (
            <Button
              key="addQuestion"
              type="primary"
              ghost
              icon={<PlusOutlined />}
              onClick={handleAddQuestion}
            >
              Add Question
            </Button>
          ),
          <Button
            icon={<EditOutlined />}
            type="primary"
            ghost
            onClick={handleEditInterview}
          >
            Edit
          </Button>,
          <Button icon={<DeleteOutlined />} danger onClick={handleDelete}>
            Delete
          </Button>,
        ]}
        width={"70%"}
        centered
      >
        <Spin spinning={loading}>
          <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
            <Row>{renderListingItems()}</Row>
          </div>
        </Spin>
      </Modal>
      {showModal && (
        <InterviewType
          onCancel={() => setShowModal(false)}
          selectedInterviewQuestion={selectedInterview}
          onInterviewQuestionAdded={onInterviewQuestionAdded}
          selected={data}
        />
      )}
    </>
  );
};

export default ViewInterview;
