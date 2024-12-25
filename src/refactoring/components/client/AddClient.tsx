import React from "react";
import { Form, Spin, Modal, message } from "antd";
import { ClientCompanyData } from "../../../utils";
import DynamicFormBuilder from "../shared/Form";
import { formatCreateClient } from "./helper";
import ClientService from "../../services/ClientService";
import { addClientFields } from "./columns";
import usePost from "../../hooks/usePost";

const clientService = new ClientService();
interface ClientFormProps {
  handleCancel: () => void;
  clientData: ClientCompanyData[];
  onClientAdded: (newClient: any) => void;
}

const AddClient: React.FC<ClientFormProps> = ({
  handleCancel,
  clientData,
  onClientAdded,
}) => {
  const [form] = Form.useForm();
  const { postData, loading } = usePost();

  const handleCreateClient = async () => {
    await form.validateFields();
    const payload = await formatCreateClient(form.getFieldsValue());
    const resp = await postData(clientService.createClient(), payload);

    onClientAdded(resp);
    handleCancel();
    form.resetFields();
    message.success("Client created successfully");
  };

  return (
    <>
      <Modal
        title="New Client"
        open
        onCancel={handleCancel}
        onOk={handleCreateClient}
        okText="Create client"
        width={500}
        confirmLoading={loading}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{ disabled: loading }}
        centered
      >
        <Spin spinning={loading}>
          <DynamicFormBuilder
            form={form}
            fields={addClientFields}
            columns={1}
            dynamicOptions={{
              name: clientData,
            }}
          />
        </Spin>
      </Modal>
    </>
  );
};

export default AddClient;
