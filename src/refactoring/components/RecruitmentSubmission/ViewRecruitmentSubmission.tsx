import React from "react";
import { Button, Col, Modal, Row, Typography } from "antd";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";
import { EditOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;
interface RecruitmentSubmissionModalProps {
  selectedRecruitment?: any | null;
  handleCancel: () => void;
  handleEdit: () => void;
}

const ViewRecruitmentSubmission: React.FC<RecruitmentSubmissionModalProps> = ({
  selectedRecruitment,
  handleCancel,
  handleEdit,
}) => {
  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      if (
        item.key === "uploads" &&
        selectedRecruitment &&
        selectedRecruitment.uploads
      ) {
        return (
          <Col span={24} key={item.key}>
            <Text>Attachments</Text>
            <div>
           {selectedRecruitment.uploads.length>0 ?selectedRecruitment.uploads.map(
              (upload: {url:string,fileName:string,filename:string}, index: number) => (
                <div key={index}>
                  <Link href={upload?.url}>
                    {index + 1}.
                    {upload?.filename ||
                      upload?.fileName ||
                      "Resume(No File Exists)"}
                  </Link>
                </div>
              )
            ):"----"}
           </div>
          </Col>
        );
      }
      const type = item?.type;
      if (item.isFullRow) {
        return (
          <Col span={24}>
            <LabelWithValue item={item} data={selectedRecruitment} />
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
            <LabelWithValue item={item} data={selectedRecruitment} />
          </Col>
        </>
      );
    });
  };

  return (
    <Modal
      title="Recruitment Details"
      open={true}
      onCancel={handleCancel}
      footer={[
        <Button
          icon={<EditOutlined />}
          type="primary"
          ghost
          onClick={handleEdit}
        >
          Edit
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>,
      ]}
      width={"75%"}
      centered
    >
      <div style={{ height: "70vh", overflowY: "auto" }}>
        <Row>{renderListingItems()}</Row>
      </div>
    </Modal>
  );
};

export default ViewRecruitmentSubmission;
