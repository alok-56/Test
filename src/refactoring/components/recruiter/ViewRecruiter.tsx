import React from "react";
import { Button, Col, Modal, Row } from "antd";
import { RecruiterData } from "../../../utils";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";

interface RecruiterModalProps {
  selectedRecruiter: RecruiterData | null;
  handleCancel: () => void;
}
const ViewRecruiter: React.FC<RecruiterModalProps> = ({
  selectedRecruiter,
  handleCancel,
}) => {
  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      if (item.isFullRow) {
        return (
          <Col span={24}>
            <LabelWithValue item={item} data={selectedRecruiter} />
          </Col>
        );
      }
      return (
        <Col span={6} key={item.label}>
          <LabelWithValue item={item} data={selectedRecruiter} />
        </Col>
      );
    });
  };

  return (
    <Modal
      title="Recruiter Details"
      open={true}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Close
        </Button>,
      ]}
      width={800}
      centered
    >
      <Row>{renderListingItems()}</Row>
    </Modal>
  );
};

export default ViewRecruiter;
