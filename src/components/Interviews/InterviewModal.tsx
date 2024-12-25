
import React from "react";

import { Col,  Row } from "antd";
import { LabelWithValue } from "../User/UserModal";
interface InterviewModalProps {
  selectedInterview: any;

}

const gutter = { gutter: 10 };
const span = { span: 6 };
const InterviewModal: React.FC<InterviewModalProps> = ({
  selectedInterview,

}) => {
  const formatDate = (epochDate: any) => {
    const formattedDate = new Date(epochDate * 1000)
      .toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",

        hour12: true,
      })
      .replace(/\//g, "-");
    return formattedDate;
  };
  return (
    <>

        <div>
          <Row {...gutter}>
            <Col {...span}>
              <LabelWithValue
                label="Name"
                value={selectedInterview?.subDetails?.profile?.name}
              />
            </Col>
            <Col {...span}>
              <LabelWithValue
                label="Client"
                value={selectedInterview?.subDetails?.client?.name}
              />
            </Col>
            <Col {...span}>
              <LabelWithValue
                label="Vendor"
                value={selectedInterview?.subDetails?.vendor?.name}
              />
            </Col>
            <Col {...span}>
              <LabelWithValue
                label="Recruiter"
                value={selectedInterview?.subDetails?.salesRecruiter}
              />
            </Col>
          </Row>

          <Row gutter={12}>
            <Col>
              <LabelWithValue
                label="Start Time"
                value={formatDate(selectedInterview?.start_time)}
              />
            </Col>
            <Col>
              <LabelWithValue
                label="End Time"
                value={formatDate(selectedInterview?.end_time)}
              />
            </Col>
          </Row>

          <Row gutter={12}>
            <Col {...span}>
              <LabelWithValue label="Mode" value={selectedInterview?.mode} />
            </Col>
            <Col {...span}>
              <LabelWithValue
                label="Status"
                value={selectedInterview?.status}
              />
            </Col>
            <Col {...span}>
              <LabelWithValue
                label="Invite Received"
                value={selectedInterview?.inviteReceived}
              />
            </Col>
            <Col {...span}>
              <LabelWithValue
                label="Interview Status"
                value={
                  selectedInterview?.interviewStatus
                }

              />
            </Col>

            <Col {...span}>
              <LabelWithValue
                label="Comments"
                value={selectedInterview?.comments}
              />
            </Col>
          </Row>
          {selectedInterview?.panel &&
            selectedInterview.panel.map((item: any, index: number) => (
              <div>
                <p>Interview Panel {index + 1} </p>
                <Row key={index} gutter={12}>
                  <Col {...span}>
                    <LabelWithValue label="Name" value={item?.name} />
                  </Col>
                  <Col>
                    <LabelWithValue label="Email ID" value={item?.mailID} />
                  </Col>
                  <Col>
                    <LabelWithValue
                      label="LinkedIn ID"
                      value={item?.linkedinID}
                    />
                  </Col>
                </Row>
              </div>
            ))}
          <Row gutter={12}>
            {/* <Col {...span}>
          <LabelWithValue
            label="Interview Questions"
            value={selectedInterview?.interviewQuestions}
          />
        </Col> */}
          </Row>
          <Row gutter={12}>
            <Col {...span}>
              <LabelWithValue
                label="Created Date"
                value={formatDate(selectedInterview?.auditInfo?.createdDate)}
              />
            </Col>
            <Col {...span}>
              <LabelWithValue
                label="Updated Date"
                value={formatDate(selectedInterview?.auditInfo?.updatedDate)}
              />
            </Col>
            <Col {...span}>
              <LabelWithValue
                label="Created By"
                value={selectedInterview?.auditInfo?.createdUserName}
              />
            </Col>
            <Col {...span}>
              <LabelWithValue
                label="Updated By"
                value={selectedInterview?.auditInfo?.updatedUserName}
              />
            </Col>
          </Row>        
        </div>     
    </>
  );
};

export default InterviewModal;
