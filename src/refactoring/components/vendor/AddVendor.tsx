import React from "react";
import { Form, Spin, Modal, message } from "antd";
import { VendorCompanyData } from "../../../utils";
import { formatCreateVendor } from "./helper";
import usePost from "../../hooks/usePost";
import VendorService from "../../services/VendorService";
import DynamicFormBuilder from "../shared/Form";
import { addVendorFields } from "./columns";

const vendorService = new VendorService();
interface VendorFormProps {
  handleCancel: () => void;
  vendorData: VendorCompanyData[];
  onVendorAdded: (addedVendor: any) => void;
}

const AddVendor: React.FC<VendorFormProps> = ({
  handleCancel,
  vendorData,
  onVendorAdded,
}) => {
  const [form] = Form.useForm();
  const { postData, loading } = usePost();

  const handleCreateVendor = async () => {
    await form.validateFields();
    const payload = await formatCreateVendor(form.getFieldsValue());
    const resp = await postData(vendorService.createVendor(), payload);
    onVendorAdded(resp);
    handleCancel();
    form.resetFields();
    message.success("Vendor created successfully");
  };

  return (
    <>
      <Modal
        title="New Vendor"
        open
        onCancel={handleCancel}
        onOk={handleCreateVendor}
        okText="Create vendor"
        width={500}
        confirmLoading={loading}
        okButtonProps={{ loading: loading }}
        cancelButtonProps={{ disabled: loading }}
        centered
      >
        <Spin spinning={loading}>
          <DynamicFormBuilder
            form={form}
            fields={addVendorFields}
            columns={1}
            dynamicOptions={{ name: vendorData }}
          />
        </Spin>
      </Modal>
    </>
  );
};

export default AddVendor;
