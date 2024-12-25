import React, { useEffect } from "react";
import { Form, Spin, message, Drawer, Button, Typography, Space } from "antd";

import DynamicFormBuilder from "../shared/Form";
import {
  formatCreateInterviewPreparation,
  formatUpdateInterviewPreparation,
} from "./helper";

import { addInterviewPreparationFields } from "./columns";
import usePost from "../../hooks/usePost";
import InterviewPreparationService from "../../services/InterviewQuestions";
import usePut from "../../hooks/usePut";

const { Text } = Typography;

const interviewPreparationService = new InterviewPreparationService();
interface InterviewPreparationFormProps {
  handleCancel: () => void;
  InterviewPreparationData: any;
  onInterviewPraparationAdded: () => void;
  clientsData: any[];
  vendorsData: any[];
  tagsRefresh: () => void;
  selected: any;
}

const AddInterviewPreparation: React.FC<InterviewPreparationFormProps> = ({
  handleCancel,
  InterviewPreparationData,
  onInterviewPraparationAdded,
  clientsData,
  vendorsData,
  tagsRefresh,
  selected,
}) => {
  const [form] = Form.useForm();
  const { postData, loading:submitting } = usePost();
  const { putData, loading:updating } = usePut();


  const previousInterview = InterviewPreparationData?.data.find(
    (item: any) => item?._id === selected?._id
  );
  const previousQuestions = previousInterview ? previousInterview.questions : [];

  useEffect(() => {
    if (selected) {
      form.setFieldsValue({
        ...selected,
        tags: selected.tags?[...selected.tags] : [],
        // questions: selected.questions || [],
      });
      
    } else {
      form.resetFields();
    }
  
  }, [selected,form]);


  const handleCreateInterviewPrepation = async () => {
    await form.validateFields();
    try {
      if (selected) await handleUpdateQuestions();
      else await handleAddNewInterviewQuestions();
      onInterviewPraparationAdded();
      tagsRefresh();
      handleCancel();
      form.resetFields();
      message.success(
        selected
          ? "Interview Questions Updated successfully"
          : "Interview Questions created successfully"
      ); 
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleUpdateQuestions = async () => {
    const payload = await formatUpdateInterviewPreparation(
      form.getFieldsValue(),
      previousQuestions
    );

    return await putData(
      interviewPreparationService.updateUserInterview(selected._id),
      payload
    );   
  };

  const handleAddNewInterviewQuestions = async () => {
    const payload = await formatCreateInterviewPreparation(
      form.getFieldsValue()
    );
    return await postData(
      interviewPreparationService.createUserInterview(),
      payload
    );
  };
  return (
    <>
      <Drawer
        title={
          selected ? "Update Interview Questions" : "New Interview Questions"
        }
        open
        closable={!submitting||!updating}
        onClose={handleCancel}
        width="55%"
        footer={[
          <Button
            onClick={handleCancel}
            style={{ marginRight: 8 }}
            disabled={submitting||updating}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            onClick={handleCreateInterviewPrepation}
            disabled={submitting||updating}
          >
            {selected ? "Update Questions" : "Add Questions"}
          </Button>,
        ]}
      >
        <Spin spinning={submitting||updating}>
          <Space direction="vertical">
            <Text type="secondary">Fill in the following details.</Text>
            <DynamicFormBuilder
              form={form}
              fields={addInterviewPreparationFields}
              columns={2}
              dynamicOptions={{
                name: InterviewPreparationData,
                vendor: vendorsData,
                client: clientsData,
              }}
            />
          </Space>
        </Spin>
      </Drawer>
    </>
  );
};

export default AddInterviewPreparation;
