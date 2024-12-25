import React from "react";
import { ISubmissionData } from "../../utils";
import { Col, Row, } from "antd";
import { LabelWithValue } from "../User/UserModal"; // Replace 'YourComponentPath' with the actual path to your LabelWithValue component.

interface SubmissionModalProps {
  selectedSubmission: ISubmissionData;
}

const SubmissionModal: React.FC<SubmissionModalProps> = ({
  selectedSubmission,
}) => {
  const capitalizeFirstLetter = (value: string | null | undefined): string => {
    if (value === null || value === undefined) return "N/A";

    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const normalDate = (nd: any) => {
    const date = new Date(nd); // Convert to milliseconds
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDate = (epochDate: any) => {
    const formattedDate = new Date(epochDate * 1000)
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/\//g, "-");
    return formattedDate;
  };

  const renderColDefsContent = () => {
    return (
      <>
        <div className="profile">
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="User Name"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.profile.name
                )}
              />
            </Col>
            {/* <Col span={6}>
              <LabelWithValue
                label="User ID"
                value={selectedSubmission.subDetails.profile._id}
              />
            </Col> */}
          </Row>
        </div>
        <div className="vendor">
          <h2>Vendor Information:</h2>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="Vendor Name"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.vendor?.name
                )}
              />
            </Col>
            {/* <Col span={6}>
              <LabelWithValue
                label="Vendor ID"
                value={selectedSubmission.subDetails.vendor?.company_id}
              />
            </Col> */}
            <Col span={6}>
              <LabelWithValue
                label="Recruiter Name"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.vendor?.recruiter?.name
                )}
              />
            </Col>
            {/* <Col span={6}>
              <LabelWithValue
                label="Recruiter ID"
                value={selectedSubmission.subDetails.vendor?.recruiter?.rec_id}
              />
            </Col> */}
            <Col span={6}>
              <LabelWithValue
                label="Recruiter Email"
                value={selectedSubmission.subDetails.vendor?.recruiter?.email}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Recruiter Contact"
                value={selectedSubmission.subDetails.vendor?.recruiter?.contact}
              />
            </Col>
          </Row>
        </div>

        <div className="prime-vendor">
          <h2>Prime Vendor Information:</h2>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="Prime Vendor Name"
                value={capitalizeFirstLetter(
                  selectedSubmission?.subDetails?.primeVendor?.name
                )}
              />
            </Col>
            {/* <Col span={6}>
              <LabelWithValue
                label="Prime Vendor ID"
                value={selectedSubmission?.subDetails?.primeVendor?.company_id}
              />
            </Col> */}
            <Col span={6}>
              <LabelWithValue
                label="Recruiter Name"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.primeVendor?.recruiter?.name
                )}
              />
            </Col>
            {/* <Col span={6}>
              <LabelWithValue
                label="Recruiter ID"
                value={
                  selectedSubmission.subDetails.primeVendor?.recruiter?.rec_id
                }
              />
            </Col> */}
            <Col span={6}>
              <LabelWithValue
                label="Recruiter Email"
                value={
                  selectedSubmission.subDetails.primeVendor?.recruiter?.email
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Recruiter Contact"
                value={
                  selectedSubmission.subDetails.primeVendor?.recruiter?.contact
                }
              />
            </Col>
          </Row>
        </div>
        <div className="client">
          <h2>Client Information:</h2>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="Client Name"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.client?.name
                )}
              />
            </Col>
            {/* <Col span={6}>
              <LabelWithValue
                label="Client ID"
                value={selectedSubmission.subDetails.client?.company_id}
              />
            </Col> */}
            <Col span={6}>
              <LabelWithValue
                label="Recruiter Name"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.client.recruiter?.name
                )}
              />
            </Col>
            {/* <Col span={6}>
              <LabelWithValue
                label="Recruiter ID"
                value={selectedSubmission.subDetails.client.recruiter?.rec_id}
              />
            </Col> */}
            <Col span={6}>
              <LabelWithValue
                label="Recruiter Email"
                value={selectedSubmission.subDetails.client.recruiter?.email}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Recruiter Contact"
                value={selectedSubmission.subDetails.client.recruiter?.contact}
              />
            </Col>
          </Row>
        </div>

        <div className="additional">
          <h2>Additional Information:</h2>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="Date"
                value={normalDate(selectedSubmission.subDetails.date)}
              />
            </Col>

            <Col span={6}>
              <LabelWithValue
                label="Job Title"
                value={selectedSubmission.subDetails.jobRole}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Submitted By"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.salesRecruiter
                )}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Status"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.status
                )}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Work Location"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.workLocation
                )}
              />
            </Col>
          </Row>
          <div style={{ marginLeft: 8 }}>
            <Row gutter={12}>
              <LabelWithValue
                label="Job Description"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.jobDescription
                )}
              />
            </Row>
            <Row gutter={12}>
              <LabelWithValue
                label="Comments"
                value={capitalizeFirstLetter(
                  selectedSubmission.subDetails.comments
                )}
              />
            </Row>
          </div>
        </div>

        <div className="audit-info">
          <h2>Audit Information:</h2>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="Created Date"
                value={formatDate(selectedSubmission.auditInfo.createdDate)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Updated Date"
                value={formatDate(selectedSubmission.auditInfo.updatedDate)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Created By"
                value={selectedSubmission.auditInfo.createdUserName}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Updated By"
                value={capitalizeFirstLetter(
                  selectedSubmission?.auditInfo?.updatedUserName
                )}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return (
    <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
      {renderColDefsContent()}
    </div>
  );
};

export default SubmissionModal;
