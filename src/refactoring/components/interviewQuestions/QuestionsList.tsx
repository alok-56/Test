import React, { CSSProperties, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Collapse,
  CollapseProps,
  Row,
  Spin,
  Tooltip,
  Typography,
  theme,
} from "antd";
import { CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import {
  CustomDifficultyComponent,
  CustomTagsComponent,
} from "../../utils/CustomButton";
import MarkdownRenderer from "../shared/MarkdownRenderer";
import chatBot from "../../../assets/chatbot.jpg";
import { capitalizeFirstLetter } from "../../../components/User/UserModal";
import html2canvas from "html2canvas";
const { Paragraph, Text } = Typography;
import jsPDF from "jspdf";
import { useUser } from "../../../context/UserContext";

interface QuestionsListProps {
  questions: any[];
  difficultyLevel: any;
  tags: any[];
  notes: string;
  selectedInterview: any;
}
const QuestionList: React.FC<QuestionsListProps> = ({
  questions,
  difficultyLevel,
  tags,
  notes,
  selectedInterview,
}) => {
  const [loading, setLoading] = useState(false);
  const [activeKeys, setActiveKeys] = useState(
    questions.map((_, index) => index.toString())
  );

const {isAdmin}=useUser()
  const { token } = theme.useToken();
  const pdfContentRef = useRef(null);
  const panelStyle: CSSProperties = {
    marginBottom: 12,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const getItems = (panelStyle: CSSProperties): CollapseProps["items"] => {
    if (!questions || questions.length === 0) {
      return [
        {
          key: "noQuestions",
          label: <Paragraph type="secondary">No questions available</Paragraph>,
          style: panelStyle,
          showArrow: false,
        },
      ];
    }
    return questions.map((question: any, index: number) => ({
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

  useEffect(()=>{
    if(questions){
      setActiveKeys(questions?.map((_:any, index:any) => index.toString()))
    }
  },[questions])

  // const downloadPdf = () => {
  //   if (pdfContentRef.current) {
  //     setLoading(true); // Set loading state to true when the download starts

  //     const input = pdfContentRef.current;

  //     // Use html2canvas to capture the content
  //     html2canvas(input, { scale: 2 }).then((canvas) => {
  //       const imgData = canvas.toDataURL("image/png");
  //       const pdf = new jsPDF({
  //         orientation: "portrait",
  //         unit: "pt",
  //         format: "a4", // A4 size
  //       });

  //       const pdfWidth = pdf.internal.pageSize.getWidth(); // Get PDF page width
  //       const pdfHeight = pdf.internal.pageSize.getHeight(); // Get PDF page height
  //       const imgWidth = canvas.width; // Image width
  //       const imgHeight = canvas.height; // Image height

  //       // Calculate the aspect ratio to maintain scaling
  //       const ratio = imgWidth / imgHeight;
  //       const pdfImgHeight = pdfWidth / ratio; // Maintain the aspect ratio for height

  //       let yOffset = 0; // Start at the top of the page

  //       // Add first page with the content
  //       pdf.addImage(imgData, "PNG", 0, yOffset, pdfWidth, pdfImgHeight);

  //       // Now, handle the content for subsequent pages
  //       while (yOffset + pdfImgHeight < imgHeight) {
  //         yOffset += pdfHeight; // Move down by one full page height

  //         if (yOffset + pdfImgHeight <= imgHeight) {
  //           pdf.addPage(); // Add a new page
  //           pdf.addImage(imgData, "PNG", 0, -yOffset, pdfWidth, pdfImgHeight); // Adjust the image for the next page
  //         }
  //       }

  //       pdf.save(`${selectedInterview?.vendor}-${selectedInterview?.client}-${new Date(Date.now()).toLocaleDateString('en-GB')}`);
  //       setLoading(false); // Set loading state to false once the PDF is saved
  //     });
  //   }
  // };

  const downloadPdf = () => {
    if (pdfContentRef.current) {
      setLoading(true);

      const input = pdfContentRef.current;

      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4",
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const ratio = imgWidth / imgHeight;
        const pdfImgHeight = pdfWidth / ratio;

        let yOffset = 0;
        let pageCount = Math.ceil(Math.ceil(imgHeight / pdfHeight) / 2);

        for (let page = 0; page < pageCount; page++) {
          if (page > 0) {
            pdf.addPage();
          }

          const yPosition = -page * pdfHeight;
          pdf.addImage(imgData, "PNG", 0, yPosition, pdfWidth, pdfImgHeight);

          yOffset += pdfHeight;
        }

        const fileName = `${selectedInterview?.vendor}-${selectedInterview?.client}-${new Date(Date.now()).toLocaleDateString("en-GB")}`;
        pdf.save(fileName);
        setLoading(false);
      });
    }
  };

  return (
    <div ref={pdfContentRef} id="pdfContent">
      <Spin spinning={loading}>
      <Card
        title={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Text strong>Tags:- </Text>
              {CustomTagsComponent(tags)}
            </div>
            <div>
              <div>
                <Text strong>Difficulty Level:- </Text>
                {CustomDifficultyComponent(difficultyLevel)}
              </div>
            </div>
          </div>
        }
        extra={
          isAdmin &&(<Spin spinning={loading}>
            <Button onClick={downloadPdf}>Download</Button>
          </Spin>)
        }
      >
        <div>
          <Collapse
            activeKey={activeKeys}
            bordered={false}
            style={{ background: token.colorBgContainer }}
            items={getItems(panelStyle)}
            
          />
          <Row>
            <Text strong>Notes</Text>
          </Row>
          <Row style={{ paddingLeft: 8 }}>
            {capitalizeFirstLetter(notes) ?? <Text type="secondary">-</Text>}
          </Row>
        </div>
      </Card>
      </Spin>
    </div>
  );
};

export default QuestionList;
