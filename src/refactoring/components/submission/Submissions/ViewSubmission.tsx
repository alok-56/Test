import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Typography, message } from "antd";
import { ISubmissionData } from "../../../../utils";
import { columnsView } from "./columns";
import LabelWithValue from "../../shared/LabelWithValue";
import SubmissionService from "../../../services/SubmissionService";
import useDelete from "../../../hooks/useDelete";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useGet from "../../../hooks/useGet";
const { Link } = Typography;
const submissionService = new SubmissionService();

interface SubmissionsModalProps {
  selectedSubmission: ISubmissionData | null;
  handleCancel: () => void;
  onSubmissionDeleted: () => void;
  handleEdit: () => void;
  isViewModalVisible: boolean;
  data?: any;
}

const { Title, Text } = Typography;

const ViewSubmissions: React.FC<SubmissionsModalProps> = (props) => {
  const {
    selectedSubmission,
    handleCancel,
    onSubmissionDeleted,
    handleEdit,
    isViewModalVisible,
  } = props;
const [isVisible, setIsVisible] = useState(false);
  const { fetchData, data } = useGet();
  const { deleteData } = useDelete();
  const handleModalCancel = () => {
    setIsVisible(false);
    if (props?.data === undefined) {
      handleCancel();
    }
  };

  const getSubmissionDetails = async (id: string) => {
    await fetchData(submissionService.getSubmissionById(id));
  };

  useEffect(() => {
    if (props?.data?.submission_id && isVisible) {
      getSubmissionDetails(props?.data?.submission_id);
    }
  }, [isVisible]);

  const showDeleteConfirmation = () => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure you want to delete this submission?",
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: async () => await DeleteSubmission(),
    });
  };

  const DeleteSubmission = async () => {
    const payload = selectedSubmission?._id;
    await deleteData(submissionService.deleteSubmission(payload));
    handleCancel();
    onSubmissionDeleted();
    message.success("Submission is Deleted Successfully");
  };
  const handleModal = (e: any) => {
    e.stopPropagation();
    setIsVisible(true);
  };
  const handleDelete = async () => {
    try {
      await showDeleteConfirmation();
    } catch (error: any) {
      message.error("Error deleting submission:", error);
    }
  };

  const renderInterviewSubmissionListingItems = () => {
    return columnsView.map((item: any,index:number) => {
      if (
        item.key === "subDetails.uploads" &&
        data &&
        data.subDetails?.uploads
      ) {
        return (
          <Col span={24} key={`${item.key}-${index}`}>
            <Text>Attachments</Text>
            {data?.subDetails?.uploads.map(
              (
                upload: { url: string; fileName: string; filename: string },
                index: number
              ) => (
                <div key={index}>
                  <Link href={upload?.url}>
                    {index + 1}.
                    {upload?.filename || upload?.fileName || "Resume"}
                  </Link>
                </div>
              )
            )}
          </Col>
        );
      }

      const type = item?.type;
      if (item.isFullRow) {
        return (
          <Col span={24} key={`${item.key}-${index}`}>
            <LabelWithValue item={item} data={data} />
          </Col>
        );
      }
      if (type === "header") {
        return (
          <Col span={24} key={`${item.label}-${index}`}>
            <Title level={5} style={{ margin: 0, padding: "8px 0" }}>
              {item.label}
            </Title>
          </Col>
        );
      }
      return (
        <>
          <Col span={6} key={`${item.key}-${index}`}>
            <LabelWithValue item={item} data={data} />
          </Col>
        </>
      );
    });
  };
  const renderListingItems = () => {
    return columnsView.map((item: any,index:number) => {
      if (
        item.key === "subDetails.uploads" &&
        selectedSubmission &&
        selectedSubmission.subDetails?.uploads
      ) {
        return (
          <Col span={24} key={`${item.key}-${index}`}>
            <Text>Attachments</Text>
            {selectedSubmission?.subDetails?.uploads.map(
              (
                upload: { url: string; fileName: string; filename: string },
                index: number
              ) => (
                <div key={index}>
                  <Link href={upload?.url}>
                    {index + 1}.
                    {upload?.filename || upload?.fileName || "Resume"}
                  </Link>
                </div>
              )
            )}
          </Col>
        );
      }

      const type = item?.type;
      if (item.isFullRow) {
        return (
          <Col span={24} key={`${item.key}-${index}`}>
            <LabelWithValue item={item} data={selectedSubmission} />
          </Col>
        );
      }
      if (type === "header") {
        return (
          <Col span={24} key={`${item.key}-${index}`}>
            <Title level={5} style={{ margin: 0, padding: "8px 0" }}>
              {item.label}
            </Title>
          </Col>
        );
      }
      return (
        <>
          <Col span={6} key={`${item.label}-${index}`}>
            <LabelWithValue item={item} data={selectedSubmission} />
          </Col>
        </>
      );
    });
  };

  return (
    <div>
      <div>
        <Text>{props?.data?.subDetails?.profile?.name}</Text>
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
        title="Submission Details"
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
          <Button
            icon={<DeleteOutlined />}
            style={{ marginLeft: 10 }}
            danger
            onClick={handleDelete}
          >
            Delete
          </Button>,
        ]}
        width={"75%"}
        centered
      >
        <div style={{ height: "70vh", overflowY: "auto" }}>
          {isVisible ? (
            <Row>{renderInterviewSubmissionListingItems()}</Row>
          ) : (
            <Row>{renderListingItems()}</Row>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ViewSubmissions;
