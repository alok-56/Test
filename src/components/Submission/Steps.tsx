import {
  AutoComplete,
  Col,
  Form,
  Row,
  Input,
  Select,
  DatePicker,
  Steps,
} from "antd";
import React from "react";
import FormContent from "../form/FormContent";
import { ClientCompanyData, RecruiterData, UserData, VendorCompanyData } from "../../utils";
const { TextArea } = Input;
const span = { span: 8 };
const gutter = { gutter: 16 };

const Status = [
  { value: "directClientInterview", label: "Direct Client Interview" },
  { value: "Implementer Interview", label: "Implementer Interview" },
  { value: "interviewScheduled", label: "Interview Scheduled" },
  { value: "firstRound", label: "First Round" },
  { value: "noResponse", label: "No Response" },
  { value: "vendorTechnicalScreening", label: "Vendor Technical Screening" },
  { value: "writtenTest", label: "Written Test" },
  { value: "codingTest", label: "Coding Test" },
  { value: "applied", label: "Applied" },
];

const { Step } = Steps;

type HandleInputChange = (value: string) => void;

interface SubmissionStepsProps {
  handleUserChange: HandleInputChange;
  handleCompanyChange: HandleInputChange;
  handleRecruiterChange: HandleInputChange;
  handleVendorCompanyChange: HandleInputChange;
  handleVendorRecruiterChange: HandleInputChange;
  handlePrimeVendorCompanyChange: HandleInputChange;
  handlePrimeVendorRecruiterChange: HandleInputChange;
  clientsData: ClientCompanyData[];
  parmenentRecuitersData: RecruiterData[];
  recruitersData: any[];
  vendorsData: VendorCompanyData[];
  usersData: UserData[];
  current:number
}


const SubmissionSteps: React.FC <SubmissionStepsProps>= ({
  handleUserChange,
  handleCompanyChange,
  handleRecruiterChange,
  handleVendorCompanyChange,
  handleVendorRecruiterChange,
  handlePrimeVendorCompanyChange,
  handlePrimeVendorRecruiterChange,
  clientsData,
  recruitersData,
  vendorsData,
  usersData,
  current,
}) => {
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
                >
                  {usersData?.map((user) => (
                    <AutoComplete.Option
                      key={user.profile?._id}
                      value={user.profile.firstName}
                    >
                      {user.profile.firstName}
                    </AutoComplete.Option>
                  ))}
                </AutoComplete>
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="_id"
                label="User ID"
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
      title: "Client",
      content: (
        <div className="client">
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="clientCompanyName"
                label="Client Name"
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
                >
                  {clientsData.map((client) => (
                    <AutoComplete.Option key={client?._id} value={client.name}>
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
                  >
                    {recruitersData.map((recruiter) => (
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
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="primeVendorCompanyName"
                label="Prime Vendor Name"
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
                >
                  {vendorsData.map((primeVendor) => (
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
                  >
                    {recruitersData.map((recruiter) => (
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
                  rules={[
                    { required: true, message: "Please Enter Email" },
                    { type: "email" },
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
      title: "Vendor",
      content: (
        <div className="vendor">
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="vendorCompanyName"
                label="Vendor Name"
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
                >
                  {vendorsData.map((vendor) => (
                    <AutoComplete.Option key={vendor?._id} value={vendor.name}>
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
                  name="venorRecruiterName"
                  label="Recruiter Name"
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
                  >
                    {recruitersData.map((recruiter) => (
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
                rules={[{ required: true, message: "Please Select Date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="jobRole"
                label="Job Role"
                rules={[{ required: true, message: "Please Enter Job Role" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="jobDescription"
                label="Job Description"
                rules={[
                  { required: true, message: "Please Enter Job Description" },
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
                rules={[
                  {
                    required: true,
                    message: "Please Enter  Sales Recruiter",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="status"
                label="Status"
                initialValue="applied"
                rules={[{ required: true, message: "Please Select Status" }]}
              >
                <Select options={Status} />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="workLocation"
                label="Work Location"
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
              <Form.Item name="comments" label="Comments">
                <TextArea rows={5} cols={5} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
  ];
  localStorage.setItem("StepLength",steps.length.toString())

  return (
    <div>
      {" "}
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <FormContent content={steps[current].content} />
    </div>
  );
};

export default SubmissionSteps;
