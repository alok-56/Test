import React from "react";
import { Form, Row, Modal, message, Spin } from "antd";
import DynamicFormBuilder from "../shared/Form";

import { formatCreateInterview } from "./helper";
import InterviewService from "../../services/InterviewService";
import { addInterviewFields } from "./columns";
import usePost from "../../hooks/usePost";

const interviewService = new InterviewService();

interface AddInterviewProps {
  handleCancel: () => void;
  onInterviewAdded: () => void;
}
const AddInterview: React.FC<AddInterviewProps> = ({
  handleCancel,
  onInterviewAdded,
}) => {
  const [form] = Form.useForm();
  const { postData, loading } = usePost();

  const handleCreateInterview = async () => {
    await form.validateFields();
    const payload = await formatCreateInterview(form.getFieldsValue());
    await postData(interviewService.createInterview(), payload);
    onInterviewAdded();
    handleCancel();
    form.resetFields();
    message.success("Interview Created Successfully");
  };

  return (
    <>
      <Modal
        title="New Interview"
        open
        onCancel={handleCancel}
        onOk={handleCreateInterview}
        okText="Create Interview"
        width={700}
        confirmLoading={loading}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{ disabled: loading }}
        centered
      >
        <Spin spinning={loading}>
          <DynamicFormBuilder
            form={form}
            fields={addInterviewFields}
            columns={3}
          />
          <Row style={{ marginTop: 8 }} />
        </Spin>
      </Modal>
    </>
  );
};

export default AddInterview;
