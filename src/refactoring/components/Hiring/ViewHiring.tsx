import { Button, Col, Row, Typography } from "antd";
import { columnsView } from "./columns";
import LabelWithValue from "../shared/LabelWithValue";
import { EyeOutlined } from "@ant-design/icons";
//import { EditOutlined } from "@ant-design/icons";
const { Title, Text, Link } = Typography;

interface HiringModalProps {
  selectedHiring: any | null;
  handleCancel: () => void;
  handleEdit: () => void;
}

const ViewHiring: React.FC<HiringModalProps> = ({
  selectedHiring,
  handleCancel,
}) => {
  const renderArrayItems = (items: any[], columns: any[], label: string) => {
    // Check if the relevant fields (university or employerBusiness) are missing or empty
    if (
      (label === "Education Details" &&
        items.every((item) => !item.university)) ||
      (label === "Job Information" && items.every((item) => !item.employerName))
    ) {
      return (
        <Col span={24} key={label}>
          <Text>No {label} available</Text>
        </Col>
      );
    }

    return (
      <Col span={24} key={label}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Row key={index} gutter={[16, 16]}>
              {columns.map((column) => (
                <Col span={6} key={column.label}>
                  <LabelWithValue item={column} data={item} />
                </Col>
              ))}
            </Row>
          ))
        ) : (
          <Text>No {label} available</Text>
        )}
      </Col>
    );
  };

  const renderListingItems = () => {
    return columnsView.map((item: any) => {
      if (item.key === "uploads" && selectedHiring && selectedHiring.uploads) {
        return (
          <Col span={24} key={item.key}>
            <Text>Attachments</Text>
            <div>
              {selectedHiring.uploads.length > 0
                ? selectedHiring.uploads.map(
                    (
                      upload: {
                        url: string;
                        fileName: string;
                        filename: string;
                      },
                      index: number
                    ) => (
                      <div key={index}>
                        <Text>{upload?.filename ||
                            upload?.fileName ||
                            "Resume(No File Exists)"}</Text>
                            <EyeOutlined></EyeOutlined>
                        <Link href={upload?.url}>
                          {index + 1}.
                          {upload?.filename ||
                            upload?.fileName ||
                            "Resume(No File Exists)"}
                        </Link>
                      </div>
                    )
                  )
                : "----"}
            </div>
          </Col>
        );
      }

      const type = item?.type;
      if (item.isFullRow) {
        return (
          <Col span={24}>
            <LabelWithValue item={item} data={selectedHiring} />
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

      if (item.key === "educationDetails" && selectedHiring?.educationDetails) {
        return renderArrayItems(
          selectedHiring.educationDetails,
          [
            { label: "University", key: "university" },
            { label: "Specialization", key: "specialization" },
            { label: "Degree", key: "degree" },
            { label: "Graduation Date", key: "graduationDate", type: "date" },
          ],
          "Education Details"
        );
      }

      if (item.key === "jobInfo" && selectedHiring?.jobInfo) {
        return renderArrayItems(
          selectedHiring.jobInfo,
          [
            { label: "Employer Name", key: "employerName" },
            {
              label: "Start Date",
              key: "startDate",
              type: "date",
            },
            {
              label: "End Date",
              key: "endDate",
              type: "date",
            },
          ],
          "Job Information"
        );
      }

      return (
        <Col span={6} key={item.label}>
          <LabelWithValue item={item} data={selectedHiring} />
        </Col>
      );
    });
  };

  return (
    // <Modal
    //   title="Hiring Details"
    //   open={true}
    //   onCancel={handleCancel}
    //   footer={[
    //     <Button key="back" onClick={handleCancel}>
    //       Close
    //     </Button>,
    //   ]}
    //   width={800}
    //   centered
    // >
    //   <div style={{ height: "70vh", overflowY: "auto" }}>
    //     <Row>{renderListingItems()}</Row>
    //   </div>
    // </Modal>
    <div>
      <div
        style={{
          height: "80vh",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "20px",
          maxWidth: "100%",
          boxSizing: "border-box",
          backgroundColor: "white",
        }}
      >
        <Row>{renderListingItems()}</Row>
      </div>
      <Button key="back" onClick={handleCancel} style={{ marginTop: 16 }}>
        Close
      </Button>
    </div>
  );
};

export default ViewHiring;



