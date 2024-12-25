import { useState } from "react";
import { Button, Card, Col, Input, Row, Typography, message } from "antd";
import { ScanOutlined } from "@ant-design/icons";
import mammoth from "mammoth";

import pdfToText from "react-pdftotext";
import usePost from "../../hooks/usePost";
import { formatCreateResume } from "./helper";
import ResumeAnalyzerService from "../../services/ResumeService";

import AnalysisOutput from "./AnalysisOutput";

const { Title } = Typography;
const resumeService = new ResumeAnalyzerService();

const Analyzer = () => {
  const { postData, data, loading } = usePost();

  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleCreateResume = async () => {
    const resumeDetails = { resumeText, jobDescriptionText };
    const payload = await formatCreateResume(resumeDetails);
    try {
      await postData(resumeService.createResumeAnalyzer(), payload);
      message.success("Your resume has been successfully checked by our ATS.");
    } catch (e) {
      message.error("Something went wrong, try again");
    }
  };

  const handleClickToScan = async () => {
    if (!resumeText.trim() || !jobDescriptionText.trim()) {
      message.error(
        "Please ensure that both the resume and job description fields are filled out."
      );
      return;
    }
    await handleCreateResume();
    setModalVisible(true);
  };

  const handleFileUpload = async (file: any) => {
    const fileType = file.type;
    const arrayBuffer = await file.arrayBuffer();
    if (fileType === "application/pdf") {
      try {
        const text = await pdfToText(file);
        setResumeText(text);
      } catch (error: any) {
        message.error("Error extracting text from PDF:", error);
      }
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      try {
        const result = await mammoth.extractRawText({ arrayBuffer });
        setResumeText(result.value);
      } catch (error: any) {
        message.error("Error extracting text from DOCX/DOC:", error);
      }
    } else {
      message.error("Unsupported file type");
    }
    return false;
  };

  const extractText = async (event: any) => {
    const file = event.target.files[0];
    await handleFileUpload(file);
  };

  return (
    <>
      <div style={{ width: "100%", minHeight: "500px" }}>
        <title>Thinklusive - Resume Analyzer</title>

        <Card
          title="Resume Analyzer"
          extra={
            <Button
              type="primary"
              icon={<ScanOutlined />}
              onClick={handleClickToScan}
              loading={loading}
            >
              Scan
            </Button>
          }
        >
          <Row gutter={16}>
            <Col span={12}>
              <Title level={5} style={{ textAlign: "center" }}>
                Resume
              </Title>
              <div style={{ position: "relative" }}>
                <Input.TextArea
                  rows={20}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume here or upload a file"
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                  }}
                >
                  <Input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={extractText}
                  />
                </div>
              </div>
              {resumeText && (
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <Button type="text" onClick={() => setResumeText("")}>
                    Clear
                  </Button>
                </div>
              )}
            </Col>
            <Col span={12}>
              <Title level={5} style={{ textAlign: "center" }}>
                Job Description
              </Title>
              <Input.TextArea
                rows={20}
                value={jobDescriptionText}
                onChange={(e) => setJobDescriptionText(e.target.value)}
                placeholder="Paste the job description here"
              />
              {jobDescriptionText && (
                <div style={{ textAlign: "center", marginTop: 8 }}>
                  <Button type="text" onClick={() => setJobDescriptionText("")}>
                    Clear
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Card>
      </div>

      <AnalysisOutput
        loading={loading} //loading
        visible={loading || modalVisible} //loading||modalVisible
        onClose={handleCancel}
        resumeData={data && data} // data
      />
    </>
  );
};

export default Analyzer;
