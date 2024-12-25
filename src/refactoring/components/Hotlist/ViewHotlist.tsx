import React from "react";
import { Button, Col, Modal, Row } from "antd";
import { HotListData } from "../../../utils";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";

interface HotListModalProps {
  selectedHotList: HotListData | null;
  handleCancel: () => void;
}

const ViewHotList: React.FC<HotListModalProps> = ({
  selectedHotList,
  handleCancel,
}) => {
  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      return (
        <Col span={6} key={item.label}>
          <LabelWithValue item={item} data={selectedHotList} />
        </Col>
      );
    });
  };

  return (
    <Modal
      title="HotList Details"
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

export default ViewHotList;
