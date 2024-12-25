import React, { useEffect, useState } from "react";
import { Form, message, Steps, Space, Button } from "antd";
import DynamicFormBuilder from "../shared/Form";

import {
  formatCreateUser,
  formatSelectedFields,
  formatUpdateUser,
} from "./helper";
import UserService from "../../services/UserService";
import { Country, State, City } from "country-state-city";
import usePost from "../../hooks/usePost";
import BreadcrumbComponent from "../../../components/Breadcrumb/BreadcrumbComponent";
import NavigationButtons from "../../../components/form/NavigationButtons";
import FormContent from "../../../components/form/FormContent";

import usePut from "../../hooks/usePut";
import { useLocation, useNavigate } from "react-router-dom";

import AppUtils from "../../utils/AppUtils";
import {
  addEducationInfo,
  addExtraInfo,
  addJobInfo,
  addPersonalInfo,
  addProfileInfo,
  addProfileInfoUpdate,
} from "./columns.tsx";
import { FileOutlined } from "@ant-design/icons";
import ResumeView from "../Signup/Resume.tsx";

const { Step } = Steps;

const userService = new UserService();

const AddUser: React.FC = ({}) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { postData } = usePost();
  const { putData } = usePut();
  const country = Form.useWatch("country", form);
  const state = Form.useWatch("state", form);
  const [resumeListModalVisible, setResumeListModalVisible] =
    useState<boolean>(false);
  const [current, setCurrent] = useState(0);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);

  const { selectedUser } = location?.state || {};

  const handleDocument = () => {
    setResumeListModalVisible(true);
  };

  const handleModalCancel = () => {
    setResumeListModalVisible(false);
  };

  const next = () => {
    form.validateFields().then(() => {
      setCurrent(current + 1);
    });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    const countries = Country.getAllCountries();
    const usOption = countries.find((country) => country.isoCode === "US");
    const otherCountries = countries.filter(
      (country) => country.isoCode !== "US"
    );

    setCountryOptions([
      {
        label: usOption?.name,
        value: usOption?.isoCode,
      },
      ...otherCountries.map((country) => ({
        label: country.name,
        value: country.isoCode,
      })),
    ]);
  };

  useEffect(() => {
    if (country) {
      const selectedCountry = countryOptions.find(
        (option) => option.label === country
      );

      if (selectedCountry) {
        const states = State.getStatesOfCountry(selectedCountry.value);

        setStateOptions(
          states.map((state) => ({ label: state.name, value: state.isoCode }))
        );
        setCityOptions([]);
      } else {
        setStateOptions([]);
        setCityOptions([]);
      }
    } else {
      setStateOptions([]);
      setCityOptions([]);
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      const selectedCountry = countryOptions.find(
        (option) => option.label === country
      );
      const selectedState = stateOptions.find(
        (option) => option.label === state
      );

      if (selectedCountry && selectedState) {
        const cities = City.getCitiesOfState(
          selectedCountry.value,
          selectedState.value
        );
        setCityOptions(
          cities.map((city) => ({ label: city.name, value: city.name }))
        );
      } else {
        setCityOptions([]);
      }
    } else {
      setCityOptions([]);
    }
  }, [country, state, stateOptions]);

  const handleStepsChange = (value: number) => {
    setCurrent(value);
  };

  const handleUpdateUser = async (User: any) => {
    return await putData(userService.updateUser(selectedUser._id), User);
  };

  const handleCreateUser = async (User: any) => {
    return await postData(userService.createUser(), User);
  };

  const handleSubmitUser = async () => {
    await form.validateFields();

    const payload = selectedUser
      ? await formatUpdateUser(form.getFieldsValue(true))
      : await formatCreateUser(form.getFieldsValue(true));

    try {
      if (selectedUser) await handleUpdateUser(payload);
      else await handleCreateUser(payload);

      form.resetFields();
      message.success(
        selectedUser
          ? "User Updated Successfully"
          : "User Created  Successfully"
      );
      navigate("/v1/users");
    } catch (err: any) {
      message.error(err.response.data.message || err?.message);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      const updateValues = formatSelectedFields(selectedUser);
      form.setFieldsValue(updateValues);
    }
  }, [selectedUser, form]);

  const steps = [
    {
      title: "Profile Information",

      content: (
        <div className="step-card">
          <Space direction="vertical" style={{ width: "100%" }}>
            <DynamicFormBuilder
              fields={selectedUser ? addProfileInfoUpdate : addProfileInfo}
              form={form}
              columns={3}
              dynamicOptions={{
                country: countryOptions,
                state: stateOptions,
                city: cityOptions,
              }}
            />
          </Space>
        </div>
      ),
    },
    {
      title: "Personal Information",

      content: (
        <div className="step-card">
          <Space direction="vertical" style={{ width: "100%" }}>
            <DynamicFormBuilder
              fields={addPersonalInfo}
              form={form}
              columns={3}
            />
          </Space>
        </div>
      ),
    },
    {
      title: "Educational Information",

      content: (
        <div className="step-card">
          <Space direction="vertical" style={{ width: "100%" }}>
            <DynamicFormBuilder
              fields={addEducationInfo}
              form={form}
              columns={1}
            />
          </Space>
        </div>
      ),
    },
    {
      title: "Job Information",

      content: (
        <div className="step-card">
          <Space direction="vertical" style={{ width: "100%" }}>
            <DynamicFormBuilder fields={addJobInfo} form={form} columns={1} />
          </Space>
        </div>
      ),
    },

    {
      title: "Additional Information",

      content: (
        <div className="step-card">
          <Space direction="vertical" style={{ width: "100%" }}>
            <DynamicFormBuilder fields={addExtraInfo} form={form} columns={3} />
          </Space>
        </div>
      ),
    },
  ];

  return (
    <div style={{ height: "90vh", overflowY: "auto" }}>
      <BreadcrumbComponent
        title={
          selectedUser
            ? `${AppUtils.capitalizeFirstLetter(selectedUser.profile.firstName)} ${AppUtils.capitalizeFirstLetter(selectedUser.profile.lastName)}`
            : "New User"
        }
      >
        {selectedUser && (
          <Button
            type="primary"
            icon={<FileOutlined />}
            onClick={handleDocument}
          >
            View Documents
          </Button>
        )}
      </BreadcrumbComponent>
      <Form
        form={form}
        name="New User"
        layout="vertical"
        initialValues={{
          active: selectedUser ? selectedUser.profile.active : true,
        }}
        onFinish={handleCreateUser}
      >
        <Steps
          direction="horizontal"
          current={current}
          onChange={handleStepsChange}
        >
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
          doneClick={handleSubmitUser}
          totalSteps={steps.length}
        />
      </Form>
      {resumeListModalVisible && (
        <ResumeView
          resumeListModalVisible={resumeListModalVisible}
          handleModalCancel={handleModalCancel}
          selectedHiring={selectedUser}
        />
      )}
    </div>
  );
};

export default AddUser;
