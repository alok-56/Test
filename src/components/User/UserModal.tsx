import React from "react";
import { UserData } from "../../utils";
import { Col, Row, Space, Typography } from "antd";
import moment from "moment";
const { Text, Link } = Typography;
interface UserModalProps {
  selectedUser: UserData;
}
export const capitalizeFirstLetter = (
  value: string | undefined | number | Date
): string => {
  if (typeof value === "string") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  } else {
    return String(value);
  }
};

export const LabelWithValue = ({ label, value, isCapitalize = true }: any) => {
  return (
    <Space direction="vertical">
      <Text>{label}</Text>
      <Text type="secondary">
        {isCapitalize ? capitalizeFirstLetter(value) : value}
      </Text>
    </Space>
  );
};

const UserModal: React.FC<UserModalProps> = ({ selectedUser }) => {
  const formatDate = (epochDate: any) => {
    if (epochDate) {
      return moment(epochDate).format("DD MMM, YYYY");
    } else {
      return "--";
    }
  };

  const normalDate = (nd: any) => {
    const date = new Date(nd * 1000);
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const renderColDefsContent = () => {
    return (
      <>
        <div className="profile">
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label={"First Name"}
                value={selectedUser?.profile?.firstName}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Email"}
                value={selectedUser?.profile?.email}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Mobile"}
                value={selectedUser?.profile?.mobile}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Active"}
                value={selectedUser?.profile?.active}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Auth Role"}
                value={selectedUser?.profile?.authRole}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Current Location"}
                value={selectedUser?.profile?.currentLocation}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Gender"}
                value={selectedUser?.profile?.gender}
              />
            </Col>
          </Row>
        </div>
        <div className="address">
          <Text>Address Information:</Text>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label={"Country"}
                value={selectedUser?.profile?.address?.country}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"State"}
                value={selectedUser?.profile?.address?.state}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"City"}
                value={selectedUser?.profile?.address?.city}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"AddressLine 1"}
                value={selectedUser?.profile?.address?.addressLine1}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Zip Code"}
                value={selectedUser?.profile?.address?.zipCode}
              />
            </Col>
          </Row>
        </div>
        <div className="educational">
          <Text>Educational Information:</Text>
          <Row gutter={12}>
            {selectedUser?.educationDetails?.map((education, index) => (
              <React.Fragment key={index}>
                <Col span={6}>
                  <LabelWithValue label={"Degree"} value={education?.degree} />
                </Col>
                <Col span={6}>
                  <LabelWithValue
                    label={"Specialization"}
                    value={education?.specialization}
                  />
                </Col>
                <Col span={6}>
                  <LabelWithValue
                    label={"University"}
                    value={education?.university}
                  />
                </Col>
                <Col span={6}>
                  <LabelWithValue
                    label={"Graduation Date"}
                    value={formatDate(education?.graduationDate)}
                  />
                </Col>
              </React.Fragment>
            ))}
          </Row>
        </div>
        <div className="job">
          <Text>Job Information:</Text>
          <Row gutter={12}>
            {selectedUser?.jobInfo?.map((job, index) => (
              <React.Fragment key={index}>
                <Col span={6}>
                  <LabelWithValue
                    label={"Employer Name"}
                    value={job?.employerName}
                  />
                </Col>
                <Col span={6}>
                  <LabelWithValue
                    label={"Employee Business"}
                    value={job?.employerBusiness}
                  />
                </Col>
                <Col span={6}>
                  <LabelWithValue
                    label={"Employee Type"}
                    value={job?.employerType}
                  />
                </Col>
                <Col span={6}>
                  <LabelWithValue label={"Job Title"} value={job?.jobTitle} />
                </Col>
                <Col span={6}>
                  <LabelWithValue label={"Job Duties"} value={job?.jobDuties} />
                </Col>
                <Col span={6}>
                  <LabelWithValue
                    label={"Start Date"}
                    value={formatDate(job?.startDate)}
                  />
                </Col>
                <Col span={6}>
                  <LabelWithValue
                    label={"End Date"}
                    value={formatDate(job?.endDate)}
                  />
                </Col>
                <Col span={6}>
                  <LabelWithValue label={"Skills"} value={job?.skills} />
                </Col>
              </React.Fragment>
            ))}
          </Row>
        </div>
        <div className="personal-info">
          <Text>Personal Information:</Text>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label={"LinkedIn ID"}
                value={selectedUser?.personalInfo?.linkedinID}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Passport Number"}
                value={selectedUser?.personalInfo?.passportNo}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"DL Number"}
                value={selectedUser?.personalInfo?.dlNumber}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Visa Status"}
                value={selectedUser?.personalInfo?.visaStatus}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Visa Start Date"}
                value={formatDate(selectedUser?.personalInfo?.visaStartDate)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"States Entry Date"}
                value={formatDate(selectedUser?.personalInfo?.statesEntryDate)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Referred By"}
                value={selectedUser?.personalInfo?.referredBy}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Date of Birth"}
                value={formatDate(selectedUser?.personalInfo?.dob)}
              />
            </Col>
          </Row>
        </div>
        <div className="additional-info">
          <Text>Additional Information:</Text>
          <Row gutter={12}>
            <Col span={24}>
              <Text>Attachments:</Text>
              {selectedUser.uploads?.map(
                (
                  upload: { url: string; fileName: string; filename: string },
                  index: number
                ) => (
                  <div key={index}>
                    <Link href={upload.url}>
                      {index + 1}.{" "}
                      {upload.fileName || upload.filename || "Resume"}
                    </Link>
                  </div>
                )
              )}
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label={"Primary Technology"}
                value={selectedUser?.primaryTechnology}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Secondary Technology"}
                value={selectedUser?.secondaryTechnology}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Marketing Start Date"}
                value={formatDate(selectedUser?.marketingStartDate)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Guest House Date"}
                value={formatDate(selectedUser?.guestHouseDate)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Created Date"}
                value={normalDate(selectedUser?.auditInfo?.createdDate)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Updated Date"}
                value={normalDate(selectedUser?.auditInfo?.updatedDate)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Created By"}
                value={selectedUser?.auditInfo?.createdUserName}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label={"Updated By"}
                value={capitalizeFirstLetter(
                  selectedUser?.auditInfo?.updatedUserName
                )}
              />
            </Col>
          </Row>
        </div>
      </>
    );
  };

  return (
    <div style={{ maxHeight: "80vh", overflowX: "auto" }}>
      {renderColDefsContent()}
    </div>
  );
};

export default UserModal;
