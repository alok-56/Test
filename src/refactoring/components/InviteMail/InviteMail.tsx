import { Button, Form, message, Modal, Spin } from "antd";
import React from "react";
import DynamicFormBuilder from "../shared/Form";
import { addInviteFields } from "./columns";
import usePost from "../../hooks/usePost";
import HiringService from "../../services/HiringService";
import { formatCreateEmail } from "./helper";

const hiringService = new HiringService();
interface InviteMailProps {
  handleCancel: () => void;
}

const InviteMail: React.FC<InviteMailProps> = ({ handleCancel }) => {
  const [form] = Form.useForm();

  const { postData, loading } = usePost();

  const handleCreateInvite = async () => {
    await form.validateFields();
    const payload = await formatCreateEmail(form.getFieldsValue());
    await postData(hiringService.createInvite(), payload);

    handleCancel();
    form.resetFields();
    message.success("Invite Send successfully");
  };

  return (
    <>
      <Modal
        title="New Invite"
        open={true}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleCreateInvite}>
            Send
          </Button>,
        ]}
        width={500}
        confirmLoading={loading}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{ disabled: loading }}
        centered
      >
        <Spin spinning={loading}>
          <DynamicFormBuilder
            fields={addInviteFields}
            form={form}
            columns={1}
          />
        </Spin>
      </Modal>
    </>
  );
};
export default InviteMail;
