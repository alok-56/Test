import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Spin, Typography,  } from "antd";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import useGet from "../../hooks/useGet";
import RecruitmentService from "../../services/RecruitmentService";

const { Title, Text,Link } = Typography;
const recrutmentService = new RecruitmentService();

interface RecruitmentModalProps {
  selectedRecruitment: any | null;
  handleCancel: () => void;
  handleEdit: () => void;
  isViewModalVisible: boolean;
  data?: any;
}

const ViewRecruitment: React.FC<RecruitmentModalProps> = (props) => {
  const {
    selectedRecruitment,
    handleCancel,
    handleEdit,
    isViewModalVisible,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const { fetchData, data, loading } = useGet();

  const handleModalCancel = () => {
    setIsVisible(false);
    if (props?.data === undefined) {
      handleCancel();
    }
  };

  const getRecruitmentDetails = async (id: string) => {
    await fetchData(recrutmentService.getRecruitmentDetails(id));
  };

  useEffect(() => {
    if (props?.data?.requisitionId && isVisible) {
      getRecruitmentDetails(props?.data?.requisitionId);
    }
  }, [isVisible]);

  const handleModal = (e: any) => {
    e.stopPropagation();
    setIsVisible(true);
  };

  const renderRecruitmentListingItems = () => {
    return columnsView.map((item: any) => {
      // Handling the uploads section
      if (item.key === "uploads" && data && data?.data?.uploads) {
        return (
          <Col span={24} key={`uploads-${item.key}-${data?.data?.uploads.length}`}>
            <Text>Attachments</Text>
            <div>
              {data?.data?.uploads.length > 0 ? (
                data?.data?.uploads.map(
                  (upload: { url: string; fileName: string; filename: string }, index: number) => (
                    <div key={`upload-${upload.url || upload.filename || index}`}>
                      <Link href={upload?.url}>
                        {index + 1}. {upload?.filename || upload?.fileName || "Resume (No File Exists)"}
                      </Link>
                    </div>
                  )
                )
              ) : (
                "----"
              )}
            </div>
          </Col>
        );
      }

      const type = item?.type;
      if (item.isFullRow) {
        return (
          <Col span={24} key={`fullrow-${item.key}`}>
            <LabelWithValue item={item} data={data?.data} />
          </Col>
        );
      }
      if (type === "header") {
        return (
          <Col span={24} key={`header-${item.key}`}>
            <Title level={5} style={{ margin: 0, padding: "8px 0" }}>
              {item.label}
            </Title>
          </Col>
        );
      }

      // Ensure the key is unique by combining properties
      return (
        <Col span={6} key={`col-${item.key}-${item.label}`}>
          <LabelWithValue item={item} data={data?.data} />
        </Col>
      );
    });
  };

  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      // Handling the uploads section
      if (item.key === "uploads" && selectedRecruitment && selectedRecruitment.uploads) {
        return (
          <Col span={24} key={`uploads-${item.key}-${selectedRecruitment.uploads.length}`}>
            <Text>Attachments</Text>
            <div>
              {selectedRecruitment.uploads.length > 0 ? (
                selectedRecruitment.uploads.map(
                  (upload: { url: string; fileName: string; filename: string }, index: number) => (
                    <div key={`upload-${upload.url || upload.filename || index}`}>
                      <Link href={upload?.url}>
                        {index + 1}. {upload?.filename || upload?.fileName || "Resume (No File Exists)"}
                      </Link>
                    </div>
                  )
                )
              ) : (
                "----"
              )}
            </div>
          </Col>
        );
      }

      const type = item?.type;
      if (item.isFullRow) {
        return (
          <Col span={24} key={`fullrow-${item.key}`}>
            <LabelWithValue item={item} data={selectedRecruitment} />
          </Col>
        );
      }
      if (type === "header") {
        return (
          <Col span={24} key={`header-${item.key}`}>
            <Title level={5} style={{ margin: 0, padding: "8px 0" }}>
              {item.label}
            </Title>
          </Col>
        );
      }

      // Ensure the key is unique by combining properties
      return (
        <Col span={6} key={`col-${item.key}-${item.label}`}>
          <LabelWithValue item={item} data={selectedRecruitment} />
        </Col>
      );
    });
  };

  return (
    <div>
      <div>
        <Text>{props?.data?.requisitionId}</Text>
        <Button
          type="text"
          icon={<EyeOutlined />}
          style={{ color: "#15B5D4" }}
          ref={(ref) => {
            if (!ref) return;
            ref.onclick = (e) => {
              handleModal(e);
            };
          }}
        />
      </div>
      <Modal
        title="Recruitment Details"
        open={isVisible || isViewModalVisible}
        onCancel={handleModalCancel}
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
          {loading ? (
            <Spin spinning={loading} />
          ) : isVisible ? (
            <Row>{renderRecruitmentListingItems()}</Row>
          ) : (
            <Row>{renderListingItems()}</Row>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ViewRecruitment;
