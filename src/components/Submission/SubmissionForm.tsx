import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Steps,
  message,
  AutoComplete,
  Checkbox,
  Card,
} from "antd";
import dayjs from "dayjs";
import { UserData, getToken, localHost, localIp } from "../../utils";

import { useNavigate, useLocation } from "react-router-dom";

import { ClientCompanyData } from "../../utils";
import { RecruiterData } from "../../utils";
import { VendorCompanyData } from "../../utils";
import NavigationButtons from "../form/NavigationButtons";
import FormContent from "../form/FormContent";
import BreadcrumbComponent from "../Breadcrumb/BreadcrumbComponent";
import { useUser } from "../../context/UserContext";

import { CheckboxChangeEvent } from "antd/es/checkbox";
import axiosInstance from "../../refactoring/services/shared/AxiosService";
import { DEFAULT_URL } from "../../urlConfig";

const { TextArea } = Input;
const span = { span: 8 };
const gutter = { gutter: 16 };


const submittedBy = [
  { value: "Tarun Gundu", label: "Tarun Gundu" },
  { value: "Dileep Kumar Bodeddu", label: "Dileep Kumar Bodeddu" },
  { value: " Vamsi Krishna", label: " Vamsi Krishna" },
  { value: "Pushpak Kumar", label: "Pushpak Kumar" },
  { value: "Sai Uttej Ponnada", label: "Sai Uttej Ponnada" },
  { value: "Sam", label: "Sam" },
  { value: "Self", label: "Self" },
  { value: "Others", label: "Others" },
];

const { Step } = Steps;

const SubmissionForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const { setFieldsValue } = form;
  const { isAdmin, user } = useUser();

  const [clientsData, setClientsData] = useState<ClientCompanyData[]>([]);
  const [parmenentRecuitersData, setParmenentRecuitersData] = useState<
    RecruiterData[]
  >([]);
  const [recruitersData, setRecruitersData] = useState<any[]>([]);
  const [vendorsData, setVendorsData] = useState<VendorCompanyData[]>([]);
  const [usersData, setUserData] = useState<UserData[]>([]);
  const [sameAsVendor, setSameAsVendor] = useState(false);
  const { selectedSubmission, updatedDisabledDate } = location?.state || {};

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const dummyClientData: any = { _id: "C0000", name: "Unknown" };
  // const dummyVendorData: any = { _id: "V0000", name: "Unknown" };

  const dummyClientRecruiterData: any = {
    name: "Unknown Recruiter",
    rec_id: "RC000",
    email: "recruiter1@example.com",
    contact: "1234567890",
    type: "Client",
  };

  // const dummyVendorRecruiterData: any = {
  //   name: "Unknown Recruiter",
  //   rec_id: "RV001",
  //   email: "recruiterA@example.com",
  //   contact: "1234567890",
  //   type: "Vendor",
  // };

  useEffect(() => {
    if (!isAdmin) {
      if (user) {
        setFieldsValue({
          _id: user.profile?._id,
          name: user.profile?.firstName,
        });
      }
    }
  }, [isAdmin]);

  const handleSameAsVendorChange = (e: CheckboxChangeEvent) => {
    const { checked } = e.target;
    setSameAsVendor(checked);

    if (checked) {
      const vendorCompany_id = form.getFieldValue("vendorCompany_id");
      const vendorCompanyName = form.getFieldValue("vendorCompanyName");
      const vendorRecruiterName = form.getFieldValue("vendorRecruiterName");
      const vendorRec_id = form.getFieldValue("vendorRec_id");
      const vendorRecruiterEmail = form.getFieldValue("vendorRecruiterEmail");
      const vendorRecruiterContact = form.getFieldValue(
        "vendorRecruiterContact"
      );

      form.setFieldsValue({
        primeVendorCompany_id: vendorCompany_id,
        primeVendorCompanyName: vendorCompanyName,
        primeVendorRecruiterName: vendorRecruiterName,
        primeVendorRecruiterRec_id: vendorRec_id,
        primeVendorRecruiterEmail: vendorRecruiterEmail,
        primeVendorRecruiterContact: vendorRecruiterContact,
      });
    } else {
      form.setFieldsValue({
        primeVendorCompany: undefined,
        primeVendorCompany_id: undefined,
        primeVendorRecruiterName: undefined,
        primeVendorRec_id: undefined,
        primeVendorRecruiterEmail: undefined,
        primeVendorRecruiterContact: undefined,
      });
    }
  };

  const handleUserChange = (value: string) => {
    const selectedUser = usersData.find(
      (user) => user.profile?.firstName === value
    );

    if (selectedUser) {
      setFieldsValue({
        _id: selectedUser.profile?._id,
      });
    } else {
      setFieldsValue({
        _id: undefined,
      });
    }
  };

  const handleCompanyChange = (value: string) => {
    const selectedCompany = clientsData.find((client) => client.name === value);

    if (selectedCompany) {
      setFieldsValue({
        clientCompany_id: selectedCompany.company_id,
        tags: selectedCompany.tags || [],
      });

      const filteredRecruiters = parmenentRecuitersData.filter(
        (recruiter) => recruiter.company_id === selectedCompany.company_id
      );

      setRecruitersData(filteredRecruiters);
    } else if (value === "Unknown") {
      setFieldsValue({
        clientCompany_id: "C0000",
      });
    } else {
      setFieldsValue({
        clientCompany_id: undefined,
        tags: [],
      });
      setRecruitersData([]);
    }
  };

  const handleRecruiterChange = (value: string) => {
    const selectedRecruiter = recruitersData
      .concat(dummyClientRecruiterData)
      .find((recruiter: any) => recruiter?.name === value);

    if (selectedRecruiter) {
      setFieldsValue({
        clientRec_id: selectedRecruiter.rec_id,
        clientRecruiterEmail: selectedRecruiter.email,
        clientRecruiterContact: selectedRecruiter.contact,
      });
    } else if (value === "Unknown Recruiter") {
      setFieldsValue({
        clientRec_id: selectedRecruiter.rec_id,
        clientRecruiterEmail: selectedRecruiter.email,
        clientRecruiterContact: selectedRecruiter.contact,
      });
    } else {
      setFieldsValue({
        clientRec_id: undefined,
        clientRecruiterEmail: undefined,
        clientRecruiterContact: undefined,
      });
    }
  };

  const handleVendorCompanyChange = (value: string) => {
    const selectedCompany = vendorsData.find((vendor) => vendor.name === value);

    if (selectedCompany) {
      setFieldsValue({
        vendorCompany_id: selectedCompany.company_id,
      });

      const filteredRecruiters = parmenentRecuitersData.filter(
        (recruiter) => recruiter.company_id === selectedCompany.company_id
      );

      setRecruitersData(filteredRecruiters);
    } else if (value === "Unknown") {
      setFieldsValue({
        vendorCompany_id: "V0000",
      });
    } else {
      setFieldsValue({
        vendorCompany_id: undefined,
      });
      setRecruitersData([]);
    }
  };

  const handleVendorRecruiterChange = (value: string) => {
    const selectedRecruiter = recruitersData
      //.concat(dummyVendorRecruiterData)
      .find((recruiter) => recruiter?.name === value);

    if (selectedRecruiter) {
      setFieldsValue({
        vendorRec_id: selectedRecruiter.rec_id,
        vendorRecruiterEmail: selectedRecruiter.email,
        vendorRecruiterContact: selectedRecruiter.contact,
      });
    } else if (value === "Unknown Recruiter") {
      setFieldsValue({
        vendorRec_id: selectedRecruiter.rec_id,
        vendorRecruiterEmail: selectedRecruiter.email,
        vendorRecruiterContact: selectedRecruiter.contact,
      });
    } else {
      setFieldsValue({
        vendorRec_id: undefined,
        vendorRecruiterEmail: undefined,
        vendorRecruiterContact: undefined,
      });
    }
  };

  const handlePrimeVendorCompanyChange = (value: string) => {
    const selectedCompany = vendorsData.find((vendor) => vendor.name === value);

    if (selectedCompany) {
      setFieldsValue({
        primeVendorCompany_id: selectedCompany.company_id,
      });

      const filteredRecruiters = parmenentRecuitersData.filter(
        (recruiter) => recruiter.company_id === selectedCompany.company_id
      );

      setRecruitersData(filteredRecruiters);
    } else if (value === "Unknown") {
      setFieldsValue({
        primeVendorCompany_id: "V0000",
      });
    } else {
      setFieldsValue({
        primeVendorCompany_id: undefined,
      });
      setRecruitersData([]);
    }
  };

  const handlePrimeVendorRecruiterChange = (value: string) => {
    const selectedRecruiter = recruitersData
      //.concat(dummyVendorRecruiterData)
      .find((recruiter) => recruiter?.name === value);

    if (selectedRecruiter) {
      setFieldsValue({
        primeVendorRecruiterRec_id: selectedRecruiter.rec_id,
        primeVendorRecruiterEmail: selectedRecruiter.email,
        primeVendorRecruiterContact: selectedRecruiter.contact,
      });
    } else {
      setFieldsValue({
        primeVendorRecruiterRec_id: undefined,
        primeVendorRecruiterEmail: undefined,
        primeVendorRecruiterContact: undefined,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axiosInstance.get(
          `http://${localHost}:${localIp}/api/v1/user`,
          {
            headers: {
              Authorization: `access_Token ${getToken()}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (isAdmin) {
          setUserData(userResponse.data);
        } else {
          setUserData([userResponse.data]);
        }
        //setUserData(userResponse.data)

        const response = await axiosInstance.get(
          `http://${localHost}:${localIp}/api/v1/client`,
          {
            headers: {
              Authorization: `access_Token ${getToken()}`,
              "Content-Type": "application/json",
            },
          }
        );

        setClientsData(response.data);

        const vendorsResponse = await axiosInstance.get(
          `http://${localHost}:${localIp}/api/v1/vendor`,
          {
            headers: {
              Authorization: `access_Token ${getToken()}`,
              "Content-Type": "application/json",
            },
          }
        );

        setVendorsData(vendorsResponse.data);

        const recruitersResponse = await axiosInstance.get(
          `http://${localHost}:${localIp}/api/v1/recruiter`,
          {
            headers: {
              Authorization: `access_Token ${getToken()}`,
              "Content-Type": "application/json",
            },
          }
        );
        const recruitersDetails = recruitersResponse.data;
        setParmenentRecuitersData(recruitersDetails);
        setRecruitersData(recruitersDetails);
      } catch (error: any) {
        console.error("Error fetching client details:", error);
        message.error(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  const handleSubmission = async () => {
    try {
      const profile = form.getFieldsValue(["_id", "name"]);

      const client = form.getFieldsValue([
        "clientCompany_id",
        "clientCompanyName",
        "tags",
      ]);
      const clientRecruiter = form.getFieldsValue([
        "clientRecruiterName",
        "clientRec_id",
        "clientRecruiterEmail",
        "clientRecruiterContact",
      ]);

      const vendor = form.getFieldsValue([
        "vendorCompany_id",
        "vendorCompanyName",
      ]);
      const vendorRecruiter = form.getFieldsValue([
        "vendorRecruiterName",
        "vendorRec_id",
        "vendorRecruiterEmail",
        "vendorRecruiterContact",
      ]);
      const primeVendor = form.getFieldsValue([
        "primeVendorCompany_id",
        "primeVendorCompanyName",
      ]);
      const primeVendorRecruiter = form.getFieldsValue([
        "primeVendorRecruiterName",
        "primeVendorRecruiterRec_id",
        "primeVendorRecruiterEmail",
        "primeVendorRecruiterContact",
      ]);
      const additional = form.getFieldsValue([
        "date",
        "jobRole",
        "salesRecruiter",

        "jobDescription",
        "workLocation",
        "comments",
      ]);
      const formattedDate = additional.date.toDate().valueOf();
      const formattedData = {
        tags: null,
        subDetails: {
          profile: {
            _id: profile?._id,
            name: profile.name,
          },
          client: {
            company_id: client.clientCompany_id,
            name: client.clientCompanyName,
            recruiter: {
              rec_id: clientRecruiter.clientRec_id,
              name: clientRecruiter.clientRecruiterName,
              email: clientRecruiter.clientRecruiterEmail,
              contact: clientRecruiter.clientRecruiterContact,
            },
          },
          vendor: {
            company_id: vendor.vendorCompany_id,
            name: vendor.vendorCompanyName,
            recruiter: {
              rec_id: vendorRecruiter.vendorRec_id,
              name: vendorRecruiter.vendorRecruiterName,
              email: vendorRecruiter.vendorRecruiterEmail,
              contact: vendorRecruiter.vendorRecruiterContact,
            },
          },
          primeVendor: {
            company_id: primeVendor.primeVendorCompany_id,
            name: primeVendor.primeVendorCompanyName,
            recruiter: {
              rec_id: primeVendorRecruiter.primeVendorRecruiterRec_id,
              name: primeVendorRecruiter.primeVendorRecruiterName,
              email: primeVendorRecruiter.primeVendorRecruiterEmail,
              contact: primeVendorRecruiter.primeVendorRecruiterContact,
            },
          },
          date: formattedDate,
          jobRole: additional.jobRole,
          jobDescription: additional.jobDescription,
          salesRecruiter: additional.salesRecruiter,
          status: selectedSubmission?.subDetails?.status || "Applied",
          workLocation: additional.workLocation,
          comments: additional.comments,
        },
      };
      selectedSubmission
        ? await axiosInstance.put(
            `http://${localHost}:${localIp}/api/v1/submission/${selectedSubmission?._id}`,
            formattedData,
            {
              headers: {
                Authorization: `access_Token ${getToken()}`,
                "Content-Type": "application/json",
              },
            }
          )
        : await axiosInstance.post(
            `http://${localHost}:${localIp}/api/v1/submission`,
            formattedData,
            {
              headers: {
                Authorization: `access_Token ${getToken()}`,
                "Content-Type": "application/json",
              },
            }
          );

      {
        selectedSubmission
          ? message.success("Submission Updated successfully!")
          : message.success("Submission Created successfully!");
      }

      navigate(DEFAULT_URL, { state: { openSubmissionTable: true } });
    } catch (error: any) {
      console.error("Error creating submission:", error);
      message.error(error.response.data.message);
    }
  };

  const steps = [
    {
      title: "Profile",
      content: (
        <div className="profile">
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="name"
                label="Name"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.profile?.name
                }
                rules={[{ required: true, message: "Please Enter Name" }]}
              >
                <AutoComplete
                  showSearch
                  placeholder="Enter User Name"
                  filterOption={(inputValue, option) =>
                    option && typeof option.value === "string"
                      ? option.value
                          .toUpperCase()
                          .includes(inputValue.toUpperCase())
                      : false
                  }
                  onChange={(value) => handleUserChange(value)}
                  onSelect={(value) => handleUserChange(value)}
                  disabled={(!isAdmin || selectedSubmission) && true}
                >
                  {isAdmin ? (
                    usersData?.map((user) => (
                      <AutoComplete.Option
                        key={user?.profile?._id}
                        value={user?.profile?.firstName}
                      >
                        {user?.profile?.firstName}
                      </AutoComplete.Option>
                    ))
                  ) : (
                    <AutoComplete.Option
                      key={user?.profile?._id}
                      value={user?.profile?.firstName}
                    >
                      {user?.profile?.firstName}
                    </AutoComplete.Option>
                  )}
                </AutoComplete>
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="_id"
                label="User ID"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.profile?._id
                }
                rules={[{ required: true, message: "Please Enter User ID" }]}
              >
                <Input type="text" disabled />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Vendor",
      content: (
        <div className="vendor">
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="vendorCompanyName"
                label="Vendor Name"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.vendor?.name
                }
                rules={[
                  { required: true, message: "Please Enter Company Name" },
                ]}
              >
                <AutoComplete
                  showSearch
                  placeholder="Enter Company Name"
                  filterOption={(inputValue, option) =>
                    option && typeof option.value === "string"
                      ? option.value
                          .toUpperCase()
                          .includes(inputValue.toUpperCase())
                      : false
                  }
                  onChange={(value) => handleVendorCompanyChange(value)}
                  onSelect={(value) => handleVendorCompanyChange(value)}
                >
                  {vendorsData
                    //.concat(dummyVendorData)
                    .reverse()
                    .map((vendor) => (
                      <AutoComplete.Option
                        key={vendor?._id}
                        value={vendor.name}
                      >
                        {vendor.name}
                      </AutoComplete.Option>
                    ))}
                </AutoComplete>
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="vendorCompany_id"
                label="Vendor ID"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.vendor?.company_id
                }
                rules={[{ required: true, message: "Please Enter Company ID" }]}
              >
                <Input type="text" disabled />
              </Form.Item>
            </Col>
          </Row>
          <div className="vendor-recruiter">
            <Row {...gutter}>
              <Col {...span}>
                <Form.Item
                  name="vendorRecruiterName"
                  label="Recruiter Name"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.vendor?.recruiter?.name
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Recruiter Name",
                    },
                  ]}
                >
                  <AutoComplete
                    showSearch
                    placeholder="Enter Recruiter Name"
                    filterOption={(inputValue, option) =>
                      option && typeof option.value === "string"
                        ? option.value
                            .toUpperCase()
                            .includes(inputValue.toUpperCase())
                        : false
                    }
                    onChange={(value) => handleVendorRecruiterChange(value)}
                    onSelect={(value) => handleVendorRecruiterChange(value)}
                  >
                    {recruitersData
                      //.concat(dummyVendorRecruiterData)
                      .reverse()
                      .map((recruiter) => (
                        <AutoComplete.Option
                          key={recruiter?._id}
                          value={recruiter?.name}
                        >
                          {recruiter.name}
                        </AutoComplete.Option>
                      ))}
                  </AutoComplete>
                </Form.Item>
              </Col>
              <Col {...span}>
                <Form.Item
                  name="vendorRec_id"
                  label="Recruiter ID"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.vendor?.recruiter?.rec_id
                  }
                  rules={[
                    { required: true, message: "Please Enter Recruiter ID" },
                  ]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
              <Col {...span}>
                <Form.Item
                  name="vendorRecruiterEmail"
                  label="Email"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.vendor?.recruiter?.email
                  }
                  rules={[{ required: true, message: "Please Enter Email" }]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row {...gutter}>
              <Col {...span}>
                <Form.Item
                  name="vendorRecruiterContact"
                  label="Contact"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.vendor?.recruiter?.contact
                  }
                  rules={[{ required: true, message: "Please Enter contact" }]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      title: "Prime Vendor",
      content: (
        <div className="prime-vendor">
          {!selectedSubmission && (
            <div>
              <Form.Item>
                <Checkbox onChange={handleSameAsVendorChange} value={sameAsVendor}>
                  Same as Vendor
                </Checkbox>
              </Form.Item>
            </div>
          )}
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="primeVendorCompanyName"
                label="Prime Vendor Name"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.primeVendor?.name
                }
                rules={[
                  { required: true, message: "Please Enter Prime Vendor Name" },
                ]}
              >
                <AutoComplete
                  showSearch
                  placeholder="Enter Prime Vendor Name"
                  filterOption={(inputValue, option) =>
                    option && typeof option.value === "string"
                      ? option.value
                          .toUpperCase()
                          .includes(inputValue.toUpperCase())
                      : false
                  }
                  onChange={(value) => handlePrimeVendorCompanyChange(value)}
                  onSelect={(value) => handlePrimeVendorCompanyChange(value)}
                >
                  {vendorsData
                    //.concat(dummyVendorData)
                    .reverse()
                    .map((primeVendor) => (
                      <AutoComplete.Option
                        key={primeVendor?._id}
                        value={primeVendor.name}
                      >
                        {primeVendor.name}
                      </AutoComplete.Option>
                    ))}
                </AutoComplete>
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="primeVendorCompany_id"
                label="Prime Vendor ID"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.primeVendor?.company_id
                }
                rules={[
                  { required: true, message: "Please Enter Prime Vendor ID" },
                ]}
              >
                <Input type="text" disabled />
              </Form.Item>
            </Col>
          </Row>
          <div className="prime-vendor-recruiter">
            <Row {...gutter}>
              <Col {...span}>
                <Form.Item
                  name="primeVendorRecruiterName"
                  label="Recruiter Name"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.primeVendor?.recruiter?.name
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Recruiter Name",
                    },
                  ]}
                >
                  <AutoComplete
                    showSearch
                    placeholder="Enter Recruiter Name"
                    filterOption={(inputValue, option) =>
                      option && typeof option.value === "string"
                        ? option.value
                            .toUpperCase()
                            .includes(inputValue.toUpperCase())
                        : false
                    }
                    onChange={(value) =>
                      handlePrimeVendorRecruiterChange(value)
                    }
                    onSelect={(value) =>
                      handlePrimeVendorRecruiterChange(value)
                    }
                  >
                    {recruitersData
                      //.concat(dummyVendorRecruiterData)
                      .reverse()
                      .map((recruiter) => (
                        <AutoComplete.Option
                          key={recruiter?._id}
                          value={recruiter?.name}
                        >
                          {recruiter.name}
                        </AutoComplete.Option>
                      ))}
                  </AutoComplete>
                </Form.Item>
              </Col>
              <Col {...span}>
                <Form.Item
                  name="primeVendorRecruiterRec_id"
                  label="Recruiter ID"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.primeVendor?.recruiter
                      ?.rec_id
                  }
                  rules={[
                    { required: true, message: "Please Enter Recruiter ID" },
                  ]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
              <Col {...span}>
                <Form.Item
                  name="primeVendorRecruiterEmail"
                  label="Email"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.primeVendor?.recruiter
                      ?.email
                  }
                  rules={[
                    { required: true, message: "Please Enter Email" },
                    
                  ]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row {...gutter}>
              <Col {...span}>
                <Form.Item
                  name="primeVendorRecruiterContact"
                  label="Contact"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.primeVendor?.recruiter
                      ?.contact
                  }
                  rules={[{ required: true, message: "Please Enter contact" }]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      title: "Client",
      content: (
        <div className="client">
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="clientCompanyName"
                label="Client Name"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.client?.name
                }
                rules={[
                  { required: true, message: "Please Enter Client Name" },
                ]}
              >
                <AutoComplete
                  showSearch
                  placeholder="Enter Client Name"
                  filterOption={(inputValue, option) =>
                    option && typeof option.value === "string"
                      ? option.value
                          .toUpperCase()
                          .includes(inputValue.toUpperCase())
                      : false
                  }
                  onChange={(value) => handleCompanyChange(value)}
                  onSelect={(value) => handleCompanyChange(value)}
                >
                  {clientsData
                    .concat(dummyClientData)

                    .reverse()
                    .map((client) => (
                      <AutoComplete.Option
                        key={client?._id}
                        value={client.name}
                      >
                        {client.name}
                      </AutoComplete.Option>
                    ))}
                </AutoComplete>
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="clientCompany_id"
                label="Client ID"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.client?.company_id
                }
                rules={[{ required: true, message: "Please Enter Client ID" }]}
              >
                <Input type="text" disabled />
              </Form.Item>
            </Col>
          </Row>
          <div className="client-recruiter">
            <Row {...gutter}>
              <Col {...span}>
                <Form.Item
                  name="clientRecruiterName"
                  label="Recruiter Name"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.client?.recruiter?.name
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Recruiter Name",
                    },
                  ]}
                >
                  <AutoComplete
                    showSearch
                    placeholder="Enter Recruiter Name"
                    filterOption={(inputValue, option) =>
                      option && typeof option.value === "string"
                        ? option.value
                            .toUpperCase()
                            .includes(inputValue.toUpperCase())
                        : false
                    }
                    onChange={(value) => handleRecruiterChange(value)}
                    onSelect={(value) => handleRecruiterChange(value)}
                  >
                    {recruitersData
                      .concat(dummyClientRecruiterData)
                      .reverse()

                      .map((recruiter) => (
                        <AutoComplete.Option
                          key={recruiter?._id}
                          value={recruiter?.name}
                        >
                          {recruiter?.recruitermetainfo?.name}
                        </AutoComplete.Option>
                      ))}
                  </AutoComplete>
                </Form.Item>
              </Col>
              <Col {...span}>
                <Form.Item
                  name="clientRec_id"
                  label="Recruiter ID"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.client?.recruiter?.rec_id
                  }
                  rules={[
                    { required: true, message: "Please Enter Recruiter ID" },
                  ]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
              <Col {...span}>
                <Form.Item
                  name="clientRecruiterEmail"
                  label="Email"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.client?.recruiter?.email
                  }
                  rules={[{ required: true, message: "Please Enter Email" }]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row {...gutter}>
              <Col {...span}>
                <Form.Item
                  name="clientRecruiterContact"
                  label="Contact"
                  initialValue={
                    selectedSubmission &&
                    selectedSubmission?.subDetails?.client?.recruiter?.contact
                  }
                  rules={[{ required: true, message: "Please Enter contact" }]}
                >
                  <Input type="text" disabled />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },

    {
      title: "Additional Information",
      content: (
        <div className="additional-information">
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="date"
                label="Date"
                initialValue={dayjs(selectedSubmission?.subDetails?.date)}
                rules={[{ required: true, message: "Please Select Date" }]}
              >
                {updatedDisabledDate ? (
                  <DatePicker disabled style={{ width: "100%" }} />
                ) : (
                  <DatePicker style={{ width: "100%" }} />
                )}
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="jobRole"
                label="Job Role"
                initialValue={
                  selectedSubmission && selectedSubmission?.subDetails?.jobRole
                }
                rules={[{ required: true, message: "Please Enter Job Role" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="workLocation"
                label="Work Location"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.workLocation
                }
                rules={[
                  { required: true, message: "Please Select Work Location" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="salesRecruiter"
                label="Sales Recruiter"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.salesRecruiter
                }
                rules={[
                  {
                    required: true,
                    message: "Please Enter  Sales Recruiter",
                  },
                ]}
              >
                <Select options={submittedBy} />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="comments"
                label="Comments"
                initialValue={
                  selectedSubmission && selectedSubmission?.subDetails?.comments
                }
              >
                <TextArea rows={5} cols={5} />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="jobDescription"
                label="Job Description"
                initialValue={
                  selectedSubmission &&
                  selectedSubmission?.subDetails?.jobDescription
                }
                rules={[
                  { required: true, message: "Please Enter Job Description" },
                ]}
              >
                <TextArea rows={10} cols={10} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <BreadcrumbComponent
        title={selectedSubmission ? "Update submission" : "New Submission"}
      />
      <Form form={form} name="submission" layout="vertical">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <FormContent content={steps[current].content} />

        {/* <SubmissionSteps
            handleUserChange={handleUserChange}
            handleCompanyChange={handleCompanyChange}
            handleRecruiterChange={handleRecruiterChange}
            handleVendorCompanyChange={handleVendorCompanyChange}
            handleVendorRecruiterChange={handleVendorRecruiterChange}
            handlePrimeVendorCompanyChange={handlePrimeVendorCompanyChange}
            handlePrimeVendorRecruiterChange={handlePrimeVendorRecruiterChange}
            clientsData={clientsData}
            parmenentRecuitersData={parmenentRecuitersData}
            recruitersData={recruitersData}
            vendorsData={vendorsData}
            usersData={usersData}
            current={current}

          /> */}
        <NavigationButtons
          current={current}
          totalSteps={steps.length}
          prevClick={prev}
          nextClick={next}
          doneClick={handleSubmission}
        />
      </Form>
    </Card>
  );
};

export default SubmissionForm;
