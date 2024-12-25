import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Row,
  Spin,
  theme,
  Tooltip,
  Typography,
} from "antd";
import { CSSProperties } from "react";
import { capitalizeFirstLetter } from "../../../components/User/UserModal";
import MarkdownRenderer from "../shared/MarkdownRenderer";
import chatBot from "../../../assets/chatbot.jpg";

const { Paragraph } = Typography;
interface TrainingQuestionsProps {
  questionslist: any;
  questionsLoading: boolean;
  positionLoading: boolean;
}
const TrainingQuestions: React.FC<TrainingQuestionsProps> = ({
  questionslist,
  questionsLoading,
  positionLoading,
}) => {
  const { token } = theme.useToken();
  const allQuestionList = questionslist?.data
    ?.map((item: any) => item.questions)
    .flat();

  const panelStyle: CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const getItems = (panelStyle: CSSProperties): CollapseProps["items"] => {
    if (!allQuestionList || allQuestionList.length === 0) {
      return [
        {
          key: "noQuestions",
          label: <Paragraph type="secondary">No questions available</Paragraph>,
          style: panelStyle,
          showArrow: false,
        },
      ];
    }
    return allQuestionList.map((question: any, index: number) => ({
      key: index.toString(),
      label: (
        <Paragraph
          ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
          copyable={{ text: `${question.text}` }}
          style={{ marginBottom: 0, display: "flex" }}
        >
          <CheckCircleOutlined
            style={{ marginRight: 8, fontSize: 20, color: "green" }}
          />
          {`${index + 1}. ${capitalizeFirstLetter(question.text)}`}
        </Paragraph>
      ),
      children: (
        <Row style={{ display: "flex", flexDirection: "column" }}>
          <Col>
            <MarkdownRenderer message={question?.answer || "-"} />
          </Col>
          <Col
            style={{
              alignSelf: "flex-end",
              color: "#fff",
              fontSize: "25px",
            }}
          >
            {" "}
            {question.promptBy === 0 ? (
              <Tooltip title="AI Assistant">
                <Avatar src={chatBot} />
              </Tooltip>
            ) : (
              <Tooltip title="You">
                <Avatar
                  size={24}
                  icon={<UserOutlined />}
                  style={{
                    color: "#F4F4F4",
                    backgroundColor: "rgb(21, 181, 212)",
                  }}
                />
              </Tooltip>
            )}
          </Col>
        </Row>
      ),
      style: panelStyle,
      showArrow: false,
    }));
  };

  return (
    <div>
      <Card
        title="Frequently Asked Questions"
        bordered={false}
        style={{ width: "100%" }}
      >
        <Spin spinning={questionsLoading || positionLoading}>
          <div>
            <Collapse
              bordered={false}
              style={{ background: token.colorBgContainer }}
              items={getItems(panelStyle)}
            />
          </div>
        </Spin>
      </Card>
    </div>
  );
};

export default TrainingQuestions;
