import React from "react";
import { Modal, Typography, List, Empty } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

const { Link } = Typography;
interface ResumeProps {
  resumeListModalVisible: boolean;
  handleModalCancel: () => void;
  selectedHiring: any;
}
const ResumeView: React.FC<ResumeProps> = ({
  resumeListModalVisible,
  handleModalCancel,
  selectedHiring,
}) => {
  return (
    <div style={{overflow:"auto"}}>
      <Modal
      open={resumeListModalVisible}
      onCancel={handleModalCancel}
      title="Documents List"
      footer={null}
      width={600}
    >
      {selectedHiring.uploads.length > 0 ? (
        <List
          dataSource={selectedHiring.uploads}
          renderItem={(upload: { url: string; fileName: string; filename: string }, index: number) => (
            <List.Item>
              <List.Item.Meta
                avatar={<FilePdfOutlined style={{ fontSize: 24, color: "#1890ff" }} />}
                title={
                  <Link href={upload?.url} target="_blank" rel="noopener noreferrer">
                    {upload?.filename || upload?.fileName || "Untitled Resume"}
                  </Link>
                }
                description={`Resume ${index + 1}`}
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No documents uploaded" />
      )}
    </Modal>
    </div>
    
  );
};

export default ResumeView;
