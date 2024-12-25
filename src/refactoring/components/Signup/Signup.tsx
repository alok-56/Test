import React, { useEffect, useState } from "react";
import { Form, message, Card, Steps, Space, Typography, Button } from "antd";
import DynamicFormBuilder from "../shared/Form";
import {
  formatCreateUser,
  formatUpdateHiringUser,
  formatUpdateRequiredFields,
} from "./helper";
import {
  addAdditionalInformation,
  addAdditionalInformation1,
  addEducationDetails,
  addPersonalInformation,
  resumeUpdateUpload,
  resumeUpload,
  workExperience,
} from "./columns";
import "./Signup.css";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_URL, REACT_API_URL } from "../../../urlConfig";
import axiosInstance from "../../services/shared/AxiosService";
import HiringService from "../../services/HiringService";
import usePut from "../../hooks/usePut";
import AppUtils from "../../utils/AppUtils";
import { CustomReviewComponent } from "../../utils/CustomButton";
import AddingUser from "../Hiring/addingUser";
import { LinkOutlined, PlusOutlined } from "@ant-design/icons";
import ThinklusiveLogo from "./ThinklusiveLogo";
import ResumeView from "./Resume";

const { Text, Title } = Typography;
const hiringService = new HiringService();
const Signup: React.FC = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;

  const { putData } = usePut();
  const [columns, setColumns] = useState<number>(3);
  const [resumeListModalVisible, setResumeListModalVisible] =
    useState<boolean>(false);
  const [isAddVisible, setIsAddVisible] = useState<boolean>(false);

  const { selectedHiring } = location?.state || {};

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 576) {
      setColumns(1);
    } else if (window.innerWidth < 768) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  };

  const handleCreateHiring = async (payload: any) => {
    return await axiosInstance.post(`${REACT_API_URL}/hiring`, payload, {
      headers: {
        "Content-Type": "multipart/form-data: boundary=add-random-characters",
      },
    });
  };

  const handleAddUser = () => {
    setIsAddVisible(true);
  };

  const handleDocument = () => {
    setResumeListModalVisible(true);
  };

  const handleModalCancel = () => {
    setResumeListModalVisible(false);
  };

  const handleGoToHome = () => {
    navigate(selectedHiring ? "/v1/hiring" : "/login");
  };

  const handleUpdateHiring = async (hiring: any) => {
    return await putData(
      hiringService.updateHiring(selectedHiring._id),
      hiring
    );
  };

  const handleSubmitUser = async () => {
    await form.validateFields();

    const payload = selectedHiring
      ? await formatUpdateRequiredFields(form.getFieldsValue(true))
      : await formatCreateUser(form.getFieldsValue(true));

    try {
      if (selectedHiring) await handleUpdateHiring(payload);
      else await handleCreateHiring(payload);

      form.resetFields();
      message.success(
        selectedHiring
          ? "Hiring Updated Successfully"
          : "Hiring Done Successfully"
      );
      selectedHiring ? navigate("/v1/hiring") : navigate(LOGIN_URL);
    } catch (err: any) {
      message.error(err.response.data.message || err?.message);
    }
  };

  useEffect(() => {
    if (selectedHiring) {
      const updatedValues = formatUpdateHiringUser(selectedHiring);
      form.setFieldsValue(updatedValues);
    }
  }, [selectedHiring, form]);

  const updatePath = pathname === "/v1/hiring-form";

  return (
    <div
      style={{ height: selectedHiring ? "90vh" : "100vh", overflowY: "auto" }}
    >
      {!selectedHiring && <ThinklusiveLogo />}
      <Card>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title level={3}>
              {selectedHiring
                ? AppUtils.valueFormatter({
                    value: `${selectedHiring.hiringUser?.firstName} ${selectedHiring.hiringUser?.lastName}`,
                  })
                : "User Registration Form"}
            </Title>
            {selectedHiring ? (
              <Text style={{ marginTop: "20px", marginLeft: "20px" }}>
                {CustomReviewComponent(selectedHiring?.reviewStatus)}
              </Text>
            ) : (
              ""
            )}
          </div>
          {selectedHiring && (
            <div>
              <Button
                type="primary"
                onClick={handleAddUser}
                style={{ marginRight: "10px" }}
                icon={<PlusOutlined />}
              >
                Add User
              </Button>
              <Button
                type="primary"
                icon={<LinkOutlined />}
                onClick={handleDocument}
              >
                Documents
              </Button>
            </div>
          )}
        </div>
        <Form
          form={form}
          name="New User"
          layout="vertical"
          initialValues={{
            relocateToOffice: selectedHiring?(String(selectedHiring?.hiringUser?.relocateToOffice)==="true"?true:false):true,
            anyUSALocation:selectedHiring?selectedHiring?.hiringUser?.anyUSALocation:true,
          }}
          onFinish={handleSubmitUser}
        >
          <Steps
            progressDot={selectedHiring ? false : true}
            direction="vertical"
            items={[
              {
                title: (
                  <Text style={{ fontSize: "18px", fontWeight: "normal" }}>
                    Personal Information
                  </Text>
                ),

                description: (
                  <div className="step-card">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <DynamicFormBuilder
                        fields={addPersonalInformation}
                        form={form}
                        columns={columns}
                      />
                    </Space>
                  </div>
                ),
              },
              {
                title: (
                  <Text style={{ fontSize: "18px", fontWeight: "normal" }}>
                    Educational Information
                  </Text>
                ),

                description: (
                  <div className="step-card">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <DynamicFormBuilder
                        fields={addEducationDetails}
                        form={form}
                        columns={columns}
                      />
                    </Space>
                  </div>
                ),
              },
              {
                title: (
                  <Text style={{ fontSize: "18px", fontWeight: "normal" }}>
                    Work Experience
                  </Text>
                ),

                description: (
                  <div className="step-card">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <DynamicFormBuilder
                        fields={workExperience}
                        form={form}
                        columns={columns}
                      />
                    </Space>
                  </div>
                ),
              },
              {
                title: (
                  <Text style={{ fontSize: "18px", fontWeight: "normal" }}>
                    Additional Information
                  </Text>
                ),

                description: (
                  <div className="step-card">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <DynamicFormBuilder
                        fields={
                          updatePath
                            ? addAdditionalInformation1
                            : addAdditionalInformation
                        }
                        form={form}
                        columns={columns}
                      />
                    </Space>
                  </div>
                ),
              },
              {
                title: (
                  <Text style={{ fontSize: "18px", fontWeight: "normal" }}>
                    Resume Upload
                  </Text>
                ),

                description: (
                  <div className="step-card">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <DynamicFormBuilder
                        fields={
                          selectedHiring ? resumeUpdateUpload : resumeUpload
                        }
                        form={form}
                        columns={columns}
                      />
                    </Space>
                  </div>
                ),
              },
            ]}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              ghost
              type="primary"
              onClick={handleGoToHome}
              style={{ marginRight: "20px" }}
            >
              {selectedHiring ? "Cancel" : "Go To Home"}
            </Button>
            <Button type="primary" onClick={handleSubmitUser}>
              {selectedHiring ? "Save" : "Register"}
            </Button>
          </div>
        </Form>
      </Card>
      {resumeListModalVisible && (
        <ResumeView
          resumeListModalVisible={resumeListModalVisible}
          handleModalCancel={handleModalCancel}
          selectedHiring={selectedHiring}
        />
      )}

      {isAddVisible && (
        <AddingUser
          selectedHiring={selectedHiring}
          setIsAddVisible={setIsAddVisible}
          isAddVisible={isAddVisible}
        />
      )}
    </div>
  );
};

export default Signup;
