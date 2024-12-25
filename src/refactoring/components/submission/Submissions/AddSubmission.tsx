import React, { useEffect, useState } from "react";
import {
  Form,
  message,
  Spin,
  Drawer,
  Steps,
  Button,
  Typography,
  Space,
} from "antd";
import DynamicFormBuilder from "../../shared/Form";

import {
  formatPayload,
  formatUpdateSubmission,
  getUserId,
  handleSameAsVendorChanged,
} from "./helper";
import SubmissionService from "../../../services/SubmissionService";
import {
  addSubmissionFieldsStepOne,
  addSubmissionFiledsStepTwo,
} from "./columns";
import usePost from "../../../hooks/usePost";
import useGet from "../../../hooks/useGet";
import ClientService from "../../../services/ClientService";
import VendorService from "../../../services/VendorService";
import RecruiterService from "../../../services/RecruiterService";
import {
  dummyClientData,
  dummyVendorData,
  dummyVendorRecruiterData,
} from "./constants";
import usePut from "../../../hooks/usePut";
import AddVendor from "../../vendor/AddVendor";
import AddClient from "../../client/AddClient";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import AddRecruiter from "../../recruiter/AddRecruiter";

const { Text } = Typography;

const submissionService = new SubmissionService();
const clientService = new ClientService();
const vendorService = new VendorService();
const recruiterService = new RecruiterService();
//const { Step } = Steps;
interface AddSubmissionProps {
  showAddModal: () => void;
  handleCancel: () => void;
  onSubmissionAdded: () => void;
  selected: any;
  users: any[];
}
const AddSubmission: React.FC<AddSubmissionProps> = ({
  handleCancel,
  onSubmissionAdded,
  selected,
  users,
}) => {
  const [form] = Form.useForm();

  const name = Form.useWatch("userName", form);
  const sameAsVendor = Form.useWatch("sameAsVendor", form);
  const vendorName = Form.useWatch("vendorCompanyName", form);
  const clientName = Form.useWatch("clientCompanyName", form);
  const primeVendorName = Form.useWatch("primeVendorCompanyName", form);
  const vendorRecruiterName = Form.useWatch("vendorRecruiterName", form);
  const [processing, setProcessing] = useState(false);

  const [vendorOptions, setVendorOptions] = useState<any[]>([]);
  const [clientOptions, setClientOptions] = useState<any[]>([]);
  const [recruitersOptions, setRecruitersOptions] = useState<any[]>([]);

  const [vendorRecruiter, setVendorRecruiter] = useState<any[]>([]);
  const [primeVendorRecruiter, setPrimeVendorRecruiter] = useState<any[]>([]);
  const [vendorCompany_id, setVendorCompany_id] = useState<any[]>([]);
  const [primeVendorCompany_id, setPrimeVendorCompany_id] = useState<any[]>([]);

  const [vendorModalVisible, setVendorModalVisible] = useState<any>(false);
  const [isAddPrimeVendor, setIsAddPrimeVendor] = useState<any>(false);
  const [clientModalVisible, setClientModalVisible] = useState<any>(false);
  const [vendorRecruiterModalVisible, setVendorRecruiterModalVisible] =
    useState<any>(false);
  const [isAddPrimeVendorRecruiter, setIsAddPrimeVendorRecruiter] =
    useState<any>(false);

  const { postData, loading: submitting } = usePost();
  const { fetchData, loading } = useGet();
  const { putData, loading: updating } = usePut();

  const getClientData = async () => {
    const res = await fetchData(clientService.getSubmissionClients());
    setClientOptions([dummyClientData, ...res]);
  };

  const getVendorData = async () => {
    const res = await fetchData(vendorService.getSubmissionVendors());
    setVendorOptions([...res, dummyVendorData]);
  };

  const getRecruitersData = async () => {
    const res = await fetchData(recruiterService.getSubmissionRecruiters());
    setRecruitersOptions([...res, dummyVendorRecruiterData]);
  };

  const getRecruiterDetails = async (id: string) => {
    const res = await fetchData(submissionService.getRecruiterDetails(id));

    if (vendorName) {
      setVendorRecruiter(res.data);
    } else if (primeVendorName) {
      setPrimeVendorRecruiter(res.data);
    }
  };

  useEffect(() => {
    getRecruitersData();
    getVendorData();
    getClientData();
  }, []);

  //this is for dropdown items management
  useEffect(() => {
    if (selected && recruitersOptions.length > 0) {
      setProcessing(true);
      const updateValues = formatUpdateSubmission(selected);
      const {
        primeVendorRecruiterName,
        vendorRecruiterName,
        clientRecruiterName,
        primeVendorCompanyName,
      } = updateValues || {};

      form.setFieldsValue(updateValues);

      setTimeout(() => {
        form.setFieldsValue({
          primeVendorRecruiterName,
          vendorRecruiterName,
          clientRecruiterName,
          primeVendorCompanyName,
        });
        primeVendorRecruiterName;
      }, 100);
      setTimeout(() => form.setFieldsValue({ primeVendorRecruiterName }), 200);
      setTimeout(() => setProcessing(false), 500);
    }
  }, [selected, recruitersOptions]);

  // handle same as vendor
  useEffect(() => {
    handleSameAsVendorChanged(
      form,
      sameAsVendor,
      vendorName,
      vendorRecruiterName
    );
  }, [sameAsVendor]);

  //vendor recruiter list updates
  useEffect(() => {
    form.setFieldsValue({ vendorRecruiterName: undefined });
    if (vendorName) {
      const recruiterDetails = vendorOptions.filter(
        (item: any) => item.name === vendorName
      );
      setVendorCompany_id(recruiterDetails[0]?.company_id);
      getRecruiterDetails(String(recruiterDetails[0]?.company_id));
    } else {
      setVendorCompany_id([]);
    }
  }, [vendorName]);

  useEffect(() => {
    form.setFieldsValue({ primeVendorRecruiterName: undefined });

    if (primeVendorName) {
      const recruiterDetails = vendorOptions.filter(
        (item: any) => item.name === primeVendorName
      );

      setPrimeVendorCompany_id(recruiterDetails[0]?.company_id);
      getRecruiterDetails(String(recruiterDetails[0]?.company_id));
    } else {
      setPrimeVendorCompany_id([]);
    }
  }, [primeVendorName]);

  //client recruiter list updates
  useEffect(() => {
    form.setFieldsValue({ clientRecruiterName: "Unknown Recruiter" });
  }, [clientName]);

  //update user id on update of user
  useEffect(() => {
    if (!name) return;
    form.setFieldsValue({ _id: getUserId(users, name) });
  }, [name]);

  // const handleAddVendorClick = async () => {
  //   setIsAddPrimeVendor((pre: boolean) => !pre)
  //   setVendorModalVisible((pre: boolean) => !pre);
  // };

  const handleAddVendorClick = async () => {
    setIsAddPrimeVendor(false);
    setVendorModalVisible(true);
  };

  const handleAddPrimeVendorClick = async () => {
    setIsAddPrimeVendor(true);
    setVendorModalVisible(true);
  };

  const getLatestVendors = async (newVendor: any) => {
    await getVendorData();
    if (isAddPrimeVendor) {
      form.setFieldsValue({ primeVendorCompanyName: newVendor.data.name });
    } else {
      form.setFieldsValue({ vendorCompanyName: newVendor.data.name });
    }
    setVendorModalVisible(false);
  };

  const getVendorRecruitersData = async (newVendor: any) => {
    await getRecruitersData();
    if (isAddPrimeVendorRecruiter) {
      form.setFieldsValue({ primeVendorRecruiterName: newVendor.data.name });
    } else {
      form.setFieldsValue({ vendorRecruiterName: newVendor.data.name });
    }
    setVendorRecruiterModalVisible(false);
  };

  const handleCancelVendorClick = () => {
    setVendorModalVisible(false);
  };
  const handleAddClientClick = () => {
    setClientModalVisible((pre: boolean) => !pre);
  };

  const handleAddPrimeVendorRecruiterClick = () => {
    setIsAddPrimeVendorRecruiter(true);
    setVendorRecruiterModalVisible(false);
  };

  const handleAddVendorRecruiterClick = () => {
    setIsAddPrimeVendorRecruiter(false);
    setVendorRecruiterModalVisible(true);
  };
  const handleCancelVendorRecruiterClick = () => {
    setVendorRecruiterModalVisible(false);
  };

  const handleCancelPrimeVendorRecruiterClick = () => {
    setIsAddPrimeVendorRecruiter(false);
  };

  const getLatestClient = async (newClient: any) => {
    await getClientData();
    form.setFieldsValue({ clientCompanyName: newClient.data.name });
  };

  const handleNewSubmission = async (submission: any) => {
    return await postData(submissionService.createSubmission(), submission);
  };
  const handleUpdateSubmission = async (submission: any) => {
    return await putData(
      submissionService.updateSubmission(selected._id),
      submission
    );
  };

  // const handleVendorRecruiter = (value: any) => {
  //   const recruiterVendor = getRecruitersByType(
  //     recruitersOptions,
  //     "vendor",
  //     value
  //   );
  //   setVendorRecruiter(recruiterVendor);
  // };

  // const handlePrimeVendorRecruiter = (value: any) => {
  //   const recruiterPrimeVendor = getRecruitersByType(
  //     recruitersOptions,
  //     "vendor",
  //     value
  //   );
  //   setPrimeVendorRecruiter([
  //     ...recruiterPrimeVendor,
  //     dummyVendorRecruiterData,
  //   ]);
  // };

  const validateFields = async () => {
    try {
      await form.validateFields();
    } catch (e: any) {
      const field = e.errorFields[0].name;
      form.scrollToField(field);
      throw field + " is not a required";
    }
  };

  const handleSubmitSubmission = async () => {
    await validateFields();
    try {
      const payload = await formatPayload(form, users, recruitersOptions);

      if (selected) handleUpdateSubmission(payload);
      else handleNewSubmission(payload);

      onSubmissionAdded();
      handleCancel();
      form.resetFields();

      message.success(
        selected
          ? "Submission updated successfully"
          : "Submission created successfully"
      );
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const getNotFoundBtn = (onClick: any, text: string) => (
    <Button type="text" block icon={<PlusOutlined />} onClick={onClick}>
      {text}
    </Button>
  );
  
  return (
    <>
      <Drawer
        title={selected ? "Update Submission" : "New Submission"}
        open
        maskClosable={false}
        onClose={handleCancel}
        width="60%"
        footer={[
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>,
          <Button type="primary" onClick={handleSubmitSubmission}>
            {selected ? "Update Submission" : "Add Submission"}
          </Button>,
        ]}
      >
        <Spin spinning={processing || loading || submitting || updating}>
          <Form
            form={form}
            initialValues={{ status: "Applied", date: dayjs() }}
            name="submission"
            layout="vertical"
          >
            <Steps
              direction="vertical"
              items={[
                {
                  title: "Applicant Information",
                  status: "process",
                  description: (
                    <Space direction="vertical">
                      <Text type="secondary">
                        Fill in the following details to provide applicant
                        information.
                      </Text>
                      <DynamicFormBuilder
                        fields={addSubmissionFieldsStepOne}
                        form={form}
                        columns={2}
                        dynamicOptions={{
                          userName: users,
                          vendorCompanyName: vendorOptions,
                          primeVendorCompanyName: vendorOptions,
                          clientCompanyName: clientOptions,
                          vendorRecruiterName: vendorRecruiter,
                          primeVendorRecruiterName: primeVendorRecruiter,
                        }}
                        notFoundContent={{
                          vendorCompanyName: getNotFoundBtn(
                            handleAddVendorClick,
                            "New Vendor"
                          ),
                          primeVendorCompanyName: getNotFoundBtn(
                            handleAddPrimeVendorClick,
                            "New Prime Vendor"
                          ),
                          clientCompanyName: getNotFoundBtn(
                            handleAddClientClick,
                            "New Client"
                          ),
                          vendorRecruiterName: vendorName
                            ? getNotFoundBtn(
                                handleAddVendorRecruiterClick,
                                "New Recruiter"
                              )
                            : null,
                          primeVendorRecruiterName: primeVendorName
                            ? getNotFoundBtn(
                                handleAddPrimeVendorRecruiterClick,
                                "New Recruiter"
                              )
                            : null,
                        }}
                      />
                    </Space>
                  ),
                },
                {
                  title: "Job Description",
                  status: "process",
                  description: (
                    <Space direction="vertical">
                      <Text type="secondary">
                        Fill in the following details to provide job
                        description.
                      </Text>
                      <DynamicFormBuilder
                        fields={addSubmissionFiledsStepTwo}
                        form={form}
                        columns={2}
                      />
                    </Space>
                  ),
                },
              ]}
            />
            {vendorModalVisible && (
              <AddVendor
                handleCancel={handleCancelVendorClick}
                vendorData={vendorOptions}
                onVendorAdded={getLatestVendors}
              />
            )}
            {clientModalVisible && (
              <AddClient
                handleCancel={handleAddClientClick}
                clientData={vendorOptions}
                onClientAdded={getLatestClient}
              />
            )}
            {vendorRecruiterModalVisible && (
              <AddRecruiter
                handleCancel={handleCancelVendorRecruiterClick}
                onRecruiterAdded={getVendorRecruitersData}
                vendorName={vendorName}
                vendorCompany_id={vendorCompany_id}
              />
            )}

            {isAddPrimeVendorRecruiter && (
              <AddRecruiter
                handleCancel={handleCancelPrimeVendorRecruiterClick}
                onRecruiterAdded={getVendorRecruitersData}
                vendorName={primeVendorName}
                vendorCompany_id={primeVendorCompany_id}
              />
            )}
          </Form>
        </Spin>
      </Drawer>
    </>
  );
};

export default AddSubmission;
