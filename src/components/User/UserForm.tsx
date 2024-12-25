import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Steps,
  message,
  Card,
  Switch,
} from "antd";
import { getToken } from "../../utils";
import { CloseOutlined } from "@ant-design/icons";
import { Job } from "../../utils";
import { Education } from "../../utils";
import dayjs from "dayjs";
import FormContent from "../form/FormContent";
import NavigationButtons from "../form/NavigationButtons";
import { useLocation, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import BreadcrumbComponent from "../Breadcrumb/BreadcrumbComponent";
import { Country, State, City } from "country-state-city";
import moment from "moment";
import axiosInstance from "../../refactoring/services/shared/AxiosService";
import { ADDING_USER_URL, REACT_API_URL } from "../../urlConfig";
import UploadAttachment from "../../refactoring/components/submission/Submissions/documentUpload";
import { capitalizeFirstLetter } from "./UserModal";


const PhoneInputStyle = {
  width: "100%",
  height: 31,
  borderRadius: 2,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#d9d9d9",
};

const { Step } = Steps;
const { TextArea } = Input;


const span = { span: 8 };
const gutter = { gutter: 16 };

const authRole = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "sourcing_manager", label: "Sourcing Manager" },
  { value: "training_manager", label: "Training Manager" },
];



const jobRole = [
  { value: "hr", label: "HR" },
  { value: "consultant", label: "Consultant" },
  { value: "recruiter", label: "Recruiter" },
  { value: "tech", label: "Tech" },
  { value: "lead", label: "Lead" },
  { value: "rm", label: "RM" },
];

const gender = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const visaStatus = [
  { value: "CPT", label: "CPT" },
  { value: "OPT N", label: "STEM OPT" },
  { value: "OPT E", label: "OPT" },
  { value: "H1B", label: "H1B" },
  { value: "H1B T", label: "H1B T" },
  { value: "H4", label: "H4" },
  { value: "GC", label: "GC" },
];

const employerType = [
  { value: "fulltime", label: "Full Time" },
  { value: "contract", label: "Contract" },
];

const UserForm: React.FC = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [formattingNumber, setFormattingNumber] = useState<any>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");

  const [cities, setCities] = useState<any[]>([]);
  const [active, setActive] = useState<boolean>(true);
  const [educations, setEducations] = useState([
    { degree: "", specialization: "", university: "", graduationDate: 0 },
  ]);
  const [jobs, setJobs] = useState([
    {
      employerName: "",
      employerType: "",
      employerBusiness: "",
      startDate: 0,
      endDate: 0,
      jobTitle: "",
      skills: "",
    },
  ]);
  const handleStepsChange = (value: number) => {
    setCurrent(value);
  };
  const formatDate = (epochDate: any) => {
    return moment(epochDate).format("YYYY-MM-DD");
  };
  const { selectedUser, updatedDisabledPassword } = location?.state || {};
  const handlePhoneInputChange = (formattedValue: string) => {
    setFormattingNumber(formattedValue);
  };

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };



  const prev = () => {
    setCurrent(current - 1);
  };

  const countries = Country.getAllCountries()
    .filter((country) => country.name !== "United States")
    .sort((a, b) => a.name.localeCompare(b.name));

  const unitedStates = { isoCode: "US", name: "United States" };

  const sortedCountries = [unitedStates, ...countries];

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setSelectedState("");
  };

  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry)
    : [];

  const handleStateChange = (value: string) => {
    setSelectedState(value);
  };

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const fetchedCities = City.getCitiesOfState(
        selectedCountry,
        selectedState
      );

      setCities(fetchedCities);
    }
  }, [selectedCountry, selectedState]);

  useEffect(() => {
    if (selectedUser) {
      setActive(selectedUser?.profile?.active);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      // Extract job and education info from selectedUser
      const { jobInfo, educationDetails } = selectedUser;

      // Map jobInfo to form fields
      const jobFields = jobInfo?.map((job: any, _: number) => ({
        employerName: job.employerName,
        employerType: job.employerType,
        employerBusiness: job.employerBusiness,
        startDate: job.startDate ? dayjs(job.startDate) : null,
        endDate: job.endDate ? dayjs(job.endDate) : null,
        jobTitle: job.jobTitle,
        jobDuties: job.jobDuties,
        skills: job.skills,
      }));
      setJobs(jobFields);
      // Map educationInfo to form fields
      const educationFields = educationDetails?.map((edu: any, _: number) => ({
        degree: edu.degree,
        university: edu.university,
        startDate: edu.startDate ? dayjs(edu.startDate) : null,
        endDate: edu.endDate ? dayjs(edu.endDate) : null,
      }));
      setEducations(educationFields);
    }
  }, [selectedUser, form]);

  const handleDateChange = (_: dayjs.Dayjs | null, __: string | string[]) => {};

  const handleDateEducationChange = (
    _: dayjs.Dayjs | null,
    dateString: string | string[],
    index: any
  ) => {
    const updatedEducations = [...educations];
    const dateStringStr = Array.isArray(dateString)
      ? dateString.join(", ")
      : dateString;
    const isoString = dayjs(dateStringStr).toISOString();
    const unixTimestamp = dayjs(isoString).valueOf() / 1000;

    if (unixTimestamp === null) {
      updatedEducations[index].graduationDate = 0;
    } else {
      updatedEducations[index].graduationDate = unixTimestamp;
    }

    setEducations(updatedEducations);
  };

  const handleDateJobChange = (
    _: dayjs.Dayjs | null,
    __: string | string[],
    index: any
  ) => {
    const updatedJobs = [...jobs];
    const startDate = updatedJobs[index].startDate;

    const endDate = updatedJobs[index].endDate;
    if (startDate) {
      const startIsoString = dayjs(startDate).toISOString();
      const startUnixTimeStamp = dayjs(startIsoString).valueOf() / 1000;

      if (startUnixTimeStamp === null) {
        updatedJobs[index].startDate = 0;
      } else {
        updatedJobs[index].startDate = startUnixTimeStamp;
      }
    } else if (endDate) {
      const endIsoString = dayjs(endDate).toISOString();
      const endUnixTimestamp = dayjs(endIsoString).valueOf() / 1000;

      if (endUnixTimestamp === null) {
        updatedJobs[index].endDate = 0;
      } else {
        updatedJobs[index].endDate = endUnixTimestamp;
      }
    }

    setJobs(updatedJobs);
  };
  const handleDone = async () => {
    try {
      await form.validateFields();
      const profile = form.getFieldsValue([
        "firstName",
        "middleName",
        "lastName",
        "email",
        "mobile",
        "password",
        "whatsappNo",
        "company",
        "gender",
        "currentLocation",
        "type",
        "country",
        "state",
        "city",
        "addressLine1",
        "addressLine2",
        "zipCode",
        "active",
        "jobRole",
        "authRole",
      ]);

      const educationalDetails: Education[] =
        form.getFieldsValue(true)["educations"];

      const personalInfo = form.getFieldsValue([
        "linkedinID",
        "passportNo",
        "dlNumber",
        "visaStatus",
        "visaStartDate",
        "referredBy",
        "dob",
        "statesEntryDate",
      ]);

      const jobInfo: Job[] = form.getFieldsValue(true)["jobs"];

      const additionalInformation = form.getFieldsValue([
        "primaryTechnology",
        "secondaryTechnology",
        "company",
        "attachment",
        "addOns",
        "tags",
        "guestHouseDate",
        "marketingStartDate",
      ]);
      const uploads = form.getFieldValue(["uploads"]);
      const upload =
        uploads?.map((file: any) => ({
          fileName: file.name || file.response?.data?.fileName || file.fileName,
          url: file.url || file.response?.data?.url,
          uid: file.uid || file.response?.data?.uid,
          status: file.status || file.response?.data?.status,
          percent: file.percent || file.response?.data?.percent,
        })) || [];
      const statesFormatedDate = personalInfo?.dob?.toDate().valueOf();
      const formattedData = {
        addOns: { ...additionalInformation.addOns },
        attachment: { ...additionalInformation.attachment },
        uploads: upload,
        credentials: {
          password: profile.password,
        },
        educationDetails:
          educationalDetails?.map((edu: Education) => ({
            degree: edu.degree,
            graduationDate: Date.parse(edu.graduationDate),
            specialization: edu.specialization,
            university: edu.university,
          })) || [],
        jobInfo:
          jobInfo?.map((job: Job) => ({
            employerBusiness: job.employerBusiness,
            employerName: job.employerName,
            employerType: job.employerType,
            endDate: Date.parse(job.endDate),
            jobDuties: job.jobDuties,
            jobTitle: job.jobTitle,
            skills: job.skills,
            startDate: Date.parse(job.startDate),
          })) || [],
        personalInfo: {
          dlNumber: personalInfo.dlNumber,
          dob: statesFormatedDate,
          linkedinID: personalInfo.linkedinID || "",
          passportNo: personalInfo.passportNo,
          referredBy: personalInfo.referredBy,
          statesEntryDate: Date.parse(personalInfo.statesEntryDate),
          visaStartDate: Date.parse(personalInfo.visaStartDate),
          visaStatus: personalInfo.visaStatus,
        },
        company: additionalInformation.company,
        primaryTechnology: additionalInformation.primaryTechnology,
        profile: {
          active: Boolean(profile.active),
          address: {
            addressLine1: profile.addressLine1,
            city: profile.city,
            country: profile.country,
            addressLine2: profile.addressLine2 || "",
            state: profile.state,
            type: profile.type || "",
            zipCode: profile.zipCode,
          },
          whatsappNo: profile.whatsappNo,
          authRole: profile.authRole,
          currentLocation: profile.currentLocation,
          email: profile.email,
          firstName: profile.firstName,
          gender: profile.gender,
          jobRole: profile.jobRole,
          lastName: profile.lastName,
          middleName: profile.middleName || "",
          mobile: profile.mobile,
        },
        secondaryTechnology: additionalInformation.secondaryTechnology || "",
        tags: null,
        marketingStartDate: Date.parse(
          additionalInformation.marketingStartDate
        ),
        guestHouseDate: Date.parse(additionalInformation.guestHouseDate),
      };
      selectedUser
        ? await axiosInstance.put(
            `${REACT_API_URL}/user/${selectedUser?._id}`,
            formattedData,
            {
              headers: {
                Authorization: `access_Token ${getToken()}`,
                "Content-Type": "application/json",
              },
            }
          )
        : await axiosInstance.post(`${REACT_API_URL}/user`, formattedData, {
            headers: {
              Authorization: `access_Token ${getToken()}`,
              "Content-Type": "application/json",
            },
          });

      selectedUser
        ? message.success("User Updated Successfully")
        : message.success("User Created Successfully");

      navigate(ADDING_USER_URL, { state: { openUserTable: true } });
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const validateZipCode = (_: any, value: any) => {
    if (value && !/^\d+$/.test(value)) {
      return Promise.reject(new Error("Zip Code must be numeric"));
    } else if (value && value.length < 5) {
      return Promise.reject(
        new Error("Zip Code must be at least 5 characters")
      );
    } else {
      return Promise.resolve();
    }
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      { degree: "", specialization: "", university: "", graduationDate: 0 },
    ]);
  };

  const removeEducation = (index: number) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        employerName: "",
        employerType: "",
        employerBusiness: "",
        startDate: 0,
        endDate: 0,
        jobTitle: "",
        skills: "",
      },
    ]);
  };

  const removeJob = (index: any) => {
    const updatedJobs = [...jobs];
    updatedJobs.splice(index, 1);
    setJobs(updatedJobs);
  };

  const steps = [
    {
      title: "Profile Information",
      content: (
        <div className="profile-info">
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="firstName"
                label="First Name"
                initialValue={selectedUser && selectedUser?.profile?.firstName}
                rules={[
                  { required: true, message: "Please Enter First Name" },
                  {
                    min: 4,
                    message: "First Name must be greater than 3 characters",
                  },
                ]}
              >
                <Input type="text" placeholder="Please Enter First Name" />
              </Form.Item>
            </Col>

            <Col {...span}>
              <Form.Item
                name="middleName"
                label="Middle Name"
                initialValue={selectedUser && selectedUser?.profile?.middleName}
              >
                <Input type="text" placeholder="Please Enter Middle Name" />
              </Form.Item>
            </Col>

            <Col {...span}>
              <Form.Item
                className="imp-name"
                name="lastName"
                label="Last Name"
                initialValue={selectedUser && selectedUser?.profile?.lastName}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Last Name",
                  },
                  {
                    min: 4,
                    message: "Last Name must greater than 3 characters",
                  },
                ]}
              >
                <Input type="text" placeholder="Please Enter LastName" />
              </Form.Item>
            </Col>
          </Row>
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="email"
                label="Email"
                initialValue={selectedUser && selectedUser?.profile?.email}
                rules={[
                  { required: true, message: "Please Enter Email" },
                  { type: "email" },
                ]}
              >
                <Input type="text" placeholder="Please Enter Email" />
              </Form.Item>
            </Col>

            <Col {...span}>
              <Form.Item
                name="mobile"
                label="Mobile"
                initialValue={selectedUser && selectedUser?.profile?.mobile}
                rules={[
                  {
                    required: true,
                    message: "Please enter a mobile number",
                  },
                ]}
              >
                <PhoneInput
                  inputStyle={PhoneInputStyle}
                  country={"us"}
                  inputProps={{ required: true }}
                  onChange={handlePhoneInputChange}
                  value={formattingNumber}
                />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="whatsappNo"
                label="Whatsapp Number"
                initialValue={selectedUser && selectedUser?.profile?.whatsappNo}
                rules={[
                  {
                    required: true,
                    message: "Please enter a Whatsapp Number",
                  },
                ]}
              >
                <PhoneInput
                  inputStyle={PhoneInputStyle}
                  country={"us"}
                  inputProps={{ required: true }}
                  onChange={handlePhoneInputChange}
                  value={formattingNumber}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                className="imp-name"
                name="authRole"
                label="Auth Role"
                initialValue={selectedUser && selectedUser?.profile?.authRole}
                rules={[
                  {
                    required: true,
                    message: "Please Select Auth Role",
                  },
                ]}
              >
                <Select options={authRole} />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="gender"
                label="Gender"
                initialValue={selectedUser && selectedUser?.profile?.gender}
                rules={[
                  {
                    required: true,
                    message: "Please Select Gender",
                  },
                ]}
              >
                <Select options={gender} />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                className="imp-name"
                name="currentLocation"
                initialValue={
                  selectedUser && selectedUser?.profile?.currentLocation
                }
                label="Current Location"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Current Location",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Please Enter Current Location"
                />
              </Form.Item>
            </Col>
          </Row>
          <div className="address">
            <Row {...gutter}>
              <Col {...span}>
                <Form.Item
                  label="Country"
                  name="country"
                  initialValue={
                    selectedUser && selectedUser?.profile?.address?.country
                  }
                  rules={[
                    { required: true, message: "Please  Enter State Name" },
                  ]}
                >
                  <Select
                    showSearch
                    filterOption={(input, option: any) =>
                      option && option.children
                        ? option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        : false
                    }
                    onChange={handleCountryChange}
                  >
                    {sortedCountries.map((country) => (
                      <Select.Option
                        key={country.isoCode}
                        value={country.isoCode}
                      >
                        {country.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col {...span}>
                <Form.Item
                  name="state"
                  label="State"
                  initialValue={
                    selectedUser && selectedUser?.profile?.address?.country
                  }
                  rules={[
                    { required: true, message: "Please  Enter State Name" },
                  ]}
                >
                  <Select
                    showSearch
                    filterOption={(input, option: any) =>
                      option && option.children
                        ? option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        : false
                    }
                    onChange={handleStateChange}
                  >
                    {states.map((state) => (
                      <Select.Option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col {...span}>
                <Form.Item
                  name="city"
                  label="City"
                  initialValue={
                    selectedUser && selectedUser?.profile?.address?.country
                  }
                  rules={[
                    { required: true, message: "Please  Enter City Name" },
                  ]}
                >
                  <Select
                    showSearch
                    filterOption={(input, option: any) =>
                      option && option.children
                        ? option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        : false
                    }
                  >
                    {cities.map((city) => (
                      <Select.Option key={city.name} value={city.name}>
                        {city.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row {...gutter}>
              <Col {...span}>
                <Form.Item
                  name="addressLine1"
                  label="Address Line1"
                  initialValue={
                    selectedUser && selectedUser?.profile?.address?.addressLine1
                  }
                  rules={[
                    { required: true, message: "Please Enter Address Line 1" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Please Enter Address Line 1"
                  />
                </Form.Item>
              </Col>

              <Col {...span}>
                <Form.Item
                  name="addressLine2"
                  label="Address Line2"
                  initialValue={
                    selectedUser && selectedUser?.profile?.address?.sddressLine2
                  }
                >
                  <Input type="text" placeholder="Please Enter Address Line" />
                </Form.Item>
              </Col>
              <Col {...span}>
                <Form.Item
                  name="zipCode"
                  label="Zip Code"
                  initialValue={
                    selectedUser && selectedUser?.profile?.address?.zipCode
                  }
                  rules={[
                    { required: true, message: "Please  Enter ZipCode" },
                    { validator: validateZipCode },
                  ]}
                >
                  <Input type="text" placeholder="Please Enter ZipCode" />
                </Form.Item>
              </Col>
            </Row>
            <Row {...gutter}>
              <Col {...span}>
                <Form.Item
                  name="jobRole"
                  label="Job Role"
                  initialValue={selectedUser && selectedUser?.profile?.jobRole}
                  rules={[{ required: true, message: "Please Enter Job Role" }]}
                >
                  <Select options={jobRole} />
                </Form.Item>
              </Col>
              {selectedUser ? (
                <Col></Col>
              ) : (
                <Col {...span}>
                  <Form.Item
                    name="password"
                    label="Password"
                    initialValue={
                      selectedUser && selectedUser?.credentials?.password
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Password",
                      },
                    ]}
                  >
                    {updatedDisabledPassword ? (
                      <Input disabled type="text" />
                    ) : (
                      <Input type="text" />
                    )}
                  </Form.Item>
                </Col>
              )}

              <Col {...span}>
                <Form.Item
                  name="active"
                  label="Active"
                  initialValue={selectedUser && selectedUser?.profile?.active}
                  rules={[{ required: true, message: "Please Select Active" }]}
                >
                  <Switch
                    checked={active}
                    onChange={(checked) => {
                      setActive(checked);
                      form.setFieldValue("active", checked);
                    }}
                    disabled={!selectedUser?.profile?.active ? true : false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      ),
    },
    {
      title: "Personal Information",
      content: (
        <div className="personal-information">
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="linkedinID"
                label="Linkedin ID"
                initialValue={
                  selectedUser && selectedUser?.personalInfo?.linkedinID
                }
              >
                <Input type="text" placeholder="Please Enter Linkenin ID" />
              </Form.Item>
            </Col>

            <Col {...span}>
              <Form.Item
                name="passportNo"
                label="PassportNo"
                initialValue={
                  selectedUser && selectedUser?.personalInfo?.passportNo
                }
                rules={[
                  { required: true, message: "Please Enter Passport Number" },
                ]}
              >
                <Input type="text" placeholder="Please Enter Passport Number" />
              </Form.Item>
            </Col>

            <Col {...span}>
              <Form.Item
                name="dlNumber"
                label="DL Number"
                initialValue={
                  selectedUser && selectedUser?.personalInfo?.dlNumber
                }
                rules={[{ required: true, message: "Please Enter DL Number" }]}
              >
                <Input type="text" placeholder="Please Enter DL Number" />
              </Form.Item>
            </Col>
          </Row>
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="visaStatus"
                label="Visa Status"
                initialValue={
                  selectedUser && selectedUser?.personalInfo?.visaStatus
                }
                rules={[
                  { required: true, message: "Please Select Visa Status" },
                ]}
              >
                <Select options={visaStatus} />
              </Form.Item>
            </Col>

            <Col {...span}>
              <Form.Item
                name="visaStartDate"
                label="Visa Start Date"
                htmlFor="visaStartDate"
                initialValue={
                  selectedUser &&
                  dayjs(formatDate(selectedUser?.personalInfo?.visaStartDate))
                }
                rules={[
                  { required: true, message: "Please Select Start Date" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  id="visaStartDate"
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString)
                  }
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="statesEntryDate"
                htmlFor="entryDate"
                label="States Entry Date"
                initialValue={
                  selectedUser &&
                  dayjs(formatDate(selectedUser?.personalInfo?.statesEntryDate))
                }
                rules={[
                  { required: true, message: "Please Select Entry Date" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  id="entryDate"
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="referredBy"
                label="Referred By"
                initialValue={
                  selectedUser && selectedUser?.personalInfo?.referredBy
                }
                rules={[{ required: true, message: "Please Enter Reference" }]}
              >
                <Input type="text" placeholder="Please Enter Reference" />
              </Form.Item>
            </Col>

            <Col {...span}>
              <Form.Item
                name="dob"
                label="Date of Birth"
                htmlFor="dob"
                initialValue={
                  selectedUser &&
                  dayjs(formatDate(selectedUser?.personalInfo?.dob))
                }
                rules={[
                  { required: true, message: "Please Enter Date of Birth" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  id="dob"
                  onChange={handleDateChange}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      title: "Educational Information",
      content: (
        <div>
          <Button type="primary" onClick={addEducation}>
            Add More Education
          </Button>
          {educations?.map((_: any, index: any) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <Row {...gutter}>
                <Col {...span}>
                  <Form.Item
                    name={["educations", index, "university"]}
                    label="University"
                    initialValue={
                      selectedUser &&
                      selectedUser?.educationDetails?.[index]?.university
                    }
                    rules={[{ message: "Please Enter University" }]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col {...span}>
                  <Form.Item
                    name={["educations", index, "specialization"]}
                    label="Specialization"
                    initialValue={
                      selectedUser &&
                      selectedUser?.educationDetails?.[index]?.specialization
                    }
                    rules={[
                      {
                        message: "Please Enter Specialization",
                      },
                    ]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </Col>
                <Col {...span}>
                  <Form.Item
                    name={["educations", index, "degree"]}
                    label="Degree"
                    initialValue={
                      selectedUser &&
                      selectedUser?.educationDetails?.[index]?.degree
                    }
                    rules={[{ message: "Please Enter Degree" }]}
                  >
                    <Input type="text" />
                  </Form.Item>
                </Col>

                <Col
                  {...span}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Form.Item
                    name={["educations", index, "graduationDate"]}
                    label="Graduation Date"
                    style={{ width: "100%" }}
                    initialValue={
                      selectedUser &&
                      dayjs(
                        formatDate(
                          selectedUser?.educationDetails?.[index]
                            ?.graduationDate
                        )
                      )
                    }
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={(date, dateString) =>
                        handleDateEducationChange(date, dateString, index)
                      }
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    onClick={() => removeEducation(index)}
                    style={{ marginTop: "30px" }}
                  ></Button>
                </Col>
              </Row>
              <Row {...gutter}></Row>
            </div>
          ))}
        </div>
      ),
    },

    {
      title: "Job Information",
      content: (
        <div className="job-information">
          <Button type="primary" onClick={addJob} style={{ marginBottom: 16 }}>
            Add More Job
          </Button>
          {jobs?.map((_: any, index: number) => (
            <div key={index} style={{ marginBottom: 16 }}>
              <Row {...gutter}>
                <Col {...span}>
                  <Form.Item
                    name={["jobs", index, "employerName"]}
                    label="Employer Name"
                    initialValue={
                      selectedUser &&
                      selectedUser?.jobInfo?.[index]?.employerName
                    }
                    rules={[{ message: "Please Enter Employer Name" }]}
                  >
                    <Input
                      type="text"
                      placeholder="Please Enter Employer Name"
                    />
                  </Form.Item>
                </Col>
                <Col {...span}>
                  <Form.Item
                    name={["jobs", index, "employerType"]}
                    label="Employer Type"
                    initialValue={
                      selectedUser &&
                      selectedUser?.jobInfo?.[index]?.employerType
                    }
                    rules={[{ message: "Please Enter Employer Type" }]}
                  >
                    <Select options={employerType} />
                  </Form.Item>
                </Col>
                <Col {...span}>
                  <Form.Item
                    name={["jobs", index, "employerBusiness"]}
                    label="Employer Business"
                    initialValue={
                      selectedUser &&
                      selectedUser?.jobInfo?.[index]?.employerBusiness
                    }
                    rules={[
                      {
                        message: "Please Enter Employer Business",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Please Enter Employer Business"
                    />
                  </Form.Item>
                </Col>
                <Col {...span}>
                  <Form.Item
                    name={["jobs", index, "startDate"]}
                    label="Start Date"
                    initialValue={
                      selectedUser &&
                      dayjs(selectedUser?.jobInfo?.[index]?.startDate)
                    }
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={(date, dateString) =>
                        handleDateJobChange(date, dateString, index)
                      }
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                </Col>
                <Col {...span}>
                  <Form.Item
                    name={["jobs", index, "endDate"]}
                    label="End Date"
                    initialValue={
                      selectedUser &&
                      dayjs(selectedUser?.jobInfo?.[index]?.endDate)
                    }
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={(date, dateString) =>
                        handleDateJobChange(date, dateString, index)
                      }
                      format="YYYY-MM-DD"
                    />
                  </Form.Item>
                </Col>
                <Col {...span}>
                  <Form.Item
                    name={["jobs", index, "jobTitle"]}
                    label="Job Title"
                    initialValue={
                      selectedUser && selectedUser?.jobInfo?.[index]?.jobTitle
                    }
                    rules={[{ message: "Please Enter Job Title" }]}
                  >
                    <Input type="text" placeholder="Please Enter Job Title" />
                  </Form.Item>
                </Col>
              </Row>
              <Row {...gutter}>
                <Col {...span}>
                  <Form.Item
                    name={["jobs", index, "jobDuties"]}
                    label="Job Duties"
                    initialValue={
                      selectedUser && selectedUser?.jobInfo?.[index]?.jobDuties
                    }
                    rules={[{ message: "Please Enter Job Duties" }]}
                  >
                    <Input type="text" placeholder="Please Enter Job Duties" />
                  </Form.Item>
                </Col>
                <Col {...span}>
                  <Form.Item
                    name={["jobs", index, "skills"]}
                    label="Skills"
                    initialValue={
                      selectedUser && selectedUser?.jobInfo?.[index]?.skills
                    }
                    rules={[{ message: "Please Enter Job Skills" }]}
                  >
                    <TextArea
                      rows={6}
                      cols={5}
                      placeholder="Please Enter Skills"
                    />
                  </Form.Item>
                </Col>
                <Col {...span} style={{ marginTop: "25px" }}>
                  <Button
                    type="primary"
                    icon={<CloseOutlined />}
                    onClick={() => removeJob(index)}
                    style={{ marginLeft: "50px" }}
                  ></Button>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Additional Information",
      content: (
        <div className="extra-information">
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                name="primaryTechnology"
                label="Primary Technology"
                initialValue={selectedUser && selectedUser?.primaryTechnology}
                rules={[
                  { required: true, message: "Please Enter Graduation Date" },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Please Enter Primary Technology"
                />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="secondaryTechnology"
                label="Secondary Technology"
                initialValue={selectedUser && selectedUser?.secondaryTechnology}
              >
                <Input
                  type="text"
                  placeholder="Please Enter Secondary Technology"
                />
              </Form.Item>
            </Col>
            <Col {...span}>
                <Form.Item
                  name="company"
                  label="Company Name"
                  initialValue={selectedUser && selectedUser?.company}
                  rules={[{ required: true, message: "Please Enter Company Name" }]}
                >
                  <Input type="text" placeholder="Please Enter Company Name" />
                </Form.Item>
              </Col>
            <Col {...span}>
              <Form.Item
                name="marketingStartDate"
                label="Marketing Start Date"
                htmlFor="marketingStartDate"
                initialValue={
                  selectedUser && dayjs(selectedUser?.marketingStartDate)
                }
                rules={[
                  {
                    required: true,
                    message: "Please Select Marketing Start Date",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  id="marketingStartDate"
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString)
                  }
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="guestHouseDate"
                label="Guest House Date"
                htmlFor="guestHouseDate"
                initialValue={
                  selectedUser && dayjs(selectedUser?.guestHouseDate)
                }
                rules={[
                  { required: true, message: "Please Select Guest House Date" },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  id="guestHouseDate"
                  onChange={(date, dateString) =>
                    handleDateChange(date, dateString)
                  }
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="uploads"
                label="Attachments(Visa/DL/ID/Resume)"
                initialValue={selectedUser && selectedUser?.uploads}
              >
                <UploadAttachment field={{ key: "uploads" }} form={form} />
              </Form.Item>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
<div style={{ height: "90vh", overflowY: "auto" }}>
<Card>
      <BreadcrumbComponent
        title={
          selectedUser
            ? `${capitalizeFirstLetter(selectedUser.profile.firstName)} ${capitalizeFirstLetter(selectedUser.profile.lastName)}`
            : "New User"
        }
      />
      <Form
        form={form}
        initialValues={{ active: true }}
        name="Candidate Info"
        layout="vertical"
      >
        <Steps current={current} onChange={handleStepsChange}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <FormContent
          content={steps[current].content}
          style={{ padding: "12px 24px" }}
        />
        <NavigationButtons
          current={current}
          prevClick={prev}
          nextClick={next}
          doneClick={handleDone}
          totalSteps={steps.length}
        />
      </Form>
    </Card>
</div>
  );
};

export default UserForm;
