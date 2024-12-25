import React from "react";
import { Button, Col, Modal, Row } from "antd";
import { ClientCompanyData } from "../../../utils";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";

interface ClientModalProps {
  selectedClient: ClientCompanyData | null;
  handleCancel: () => void;
}

const ViewClient: React.FC<ClientModalProps> = ({
  selectedClient,
  handleCancel,
}) => {
  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      return (
        <Col span={6} key={item.label}>
          <LabelWithValue item={item} data={selectedClient} />
        </Col>
      );
    });
  };

  return (
    <Modal
      title="Client Details"
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

export default ViewClient;
