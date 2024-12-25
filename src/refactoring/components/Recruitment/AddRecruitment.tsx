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
import { formatCreateRecruitment, formatUpdateRecruitment } from "./helper";
import usePost from "../../hooks/usePost";
import { Country, State, City } from "country-state-city";
import RecruitmentService from "../../services/RecruitmentService";
import {
  addRecruitmentFieldsStepOne,
  addRecruitmentFieldsStepTwo,
} from "./columns";
import useGet from "../../hooks/useGet";
import { dummyClientData } from "../submission/Submissions/constants";
import ClientService from "../../services/ClientService";
import { PlusOutlined } from "@ant-design/icons";
import AddClient from "../client/AddClient";
import usePut from "../../hooks/usePut";
import dayjs from "dayjs";

const { Text } = Typography;
const clientService = new ClientService();
const recruitmentService = new RecruitmentService();

interface RecruitmentFormProps {
  handleCancel: () => void;
  recruitmentData: any[];
  onRecruitmentAdded: () => void;
  usersData: any;
  selected: any;
}
const initialValues = {
  backgroundCheck: true,
  drugScreen: false,
  f2fInterview: false,
  priority: false,
  submissionLimit:30,
  positionType:"Contract",
  status:"Open",
  createDate:dayjs()
};
const AddRecruitment: React.FC<RecruitmentFormProps> = ({
  handleCancel,
  recruitmentData,
  onRecruitmentAdded,
  usersData,
  selected,
}) => {
  const [form] = Form.useForm();
  const { postData, loading: creating } = usePost();
  const { fetchData, loading } = useGet();
  const { putData, loading: updating } = usePut();

  const country = Form.useWatch("country", form);
  const state = Form.useWatch("state", form);

  const [clientOptions, setClientOptions] = useState<any[]>([]);
  const [clientModalVisible, setClientModalVisible] = useState<any>(false);
  const [countryOptions, setCountryOptions] = useState<any[]>([]);
  const [stateOptions, setStateOptions] = useState<any[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);

  const getClientData = async () => {
    const res = await fetchData(clientService.getClients());
    setClientOptions([...res, dummyClientData]);
  };
  useEffect(() => {
    getClientData();
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
        form.setFieldsValue({ state: undefined, city: undefined });
      } else {
        setStateOptions([]);
        setCityOptions([]);
        form.setFieldsValue({ state: undefined, city: undefined });
      }
    } else {
      setStateOptions([]);
      setCityOptions([]);
      form.setFieldsValue({ state: undefined, city: undefined });
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
        form.setFieldsValue({ city: undefined });
      } else {
        setCityOptions([]);
        form.setFieldsValue({ city: undefined });
      }
    } else {
      setCityOptions([]);
      form.setFieldsValue({ city: undefined });
    }
  }, [country, state]);

  useEffect(() => {
    if (selected) {
      const updateValues = formatUpdateRecruitment(
        selected,
        usersData,
        clientOptions
      );

      form.setFieldsValue(updateValues);
      
      // Set individual work location fields if needed
      if (selected.workLocation) {
        form.setFieldsValue({
          addressLine1: selected.workLocation.addressLine1,
          addressLine2: selected.workLocation.addressLine2,
          city: selected.workLocation.city,
          country: selected.workLocation.country,
          state: selected.workLocation.state,
          zipCode: selected.workLocation.zipCode,
          projectedStartDate:[dayjs.unix(selected.projectedStartDate),dayjs.unix(selected.projectedEndDate)]
        });
      }
    }
  }, [selected, clientOptions,form]);

  const handleCreateRecruitment = async (recruitment: any) => {
    return await postData(recruitmentService.createRecruitment(), recruitment);
  };

  const handleUpdateRecruitment = async (recruitment: any) => {
    return await putData(
      recruitmentService.updateRecruitment(selected._id),
      recruitment
    );
  };
  const handleSubmitRecruitment = async () => {
    await form.validateFields();
    try {
      const payload = await formatCreateRecruitment(
        form.getFieldsValue(),
        usersData,
        clientOptions
      );

      if (selected) await handleUpdateRecruitment(payload);
      else await handleCreateRecruitment(payload);
      onRecruitmentAdded();
      handleCancel();
      form.resetFields();
      message.success(
        selected
          ? "Recruitment updated successfully"
          : "Recruitment created successfully"
      );
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const handleAddClientClick = () => {
    setClientModalVisible((prev: boolean) => !prev);
  };

  const getNotFoundBtn = (onClick: any, text: string) => (
    <Button type="text" block icon={<PlusOutlined />} onClick={onClick}>
      {text}
    </Button>
  );

  const getLatestClient = async (newClient: any) => {
    await getClientData();
    form.setFieldsValue({ clientCompanyName: newClient.data.name });
  };

  return (
    <>
      <Drawer
        title={selected ? "Update Recruitment" : "New Recruitment"}
        open
        onClose={handleCancel}
        maskClosable={false}
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleSubmitRecruitment}>
            {selected ? "Update Recruitment" : "Add Recruitment"}
          </Button>,
        ]}
        width="60%"
      >
        <Spin spinning={loading || creating || updating}>
          <Form
            form={form}
            initialValues={initialValues}
            name="recruitment"
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
                        fields={addRecruitmentFieldsStepOne}
                        form={form}
                        columns={2}
                        dynamicOptions={{
                          profileId: usersData,
                          submittedTo: usersData,
                          customerId: clientOptions,
                          name: recruitmentData,
                          country: countryOptions,
                          state: stateOptions,
                          city: cityOptions,
                        }}
                        notFoundContent={{
                          customerId: getNotFoundBtn(
                            handleAddClientClick,
                            "New Client"
                          ),
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
                        fields={addRecruitmentFieldsStepTwo}
                        form={form}
                        columns={2}
                      />
                    </Space>
                  ),
                },
              ]}
            />

            {clientModalVisible && (
              <AddClient
                handleCancel={handleAddClientClick}
                clientData={clientOptions}
                onClientAdded={getLatestClient}
              />
            )}
          </Form>
        </Spin>
      </Drawer>
    </>
  );
};

export default AddRecruitment;
