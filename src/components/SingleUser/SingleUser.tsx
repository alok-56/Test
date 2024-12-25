import React from "react";

import { Col, Row } from "antd";
import moment from "moment";
import { useUser } from "../../context/UserContext";
import { LabelWithValue } from "../User/UserModal";

const SingleUser: React.FC = () => {
  const { user } = useUser();


  const formatDate = (epochDate: any) => {
    return moment(epochDate).format("DD MMM,YYYY");
  };

  const capitalizeFirstLetter = (
    value: string | undefined | number | Date
  ): string => {
    if (typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      return String(value); // Convert other types to string without capitalization
    }
  };

  const normalDate = (epochDate: any) => {
    return moment(epochDate * 1000).format("DD MMM,YYYY");
  };

  return (
    <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <h1>User Information:</h1>
      <>
        <div className="profile">
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="First Name"
                value={capitalizeFirstLetter(user?.profile?.firstName)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Last Name"
                value={capitalizeFirstLetter(user?.profile?.lastName)}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="User ID"
                value={user?.profile?._id || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Email"
                value={user?.profile?.email || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Mobile"
                value={user?.profile?.mobile || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Job Role"
                value={capitalizeFirstLetter(user?.profile?.jobRole) || "---"}
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="Active"
                value={user?.profile?.active || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Auth Role"
                value={capitalizeFirstLetter(user?.profile?.authRole) || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Current Location"
                value={
                  capitalizeFirstLetter(user?.profile?.currentLocation) || "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Gender"
                value={capitalizeFirstLetter(user?.profile?.gender) || "---"}
              />
            </Col>
          </Row>
        </div>
        {/* Address Information */}
        <div className="address">
          <h2>Address Information:</h2>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="Address Type"
                value={
                  capitalizeFirstLetter(user?.profile?.address?.type) || "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Country"
                value={
                  capitalizeFirstLetter(user?.profile?.address?.country) ||
                  "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="State"
                value={
                  capitalizeFirstLetter(user?.profile?.address?.state) || "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="City"
                value={
                  capitalizeFirstLetter(user?.profile?.address?.city) || "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Address Line 1"
                value={user?.profile?.address?.addressLine1 || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Address Line 2"
                value={user?.profile?.address?.addressLine2 || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Zip Code"
                value={user?.profile?.address?.zipCode || "---"}
              />
            </Col>
          </Row>
        </div>

        <div className="educational">
          {/* Educational Information */}
          <h2>Educational Information:</h2>
          <Row gutter={12}>
            {user?.educationDetails ? (
              user.educationDetails.map((education: any, index: any) => (
                <React.Fragment key={index}>
                  <Col span={6}>
                    <LabelWithValue
                      label="Degree"
                      value={capitalizeFirstLetter(education?.degree) || "---"}
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="Specialization"
                      value={
                        capitalizeFirstLetter(education?.specialization) ||
                        "---"
                      }
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="University"
                      value={
                        capitalizeFirstLetter(education?.university) || "---"
                      }
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="Graduation Date"
                      value={
                        education.graduationDate
                          ? formatDate(education?.graduationDate)
                          : "---"
                      }
                    />
                  </Col>
                </React.Fragment>
              ))
            ) : (
              <Col span={24}>
                <p>Educational Information Is Empty</p>
              </Col>
            )}
          </Row>
        </div>
        <div className="job">
          {/* Job Information */}
          <h2>Job Information:</h2>
          <Row gutter={12}>
            {user?.jobInfo ? (
              user.jobInfo.map((job: any, index: any) => (
                <React.Fragment key={index}>
                  <Col span={6}>
                    <LabelWithValue
                      label="Employer Name"
                      value={capitalizeFirstLetter(job?.employerName) || "---"}
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="Employee Business"
                      value={
                        capitalizeFirstLetter(job?.employerBusiness) || "---"
                      }
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="Employee Type"
                      value={capitalizeFirstLetter(job?.employerType) || "---"}
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="Job Title"
                      value={capitalizeFirstLetter(job?.jobTitle) || "---"}
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="Job Duties"
                      value={capitalizeFirstLetter(job?.jobDuties) || "---"}
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="Start Date"
                      value={job.startDate ? formatDate(job?.startDate) : "---"}
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="End Date"
                      value={job.endDate ? formatDate(job?.endDate) : "---"}
                    />
                  </Col>
                  <Col span={6}>
                    <LabelWithValue
                      label="Skills"
                      value={capitalizeFirstLetter(job?.skills) || "---"}
                    />
                  </Col>
                </React.Fragment>
              ))
            ) : (
              <Col span={24}>
                <p>Job Information is Empty</p>
              </Col>
            )}
          </Row>
        </div>
        <div className="personal-info">
          {/* Personal Information */}
          <h2>Personal Information</h2>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="LinkedIn ID"
                value={user?.personalInfo?.linkedinID || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Passport Number"
                value={user?.personalInfo?.passportNo || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="DL Number"
                value={user?.personalInfo?.dlNumber || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Visa Status"
                value={
                  capitalizeFirstLetter(user?.personalInfo?.visaStatus) || "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Visa Start Date"
                value={
                  user?.personalInfo?.visaStartDate
                    ? formatDate(user.personalInfo?.visaStartDate)
                    : "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="States Entry Date"
                value={
                  user?.personalInfo?.statesEntryDate
                    ? formatDate(user.personalInfo?.statesEntryDate)
                    : "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Referred By"
                value={
                  capitalizeFirstLetter(user?.personalInfo?.referredBy) || "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Date of Birth"
                value={
                  user?.personalInfo?.dob
                    ? formatDate(user.personalInfo?.dob)
                    : "---"
                }
              />
            </Col>
          </Row>
        </div>
        <div className="additionol-info">
          <h2>Additional Information</h2>
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="Primary Technology"
                value={user?.primaryTechnology || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Secondary Technology"
                value={
                  capitalizeFirstLetter(user?.secondaryTechnology) || "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Marketing Start Date"
                value={capitalizeFirstLetter(user?.marketingStartDate) || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Guest House Date"
                value={capitalizeFirstLetter(user?.guestHouseDate) || "---"}
              />
            </Col>
          </Row>
        </div>
        <div className="audit-info">
          <Row gutter={12}>
            <Col span={6}>
              <LabelWithValue
                label="Created Date"
                value={
                  user?.auditInfo?.createdDate
                    ? normalDate(user.auditInfo?.createdDate)
                    : "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Updated Date"
                value={
                  user?.auditInfo?.updatedDate
                    ? normalDate(user.auditInfo?.updatedDate)
                    : "---"
                }
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Created By"
                value={user?.auditInfo?.createdUserName || "---"}
              />
            </Col>
            <Col span={6}>
              <LabelWithValue
                label="Updated By"
                value={user?.auditInfo?.updatedUserName || "---"}
              />
            </Col>
          </Row>
        </div>
      </>
    </div>
  );
};

export default SingleUser;
