import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  message,
} from "antd";

import React, { useState } from "react";

import type { DatePickerProps } from "antd";
import { ISubmissionData } from "../../utils";
import moment from "moment";
import InterviewModal from "../Interviews/InterviewModal";
import { CloseOutlined, MoreOutlined } from "@ant-design/icons";
import Stepper from "./stepper";
import axiosInstance from "../../refactoring/services/shared/AxiosService";
import { REACT_API_URL } from "../../urlConfig";
import AppConstants from "../../refactoring/components/shared/constants";

const gutter = { gutter: 16 };
const span = { span: 8 };
const { TextArea } = Input;

const time = [
  { value: 15, label: "15 mins" },
  { value: 30, label: "30 mins" },
  { value: 45, label: "45 mins" },
  { value: 60, label: "60 mins" },
  { value: 90, label: "90 mins" },
  { value: 120, label: "120 mins" },
];

const Status = [
  { value: "Comments", label: "Comments" },
  { value: "Direct Client Interview", label: "Direct Client Interview" },
  { value: "Implementer Interview", label: "Implementer Interview" },
  { value: "Position Confirmed", label: "Position Confirmed" },
  { value: "First Round", label: "First Round" },
  { value: "No Response", label: "No Response" },
  { value: "Vendor Technical Screening", label: "Vendor Technical Screening" },
  { value: "Written Test", label: "Written Test" },
  { value: "Coding Test", label: "Coding Test" },
  { value: "Rejected", label: "Rejected" },
  { value: "Applied", label: "Applied" },
];

const mode = [
  { value: "video", label: "Video" },
  { value: "onlineTest", label: "Online Test" },
  { value: "Video+Coding", label: "Video+Coding" },
];


interface InterviewColumnProps {
  setIsModalVisible: any;
  selectedSubmission: ISubmissionData;
  data: any;
}

const InterviewColumn: React.FC<InterviewColumnProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [form] = Form.useForm();
  const [interviewDetails, setInterviewDetails] = useState<any[]>([]);
  const [interviewPanel, setInterviewPanel] = useState([
    { name: "", mailID: "", linkedinID: "" },
  ]);
  const [startTimeValue, setStartTimeValue] = useState<any>(null);
  const [endTimeValue, setEndTimeValue] = useState<number | null>(null);
  const [inviteReceived, setInviteReceived] = useState<boolean>(false);
  const [interviewStatus, setInterviewStatus] = useState<string>("TBD");
  const [addButtonVisible, setAddButtonVisible] = useState<any>(false);
  const [selectedInterview, setSelectedInterview] = useState<any | null>(
    interviewDetails[0] || null
  );
  const [selectStatus, setSelectStatus] = useState<any>("Comments");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const addInterview = () => {
    setInterviewPanel([
      ...interviewPanel,
      { name: "", mailID: "", linkedinID: "" },
    ]);
  };

  const removeInterview = (index: number) => {
    const updatedInterviewPanels = [...interviewPanel];
    updatedInterviewPanels.splice(index, 1);
    setInterviewPanel(updatedInterviewPanels);
  };

  const handleModal = async (e: any) => {
    e.stopPropagation();
    setIsVisible(true);

    const fetchInterviewDetails = async () => {
      const id = props.data._id;
      try {
        const response = await axiosInstance.get(
          `${REACT_API_URL}/interview?submissionID=${id}`
        );

        const res = response.data;
        const interviewDetails = res.sort(
          (a: any, b: any) => b.auditInfo.createdDate - a.auditInfo.createdDate
        );
        const filteredInterviewDetails = interviewDetails.filter(
          (detail: any) =>
            detail.subDetails.profile._id === props.data.subDetails.profile._id
        );

        setInterviewDetails(filteredInterviewDetails);
      } catch (error: any) {
        message.error(error.response.data.message);
      }
    };

    fetchInterviewDetails();
  };

  const onChangeStartTime: DatePickerProps["onChange"] = (_, timeString) => {
    setStartTimeValue(timeString);
  };

  const onChangeEndTime = (value: number) => {
    setEndTimeValue(value);
  };

  const handleStatus = (value: any) => {
    setSelectStatus(value);
  };

  const handleInterviewStatus = (value: any) => {
    setInterviewStatus(value);
  };

  const handleOk = async () => {
    try {
      await form.validateFields()
      const panel: any = form.getFieldsValue(true)["interviewPanel"];

      const interviewDetail = form.getFieldsValue([
        "startTime",
        "endTime",
        "status",
        "comments",
        "interviewStatus",
        "mode",
        "inviteReceived",
        "interviewQuestions",
      ]);

      interviewDetail.startTime = moment(
        startTimeValue,
        "YYYY-MM-DD HH:mm:ss"
      ).unix();

      interviewDetail.endTime = moment(startTimeValue, "YYYY-MM-DD HH:mm:ss")
        .add(endTimeValue, "minutes")
        .unix();
      const formatterData = {
        submission_id: props.data._id,

        status: selectStatus,
        comments: interviewDetail.comments,
        start_time: interviewDetail.startTime,
        end_time: interviewDetail.endTime,
        panel:
          panel?.map((ip: any) => ({
            name: ip.name,
            mailID: ip.mailID,
            linkedinID: ip.linkedinID,
          })) || [],
        mode: interviewDetail.mode,
        inviteReceived: interviewDetail.inviteReceived,
        interviewStatus: interviewDetail.interviewStatus,
        interviewQuestions: interviewDetail.interviewQuestions,
      };
      await axiosInstance.post(`${REACT_API_URL}/interview`, formatterData);

      message.success("Interview Created Sucessfully");
      setIsVisible(false);
      setAddButtonVisible(false);
      form.resetFields();
    } catch (error: any) {
      message.error(error.response.data.message);
      setIsVisible(false);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
  };
  const handleModalCancel = () => {
    setIsAddModalVisible(false);
  };

  const isStatus = [
    "No Response",
    "",
    "Rejected",
    "Comments",
    "Position Confirmed",
  ].includes(selectStatus);

  const handleItemClick = (item: any) => {
    setSelectedInterview(item);
    setIsAddModalVisible(true);
  };

  
  return (
    <div>
      <Button
        type="text"
        shape="circle"
        icon={<MoreOutlined />}
        ref={(ref) => {
          if (!ref) return;

          ref.onclick = (e) => {
            handleModal(e);
          };
        }}
      />

      <Drawer
        title="Interview Details"
        onClose={handleCancel}
        open={isVisible}
        width={700}
        footer={[
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            {addButtonVisible && (
              <>
                <Button onClick={() => setIsVisible(false)}>Cancel</Button>
                <Button type="primary" onClick={handleOk}>
                  OK
                </Button>
              </>
            )}
          </div>,
        ]}
      >
        <Button onClick={() => setAddButtonVisible(!addButtonVisible)}>
          {addButtonVisible ? "Show Table" : "+ Add Interview"}
        </Button>
        <div style={{ marginTop: 16 }}>
          {addButtonVisible ? (
            <Form form={form} layout="vertical" >
              <div>
                <Row {...gutter}>
                  <Col {...span}>
                    <Form.Item name="status" label="Status" required>
                      <Select
                        options={Status}
                        onChange={handleStatus}
                        defaultValue={selectStatus}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {isStatus ? (
                  <div>
                    <Form.Item name="comments" label="Comments" rules={[{ required: true, message: "Enter Your comments" }]}>
                      <TextArea rows={10} />
                    </Form.Item>
                  </div>
                ) : (
                  <div>
                    <Row {...gutter}>
                      <Col {...span}>
                        <Form.Item name="startTime" label="Start Time" rules={[{ required: true, message: "Please Select Start Time" }]}>
                          <DatePicker
                            showTime={{ format: "HH:mm" }}
                            onChange={onChangeStartTime}
                          />
                        </Form.Item>
                      </Col>
                      <Col {...span}>
                        <Form.Item name="endTime" label="End Time" rules={[{ required: true, message: "Please Select End Time" }]}>
                          <Select onChange={onChangeEndTime}>
                            {time.map((option) => (
                              <Select.Option
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <div>
                      <Button type="primary" onClick={addInterview}>
                        Add Interview Panel
                      </Button>
                      {interviewPanel.map((_: any, index: any) => (
                        <div key={index} style={{ marginBottom: 16 }}>
                          <p>Interview Panel {index + 1}</p>
                          <Row {...gutter}>
                            <Col {...span}>
                              <Form.Item
                                name={["interviewPanel", index, "name"]}
                                label="Name"
                                initialValue={
                                  selectedInterview &&
                                  selectedInterview?.panel[index]?.name
                                }
                                rules={[
                                  {
                                    message: "Please Enter panel name",
                                    required: true,
                                  },
                                ]}
                              >
                                <Input type="text" />
                              </Form.Item>
                            </Col>
                            <Col {...span}>
                              <Form.Item
                                name={["interviewPanel", index, "mailID"]}
                                label="Mail ID"
                                initialValue={
                                  selectedInterview &&
                                  selectedInterview?.panel[index]?.mailID
                                }
                                rules={[
                                  {
                                    message: "Please Enter Panel MailID",
                                    required: true,
                                    type: "email",
                                  },
                                ]}
                              >
                                <Input type="text" />
                              </Form.Item>
                            </Col>
                            <Col {...span}>
                              <Form.Item
                                name={["interviewPanel", index, "linkedinID"]}
                                label="Linkedin ID"
                                initialValue={
                                  selectedInterview &&
                                  selectedInterview?.panel[index]?.linkedinID
                                }
                                rules={[{ message: "Please Enter LinkedinID" },{ 
                                  pattern: /^https:\/\/www\.linkedin\.com\/in\/.+$/,
                                  message: "Please enter a valid LinkedIn URL"
                                }]}
                              >
                                <Input type="text" />
                              </Form.Item>
                            </Col>
                            <Col span={2}>
                              <Button
                                type="primary"
                                icon={<CloseOutlined />}
                                onClick={() => removeInterview(index)}
                                style={{ marginTop: "30px" }}
                              ></Button>
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </div>
                    <Row {...gutter}>
                      <Col {...span}>
                        <Form.Item name="mode" label="Mode" rules={[{ required: true, message: "Please Mode" }]}>
                          <Select options={mode} />
                        </Form.Item>
                      </Col>
                      <Col {...span}>
                        <Form.Item
                          name="inviteReceived"
                          label="Invite Received"
                          initialValue={inviteReceived}
                          rules={[{ required: true, message: "Please Select Invite Received or Not" }]}
                        >
                          <Switch
                            checked={inviteReceived}
                            onChange={(checked) => {
                              setInviteReceived(checked);
                              form.setFieldValue('inviteReceived', checked); // Update form field value
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col {...span}>
                        <Form.Item
                          name="interviewStatus"
                          label="Interview Status"
                          initialValue={interviewStatus}
                          rules={[{ required: true, message: "Please Select Interview Status" }]}
                        >
                          <Select
                            options={AppConstants.interviewStatus}
                            onChange={handleInterviewStatus}
                            defaultValue={interviewStatus}
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <div>
                      <Form.Item
                        name="comments"
                        label="Comments"
                        rules={[{ required: true, message: "Please write comments" }]}
                      >
                        <TextArea rows={10} />
                      </Form.Item>
                    </div>
                  </div>
                )}
              </div>
            </Form>
          ) : (
            <Stepper
              steps={interviewDetails}
              onStepperItemClick={handleItemClick}
            />
          )}
        </div>
      </Drawer>
      <Modal
        title="Interview Details"
        open={isAddModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Close
          </Button>,
        ]}
        width={700}
        centered
      >
        {selectedInterview && (
          <InterviewModal selectedInterview={selectedInterview} />
        )}
      </Modal>
    </div>
  );
};

export default InterviewColumn;
