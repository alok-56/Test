import React, { useRef } from "react";
import { Col, Modal, Row, Button } from "antd";
import CardItems from "./Cards";
import ResumeLoader from "./Loader";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ViewResumeProps {
  visible: boolean;
  onClose: () => void;
  resumeData: any;
  loading: boolean;
}

const AnalysisOutput: React.FC<ViewResumeProps> = ({
  visible,
  onClose,
  resumeData,
  loading,
}) => {
  const pdfContentRef = useRef(null);

  const downloadPdf = () => {
    if (pdfContentRef.current) {
      const input = pdfContentRef.current;
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "a4",
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / imgHeight;

        const pdfImgHeight = pdfWidth / ratio; // Maintain aspect ratio

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfImgHeight);
        pdf.save("resume.pdf");
      });
    }
  };

  return (
    <Modal
      title={loading ? "" : "Results"}
      open={visible}
      closable={!loading}
      onCancel={onClose}
      footer={
        resumeData && Object.keys(resumeData).length > 0 ? (
          <Button
            type="primary"
            onClick={downloadPdf}
            style={{ marginTop: "10px" }}
          >
            Download PDF
          </Button>
        ) : null
      }
      width={"80%"}
      centered
    >
      {loading ? (
        <ResumeLoader loading={true} />
      ) : (
        <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <div ref={pdfContentRef} id="pdfContent">
            <Row>
              <Col span={12}></Col>
              <CardItems resumeData={resumeData} />
            </Row>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AnalysisOutput;
