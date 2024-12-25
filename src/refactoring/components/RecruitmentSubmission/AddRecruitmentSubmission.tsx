import React, { useEffect, useState } from "react";
import {
  Form,
  Spin,
  message,
  Drawer,
  Button,
  Space,
  Typography,
  Steps,
} from "antd";
import DynamicFormBuilder from "../shared/Form";

import usePost from "../../hooks/usePost";
import {
  addRecruitmentSubmissionFieldsStepOne,
  addRecruitmentSubmissionFieldsStepTwo,
} from "./columns";

import usePut from "../../hooks/usePut";
import RecruitmentSubmissionService from "../../services/RecruitmentSubmissionService";
import {
  formatCreateRecruitmentSubmission,
  formatUpdateEditRecruitmentSubmission,
  formatUpdateRecruitmentSubmission,
} from "./helper";
import { MoreOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import ActiveSubmissionCountTable from "../Recruitment/ActiveSubmissionsTable";

const { Text } = Typography;

const recruitmentSubmissionService = new RecruitmentSubmissionService();

interface RecruitmentFormProps {
  handleCancel: () => void;
  onRecruitmentAdded: () => void;
  requisitionIdsData: any;
  selected: any;
  usersData: any;
  isAddModalVisible: any;
  data?: any;
  context?: any;
}

const AddRecruitmentSubmission: React.FC<RecruitmentFormProps> = (props) => {
  const {
    handleCancel,
    onRecruitmentAdded,
    requisitionIdsData,
    isAddModalVisible,
    selected,
    usersData,
  } = props;

  const user = props?.context?.users;

  const [form] = Form.useForm();
  const [id, setId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isViewTable, setIsViewTable] = useState<boolean>(true);
  const [isEditData, setIsEditData] = useState<any>(null);
  const { postData, loading: creating } = usePost();
  const { putData, loading: updating } = usePut();

  const requistions =
  requisitionIdsData?.data.map((id:string) => ({ name: id, id })) || undefined;

  useEffect(() => {
    if (props?.data?.requisitionId) {
      setId(props?.data?.requisitionId);
      form.setFieldsValue({
        requisitionId: props?.data?.requisitionId,
        status: "Sourcing",
        userStatus:"Yes"
      });
    }
  }, [isViewTable, isAddModalVisible]);
  const handleModal = async (e: any) => {
    e.stopPropagation();
    setIsVisible(true);
  };

  const handleModalCancel = () => {
    setIsVisible(false);
    if (props?.data === undefined) {
      handleCancel();
    }
    setIsViewTable(true);
  };

  useEffect(() => {
    if (isAddModalVisible) {
      setIsViewTable(false);
    }
  }, [isAddModalVisible]);

  useEffect(() => {
    if (selected) {
      const updateValues = formatUpdateRecruitmentSubmission(
        selected,
        usersData
      );
      form.setFieldsValue(updateValues);
    }
  }, [selected]);

  useEffect(() => {
    if (isEditData != null ) {
      const updateValues = formatUpdateEditRecruitmentSubmission(
        isEditData,
        usersData,
        user
      );
      form.setFieldsValue(updateValues);
    }    
  }, [isEditData]);

  const handleCreateRecruitment = async (recruitment: any) => {
    return await postData(
      recruitmentSubmissionService.createRecruitmentSubmission(),
      recruitment
    );
  };

  const handleUpdateRecruitment = async (recruitment: any) => {
    return await putData(
      recruitmentSubmissionService.updateRecruitmentSubmission(
        isEditData ? isEditData?._id : selected._id
      ),
      recruitment
    );
  };
  const handleSubmitRecruitment = async () => {
    await form.validateFields();
    try {
      const payload = await formatCreateRecruitmentSubmission(
        form.getFieldsValue(),
        usersData,
        user
      );

      if (isEditData || selected) await handleUpdateRecruitment(payload);
      else await handleCreateRecruitment(payload);
      if (props?.data === undefined) {
        onRecruitmentAdded();
        handleCancel();
      }
      setIsVisible(true);
      form.resetFields();
      message.success(
        isEditData!==null || selected
          ? "Recruitment Submission updated successfully"
          : "Recruitment Submission created successfully"
      );
      setIsViewTable(true);
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const handleShowTable = () => {
    setIsViewTable(!isViewTable);
    if (isViewTable) {
      setIsEditData(null);
      form.resetFields();
    }
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
        title={
          isViewTable
            ? "Active Submissions"
            : isEditData || selected
              ? "Update Recruitment Submission"
              : "New Recruitment Submission"
        }
        open={isVisible || isAddModalVisible}
        onClose={handleModalCancel}
        maskClosable={false}
        footer={[
          <Button
            key="cancel"
            onClick={handleModalCancel}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>,
          !isViewTable && (
            <Button key="add" type="primary" onClick={handleSubmitRecruitment}>
              {isEditData || selected
                ? "Update Recruitment Submission"
                : "Add Recruitment Submission"}
            </Button>
          ),
        ]}
        width={isViewTable ? "60%" : "50%"}
      >
        {!isAddModalVisible && (
          <div
            style={{
              marginBottom: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button type="primary" onClick={handleShowTable}>
              {isViewTable ? "Add Submission" : "Active Submission List"}
            </Button>
          </div>
        )}
        {isViewTable ? (
          <ActiveSubmissionCountTable
            id={id}
            setIsViewTable={setIsViewTable}
            setIsEditData={setIsEditData}
            user={user}
          />
        ) : (
          <Spin spinning={creating || updating}>
            <Form
              form={form}
              name="recruitment submission"
              initialValues={{
                date: dayjs(),
                status: "Sourcing",
                userStatus: "Yes",
              }}
              layout="vertical"
            >
              <Steps
                direction="vertical"
                items={[
                  {
                    title: "Hiring Information",
                    status: "process",
                    description: (
                      <Space direction="vertical">
                        <Text type="secondary">
                          Fill in the following details to provide applicant
                          information.
                        </Text>
                        <DynamicFormBuilder
                          fields={addRecruitmentSubmissionFieldsStepOne}
                          form={form}
                          columns={2}
                          dynamicOptions={{
                            requisitionId: requistions,
                            submittedBy: usersData ?? user,
                          }}
                        />
                      </Space>
                    ),
                  },
                  {
                    title: "Job Details",
                    status: "process",
                    description: (
                      <Space direction="vertical">
                        <Text type="secondary">
                          Fill in the following details to provide job
                          description.
                        </Text>
                        <DynamicFormBuilder
                          fields={addRecruitmentSubmissionFieldsStepTwo}
                          form={form}
                          columns={2}
                        />
                      </Space>
                    ),
                  },
                ]}
              />
            </Form>
          </Spin>
        )}
      </Drawer>
    </div>
  );
};

export default AddRecruitmentSubmission;
