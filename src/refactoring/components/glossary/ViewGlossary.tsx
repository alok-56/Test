import React from "react";
import { Button, Col, Modal, Row } from "antd";

import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";
import { EditOutlined } from "@ant-design/icons";

interface GlossaryModalProps {
  selectedGlossary: any;
  handleCancel: () => void;
  handleEdit: () => void;
}

const ViewGlossary: React.FC<GlossaryModalProps> = ({
  selectedGlossary,
  handleCancel,
  handleEdit,
}) => {
  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      if (item.isFullRow) {
        return (
          <Col span={24}>
            <LabelWithValue item={item} data={selectedGlossary} />
          </Col>
        );
      }
      return (
        <Col span={6} key={item.label}>
          <LabelWithValue item={item} data={selectedGlossary} />
        </Col>
      );
    });
  };

  return (
    <Modal
      title="Glossary Details"
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
      width={800}
      centered
    >
      <Row>{renderListingItems()}</Row>
    </Modal>
  );
};

export default ViewGlossary;
