import { Form, Modal, Spin, message } from "antd";
import React, { useEffect } from "react";
import DynamicFormBuilder from "../shared/Form";
import usePost from "../../hooks/usePost";

import { addKeywordFields } from "./columns";
import GlossaryService from "../../services/GlossaryService";
import { formatCreateGlossary } from "./helper";
import usePut from "../../hooks/usePut";

const glossaryService = new GlossaryService();

interface GlossaryProps {
  glossaryData: any;
  handleCancel: () => void;
  onGlossaryAdded: () => void;
  selected: any;
}

const AddKeyword: React.FC<GlossaryProps> = ({
  glossaryData,
  handleCancel,
  onGlossaryAdded,
  selected,
}) => {
  const [form] = Form.useForm();
  const { postData, loading } = usePost();
  const { putData, loading: updating } = usePut();

  useEffect(() => {
    if (selected) {
      form.setFieldsValue({
        ...selected,
        tags: selected.tags?[...selected.tags] :[],
      });
    } else {
      form.resetFields();
    }
  }, [selected, form]);

  const handleCreateGlossary = async (glossary: any) => {
    return await postData(glossaryService.createKeyword(), glossary);
  };

  const handleUpdateGlossary = async (glossary: any) => {
    return await putData(glossaryService.updateKeyword(selected._id), glossary);
  };

  const handleSubmitGlossary = async () => {
    await form.validateFields();
    try {
      const payload = await formatCreateGlossary(form.getFieldsValue());

      if (selected) await handleUpdateGlossary(payload);
      else await handleCreateGlossary(payload);
      onGlossaryAdded();
      handleCancel();
      form.resetFields();
      message.success(
        selected
          ? "Keyword updated successfully"
          : "Keyword created successfully"
      );
    } catch (err: any) {
    }
  };

  return (
    <>
      <Modal
        title={selected ? "Update Keyword" : "New Keyword"}
        open
        onCancel={handleCancel}
        onOk={handleSubmitGlossary}
        okText={selected ? "Update Keyword" : "Create Keyword"}
        width={500}
        confirmLoading={selected ? updating : loading}
        okButtonProps={{ loading: selected ? updating : loading }}
        cancelButtonProps={{ disabled: selected ? updating : loading }}
        centered
      >
        <Spin spinning={selected ? updating : loading}>
          <DynamicFormBuilder
            form={form}
            fields={addKeywordFields}
            columns={2}
            dynamicOptions={{
              name: glossaryData,
            }}
          />
        </Spin>
      </Modal>
    </>
  );
};

export default AddKeyword;
