import React, { useEffect } from "react";
import { Form, Modal, message, Spin } from "antd";
import DynamicFormBuilder from "../shared/Form";

import { formatCreateRecruiter, getCustomerIdByName } from "./helper";
import RecruiterService from "../../services/RecruiterService";
import { addRecruiterFields } from "./columns";
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import ClientService from "../../services/ClientService";
import VendorService from "../../services/VendorService";

const recruiterService = new RecruiterService();

interface AddRecruiterProps {
  handleCancel: () => void;
  onRecruiterAdded: (addedRecruiter: any) => void;
  vendorName?: string;
  vendorCompany_id?: any[];
}
const AddRecruiter: React.FC<AddRecruiterProps> = ({
  handleCancel,
  onRecruiterAdded,
  
  vendorName,
  vendorCompany_id,
}) => {
  const [form] = Form.useForm();
  const { setFieldValue, getFieldValue } = form;
  const type = Form.useWatch("type", form);
  const company_name = Form.useWatch("company_name", form);

  const { postData, loading } = usePost();
  const { fetchData, data: clients } = useGet();
  const { fetchData: fetchVendors, data: vendors } = useGet();

  useEffect(() => {
    fetchData(new ClientService().getSubmissionClients());
    fetchVendors(new VendorService().getSubmissionVendors());
  }, []);

  useEffect(() => {
    setFieldValue("company_name", null);
  }, [type]);

  useEffect(() => {
    let value = null;
    if (company_name) {
      value = getCustomerIdByName(
        type === "vendor" ? vendors : clients,
        getFieldValue("company_name")
      );
    }
    setFieldValue("company_id", value);
  }, [company_name]);

  useEffect(() => {
    if (vendorName) {
      setFieldValue("company_name", vendorName);
    }
  }, [company_name]);

  useEffect(() => {
    if (vendorCompany_id) {
      setFieldValue("company_id", vendorCompany_id);
    }

    setFieldValue("type", "vendor");
  }, [company_name, vendorCompany_id]);




  const handleCreateRecruiter = async () => {
    await form.validateFields();
    const payload = await formatCreateRecruiter(form.getFieldsValue(),);
    const resp = await postData(recruiterService.createRecruiter(), payload);
    onRecruiterAdded(resp);
    handleCancel();
    form.resetFields();
    message.success("Recruiter created successfully");
  };

  return (
    <>
      <Modal
        title="New Recruiter"
        open
        onCancel={handleCancel}
        onOk={handleCreateRecruiter}
        okText="Create recruiter"
        width={700}
        confirmLoading={loading}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{ disabled: loading }}
        centered
      >
        <Spin spinning={loading}>
          <DynamicFormBuilder
            form={form}
            fields={addRecruiterFields}
            columns={3}
            dynamicOptions={{
              company_name: type === "vendor" ? vendors : clients,
            }}
          />
        </Spin>
      </Modal>
    </>
  );
};

export default AddRecruiter;
