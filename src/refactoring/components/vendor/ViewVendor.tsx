import React from "react";
import { Button, Col, Modal, Row } from "antd";
import { VendorCompanyData } from "../../../utils";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";

interface VendorModalProps {
  selectedVendor: VendorCompanyData | null;
  handleCancel: () => void;
}

const ViewVendor: React.FC<VendorModalProps> = ({
  handleCancel,
  selectedVendor,
}) => {
  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      return (
        <Col span={6} key={item.label}>
          <LabelWithValue item={item} data={selectedVendor} />
        </Col>
      );
    });
  };

  return (
    <Modal
      title="Vendor Details"
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

export default ViewVendor;
