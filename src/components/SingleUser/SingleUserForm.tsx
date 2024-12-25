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
} from "antd";

import { localHost, localIp } from "../../utils";
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
import { DEFAULT_URL } from "../../urlConfig";

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
  { value: "cpt", label: "CPT" },
  { value: "opt n", label: "OPT N" },
  { value: "opt e", label: "OPT E" },
  { value: "h1b", label: "H1B" },
  { value: "h1b t", label: "H1B T" },
  { value: "h4", label: "H4" },
  { value: "gc", label: "GC" },
];

const employerType = [
  { value: "fulltime", label: "Full Time" },
  { value: "contract", label: "Contract" },
];

const SingleUserForm: React.FC = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { singleUser } = location?.state || {};
  const [current, setCurrent] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [cities, setCities] = useState<any[]>([]);

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

  const formatDate = (epochDate: any) => {
    return moment(epochDate).format("YYYY-MM-DD");
  };
  const { selectedUser } = location?.state || {};

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const countries = Country.getAllCountries();

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
    dateString: string | string[],
    index: any
  ) => {
    const updatedJobs = [...jobs];
    Array.isArray(dateString) ? dateString.join(", ") : dateString;

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
        "_id",
        "email",
        "mobileNumber",
        "password",

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
        "attachment",
        "addOns",
        "tags",
        "guestHouseDate",
        "marketingStartDate",
      ]);



      const statesFormatedDate = personalInfo.dob.toDate().valueOf();

      const formattedData = {
        addOns: { ...additionalInformation.addOns },
        attachment: { ...additionalInformation.attachment },
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
          linkedinID: personalInfo.linkedinID,
          passportNo: personalInfo.passportNo,
          referredBy: personalInfo.referredBy,
          statesEntryDate: Date.parse(personalInfo.statesEntryDate),
          visaStartDate: Date.parse(personalInfo.visaStartDate),
          visaStatus: personalInfo.visaStatus,
        },
        primaryTechnology: additionalInformation.primaryTechnology,
        profile: {
          _id: profile._id,
          active: true,
          address: {
            addressLine1: profile.addressLine1,
            city: profile.city,
            country: profile.country,
            addressLine2: profile.addressLine2,
            state: profile.state,
            type: profile.type,
            zipCode: profile.zipCode,
          },
          authRole: profile.authRole,
          currentLocation: profile.currentLocation,
          email: profile.email,
          firstName: profile.firstName,
          gender: profile.gender,
          jobRole: profile.jobRole,
          lastName: profile.lastName,
          middleName: profile.middleName,
          mobile: profile.mobileNumber,
        },
        secondaryTechnology: additionalInformation.secondaryTechnology,
        tags: additionalInformation.tags,
        marketingStartDate: Date.parse(
          additionalInformation.marketingStartDate
        ),
        guestHouseDate: Date.parse(additionalInformation.guestHouseDate),
      };

      await axiosInstance.put(
        `http://${localHost}:${localIp}/api/v1/user/${singleUser?._id}`,
        formattedData
      );

      message.success("User Updated Successfully");

      navigate(DEFAULT_URL, { state: { openUserTable: true } });
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  {
    /*const toggleForm = () => {
    setShowForm(!showForm);
    setCurrent(0);
  };*/
  }

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
                initialValue={singleUser && singleUser?.profile?.firstName}
                rules={[{ required: true, message: "Please Enter First Name" }]}
              >
                <Input type="text" placeholder="Please Enter First Name" />
              </Form.Item>
            </Col>

            <Col {...span}>
              <Form.Item
                name="middleName"
                label="Middle Name"
                initialValue={singleUser && singleUser?.profile?.middleName}
              >
                <Input type="text" placeholder="Please Enter Middle Name" />
              </Form.Item>
            </Col>

            <Col {...span}>
              <Form.Item
                className="imp-name"
                name="lastName"
                label="Last Name"
                initialValue={singleUser && singleUser?.profile?.lastName}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Last Name",
                  },
                ]}
              >
                <Input type="text" placeholder="Please Enter LastName" />
              </Form.Item>
            </Col>
          </Row>
          <Row {...gutter}>
            {/* <Col {...span}>
            <Form.Item
              name="_id"
              label="Profile ID"
              rules={[{ required: true, message: "Please Enter ID" }]}
            >
              <Input type="text" placeholder="Please Enter ID" />
            </Form.Item>
          </Col> */}
            <Col {...span}>
              <Form.Item
                name="email"
                label="Email"
                initialValue={singleUser && singleUser?.profile?.email}
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
                name="mobileNumber"
                label="Mobile"
                initialValue={singleUser && singleUser?.profile?.mobile}
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
                />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="password"
                label="Password"
                initialValue={singleUser && singleUser?.credentials?.password}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Password",
                  },
                ]}
              >
                <Input type="text" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row {...gutter}>
            <Col {...span}>
              <Form.Item
                className="imp-name"
                name="authRole"
                label="Auth Role"
                initialValue={singleUser && singleUser?.profile?.authRole}
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
                initialValue={singleUser && singleUser?.profile?.gender}
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
                  singleUser && singleUser?.profile?.currentLocation
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
              {/* <Form.Item
                    name="currentLocation"
                    label="Current Location"
                    initialValue={
                      selectedUser && selectedUser?.profile?.currentLocation
                    }
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
                      onChange={handleCurrentLocationChange}
                      onSelect={handleCurrentLocationSelect}
                      value={currentLocation}
                    />
                  </Form.Item>
                  <ul>
                    {currentLocationSuggestions.map((suggestion:any, index:any) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul> */}
            </Col>
          </Row>
          <div className="address">
            <Row {...gutter}>
              {/* <Col {...span}>
              <Form.Item
                name="type"
                label="Address Type"
                rules={[
                  { required: true, message: "Please Select Address Type" },
                ]}
              >
                <Select options={addressType} />
              </Form.Item>
            </Col> */}

              <Col {...span}>
                <Form.Item
                  label="Country"
                  name="country"
                  initialValue={
                    singleUser && singleUser?.profile?.address?.country
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
                    {countries.map((country) => (
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
                    singleUser && singleUser?.profile?.address?.country
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
                    singleUser && singleUser?.profile?.address?.country
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
                    singleUser && singleUser?.profile?.address?.addressLine1
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
                    singleUser && singleUser?.profile?.address?.sddressLine2
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
                    singleUser && singleUser?.profile?.address?.zipCode
                  }
                  rules={[{ required: true, message: "Please  Enter ZipCode" }]}
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
                  initialValue={singleUser && singleUser?.profile?.jobRole}
                  rules={[{ required: true, message: "Please Enter Job Role" }]}
                >
                  <Select options={jobRole} />
                </Form.Item>
              </Col>
              <Col {...span}></Col>
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
                  singleUser && singleUser?.personalInfo?.linkedinID
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
                  singleUser && singleUser?.personalInfo?.passportNo
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
                initialValue={singleUser && singleUser?.personalInfo?.dlNumber}
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
                  singleUser && singleUser?.personalInfo?.visaStatus
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
                  singleUser &&
                  moment(formatDate(singleUser?.personalInfo?.visaStartDate))
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
                  singleUser &&
                  moment(formatDate(singleUser?.personalInfo?.statesEntryDate))
                }
                rules={[
                  { required: true, message: "Please Select Entry Date" },
                ]}
              >
                <DatePicker
                  defaultValue={
                    singleUser &&
                    moment(
                      formatDate(selectedUser?.personalInfo?.visaStartDate)
                    )
                  }
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
                  singleUser && singleUser?.personalInfo?.referredBy
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
                  singleUser &&
                  moment(formatDate(singleUser?.personalInfo?.dob))
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
          {educations && educations.length > 0 ? (
            (educations || []).map((_: any, index: any) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <Row {...gutter}>
                  <Col {...span}>
                    <Form.Item
                      name={["educations", index, "university"]}
                      label="University"
                      initialValue={
                        singleUser && singleUser.educationDetails
                          ? singleUser.educationDetails[index]?.university
                          : ""
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
                        singleUser && singleUser?.educationDetails
                          ? singleUser?.educationDetails[index]?.specialization
                          : ""
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
                        singleUser && singleUser?.educationDetails
                          ? singleUser?.educationDetails[index]?.degree
                          : ""
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
                        singleUser && singleUser?.educationDetails
                          ? moment(
                              formatDate(
                                singleUser?.educationDetails[index]
                                  ?.graduationDate
                              )
                            )
                          : ""
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
            ))
          ) : (
            <p>No Education Details are Available</p>
          )}
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
          {jobs && jobs.length > 0 ? (
            (jobs || []).map((_: any, index: number) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <Row {...gutter}>
                  <Col {...span}>
                    <Form.Item
                      name={["jobs", index, "employerName"]}
                      label="Employer Name"
                      initialValue={
                        singleUser && singleUser?.jobInfo
                          ? singleUser?.jobInfo[index]?.employerName
                          : ""
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
                        selectedUser && singleUser?.jobInfo
                          ? selectedUser?.jobInfo[index]?.employerType
                          : ""
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
                        singleUser && singleUser?.jobInfo
                          ? singleUser?.jobInfo[index]?.employerBusiness
                          : ""
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
                        singleUser && singleUser?.jobInfo
                          ? moment(singleUser?.jobInfo[index]?.startDate)
                          : ""
                      }
                      // rules={[{ message: "Please Select Start Date" }]}
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
                        singleUser && singleUser?.jobInfo
                          ? moment(singleUser?.jobInfo[index]?.endDate)
                          : ""
                      }
                      //rules={[{ message: "Please Select End Date" }]}
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
                        singleUser && singleUser?.jobInfo
                          ? singleUser?.jobInfo[index]?.jobTitle
                          : ""
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
                        singleUser && singleUser?.jobInfo
                          ? singleUser?.jobInfo[index]?.jobDuties
                          : ""
                      }
                      rules={[{ message: "Please Enter Job Duties" }]}
                    >
                      <Input
                        type="text"
                        placeholder="Please Enter Job Duties"
                      />
                    </Form.Item>
                  </Col>
                  <Col {...span}>
                    <Form.Item
                      name={["jobs", index, "skills"]}
                      label="Skills"
                      initialValue={
                        selectedUser && singleUser?.jobInfo
                          ? selectedUser?.jobInfo[index]?.skills
                          : ""
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
            ))
          ) : (
            <p>No Job Details are Available</p>
          )}
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
                initialValue={singleUser && singleUser?.primaryTechnology}
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
                initialValue={singleUser && singleUser?.secondaryTechnology}
              >
                <Input
                  type="text"
                  placeholder="Please Enter Secondary Technology"
                />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="attachment"
                label="Attachments"
                initialValue={singleUser && singleUser?.attachment}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="addOns"
                label="Addons"
                initialValue={singleUser && singleUser?.addOns}
              >
                <Input type="text" />
              </Form.Item>
            </Col>
            <Col {...span}>
              <Form.Item
                name="marketingStartDate"
                label="Marketing Start Date"
                htmlFor="marketingStartDate"
                initialValue={
                  singleUser && moment(singleUser?.marketingStartDate)
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
                initialValue={singleUser && moment(singleUser?.guestHouseDate)}
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
          </Row>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <BreadcrumbComponent title={"New User"} />
      <Form form={form} name="Candidate Info" layout="vertical">
        <Steps current={current}>
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
  );
};

export default SingleUserForm;
