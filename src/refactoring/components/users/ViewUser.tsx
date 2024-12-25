import React from "react";
import { Button, Col, Modal, Row } from "antd";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";
import { UserData } from "../../../utils";

interface UserModalProps {
  selectedUser: UserData | null;
  handleCancel: () => void;
}
const ViewUser: React.FC<UserModalProps> = ({ selectedUser, handleCancel }) => {
  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      return (
        <Col span={6} key={item.label}>
          <LabelWithValue item={item} data={selectedUser} />
        </Col>
      );
    });
  };

  return (
    <Modal
      title="User Details"
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

export default ViewUser;
