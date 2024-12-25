import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Switch,
  message,
} from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axiosInstance from "../../refactoring/services/shared/AxiosService";
import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../../refactoring/utils/AppUtils";
import AppConstants from "../../refactoring/components/shared/constants";

const gutter = { gutter: 16 };
const span = { span: 8 };
const { TextArea } = Input;

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
  { value: "Video", label: "Video" },
  { value: "OnlineTest", label: "Online Test" },
  { value: "Video+Coding", label: "Video+Coding" },
];

const InterviewForm: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const location = useLocation();
  const { selectedInterview } = location?.state || {};

  const [inviteReceived, setInviteReceived] = useState<boolean>(
    selectedInterview?.inviteReceived
  );
  const [interviewStatus, setInterviewStatus] = useState<string>(selectedInterview?.interviewStatus);
  const [selectStatus, setSelectStatus] = useState<any>("");
  const [interviewPanel, setInterviewPanel] = useState([
    { name: "", mailID: "", linkedinID: "" },
  ]);

  const handleCancel = () => {
    navigate("/v1/interviews");
  };

  const handleStatus = (value: any) => {
    setSelectStatus(value);
  };

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

  const handleDone = async () => {
    try {
      await form.validateFields()
      const panel: any = form.getFieldsValue(true)["interviewPanel"];

      const interviewDetail = form.getFieldsValue([
        "start_time",
        "end_time",
        "status",
        "comments",
        "interviewStatus",
        "mode",
        "inviteReceived",
        "interviewQuestions",
      ]);

      const dateTimeStr1 = interviewDetail.start_time.$d;
      const dateTimeStr2 = interviewDetail.end_time.$d;
      const formatterData = {
        submission_id: selectedInterview.submission_id,
        status: interviewDetail.status,
        comments: interviewDetail.comments,
        start_time: AppUtils.dateToUnix(dateTimeStr1),
        end_time: AppUtils.dateToUnix(dateTimeStr2),
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

      await axiosInstance.put(
        `${REACT_API_URL}/interview/${selectedInterview?._id}`,
        formatterData
      );

      message.success("Interview Updated Successfully");
      navigate("/v1/interview");
    } catch (error) {
      console.error(error);
    }
  };
  const handleInterviewStatus = (value: any) => {
    setInterviewStatus(value);
  };

  return (
    <div style={{ margin: 20, height: "100%" }}>
      <Form form={form} layout="vertical">
        <Row {...gutter}>
          <Col {...span}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please Select Status" }]}
              initialValue={selectedInterview && selectedInterview?.status}
            >
              <Select
                options={Status}
                onChange={handleStatus}
                defaultValue={selectStatus}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row {...gutter}>
          <Col {...span}>
            <Form.Item
              name="start_time"
              label="Start Time"
              rules={[{ required: true, message: "Please Select Start Time" }]}
              initialValue={
                selectedInterview && dayjs.unix(selectedInterview?.start_time)
              }
            >
              <DatePicker showTime={{ format: "HH:mm" }} />
            </Form.Item>
          </Col>
          <Col {...span}>
            <Form.Item
              name="end_time"
              label="End Time"
              rules={[{ required: true, message: "Please Select End Time" }]}
              initialValue={
                selectedInterview && dayjs.unix(selectedInterview?.end_time)
              }
            >
              <DatePicker showTime={{ format: "HH:mm" }} />
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
                      selectedInterview && selectedInterview?.panel[index]?.name
                    }
                    rules={[
                      { message: "Please Enter panel name", required: true },
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
                    rules={[{ message: "Please Enter LinkedinID" }]}
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
            <Form.Item
              name="mode"
              label="Mode"
              rules={[{ required: true, message: "Please Select Mode" }]}
              initialValue={selectedInterview && selectedInterview?.mode}
            >
              <Select options={mode} />
            </Form.Item>
          </Col>
          <Col {...span}>
            <Form.Item
              name="inviteReceived"
              label="Invite Received"
              rules={[{ required: true, message: "Please Select Received or Not" }]}
              initialValue={
                selectedInterview && selectedInterview?.inviteReceived
              }
            >
              <Switch
                defaultChecked={selectedInterview?.inviteReceived}
                checked={inviteReceived}
                onChange={(checked) => setInviteReceived(checked)}
              />
            </Form.Item>
          </Col>
          <Col {...span}>
            <Form.Item
              name="interviewStatus"
              label="Interview Status"
              rules={[{ required: true, message: "Please Select Interview Status" }]}
              initialValue={
                selectedInterview && selectedInterview?.interviewStatus
              }
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
            rules={[{ required: true, message: "Enter your comments" }]}
            initialValue={selectedInterview && selectedInterview?.comments}
          >
            <TextArea rows={4} cols={4} style={{ width: "100%" }} />
          </Form.Item>
        </div>
      </Form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button type="primary" onClick={handleDone}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default InterviewForm;
