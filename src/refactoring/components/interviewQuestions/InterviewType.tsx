import React, { useEffect } from "react";
import { Form, Button, Spin, message, Drawer, Typography, Space } from "antd";
import usePost from "../../hooks/usePost";
import DynamicFormBuilder from "../shared/Form";
import { addInterviewTypeFields } from "./columns";
import {
  formatCreateInterviewQuestion,
  formatUpdateInterviewQuestion,
} from "./helper";
import InterviewPreparationService from "../../services/InterviewQuestions";
import usePut from "../../hooks/usePut";
import useGet from "../../hooks/useGet";


const { Text } = Typography;

const interviewPreparationService = new InterviewPreparationService();

interface InterviewTypeProps {
  onCancel: () => void;
  selectedInterviewQuestion?: any;
  onInterviewQuestionAdded: () => void;
  selected: any;
}
const InterviewType: React.FC<InterviewTypeProps> = ({
  onCancel,
  selectedInterviewQuestion,
  onInterviewQuestionAdded,
  selected,
}) => {
  const [form] = Form.useForm();
  const {fetchData,data:questionsData}=useGet()
  const { postData, loading:submitting } = usePost();
  const { putData,loading:updating } = usePut();

  const getInterviewQuestionsList=async()=>{
    await fetchData(new InterviewPreparationService().getUserInterviewsQuestion())
  }
  
  const previousInterview = questionsData &&questionsData?.data.find(
    (item: any) => item?._id === selected?._id
  );
  const previousQuestions = previousInterview ? previousInterview.questions : [];

  const handleSubmit = async () => {
    await form.validateFields();
    try{
      if (Object.keys(selected).length > 0) await handleUpdateQuestions();
    else await handleAddNewInterviewQuestions();
    onCancel();
    onInterviewQuestionAdded();
    form.resetFields();
    message.success(selected
      ? "Interview Questions Updated successfully"
      : "Interview Questions created successfully");
    }catch (err: any) {
      message.error(err.message);
    }
  };
  const handleUpdateQuestions = async () => {
    const payload = await formatUpdateInterviewQuestion(
      form.getFieldsValue(),
      selectedInterviewQuestion,
      previousQuestions,
    );
    return await putData(
      interviewPreparationService.updateUserInterview(selected._id),
      payload
    );
  };

  const handleAddNewInterviewQuestions = async () => {
    const payload = await formatCreateInterviewQuestion(
      form.getFieldsValue(),
      selectedInterviewQuestion
    );
    return await postData(
      interviewPreparationService.createUserInterview(),
      payload
    );
  };

  useEffect(()=>{
getInterviewQuestionsList()
  },[])

  useEffect(() => {
    if (selected) {
      form.setFieldsValue(selected);
    } else {
      form.resetFields();
    }
  }, [selected]);

  return (
    <Drawer
      title={
        selected && Object.keys(selected).length > 0
          ? "Update Interview Questions"
          : "Add Interview Questions"
      }
      open
      closable={!submitting||!updating}
      onClose={onCancel}
      width="50%"
      footer={[
        <Button
          onClick={onCancel}
          style={{ marginRight: 8 }}
          disabled={submitting||updating}
        >
          Cancel
        </Button>,
        <Button type="primary" onClick={handleSubmit} disabled={submitting||updating}>
          {selected && Object.keys(selected).length > 0
            ? "Update Questions"
            : "Add Questions"}
        </Button>,
      ]}
    >
      <Spin spinning={submitting||updating}>
        <Space direction="vertical">
          <Text type="secondary">Fill in the following details.</Text>
          <DynamicFormBuilder
            form={form}
            fields={addInterviewTypeFields}
            columns={2}
          />
        </Space>
      </Spin>
    </Drawer>
  );
};

export default InterviewType;
