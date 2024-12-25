import React from "react";
import {
  Form,
  Input,
  Select,
  Col,
  Row,
  AutoComplete,
  DatePicker,
  Checkbox,
  Radio,
} from "antd";
import { DatePickerProps } from "antd/lib";
import { renderArrayInput } from "./renderingArray";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import get from "lodash.get";
import TagsInput from "./TagSelector";
import { InfoCircleOutlined } from "@ant-design/icons";
import ToggleSwitch from "./Switch";

const { Option } = Select;

export interface FieldConfig {
  label: string;
  key: string;
  type?:
    | "text"
    | "dropdown"
    | "autocomplete"
    | "datepicker"
    | "array"
    | "textarea"
    | "contact"
    | "select"
    | "checkbox"
    | "Switch"
    | "number"
    | "radio"
    | "tag"
    | "header"
    | "dynamic"
    | "file"
    | "rangepicker"
    | "linkedin";

  render?: (value: any, onChange: (newValue: any) => void) => React.ReactNode;
  dynamicComponent?: (key: string, field: any, form: any) => React.ReactNode;
  fileComponent?: (key: string, field: any, form: any) => React.ReactNode;
  dynamicOtions?: { label: string; value: any; icon: any }[];
  options?: { label: string; value: any }[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  valueKey?: string;
  labelKey?: string;
  includeTime?: boolean;
  fields?: {
    label: string;
    key: string;
    type: string;
    placeholder: string;
    required: boolean;
    includeTime?: boolean;
    options?: { label: string; value: string }[];
  }[];
  filterOptions?: (inputValue: string, option: any) => boolean;
  singleFieldInRow?: boolean;
  fullRowWidth?: boolean;
  additinalLabel?: string;
  dynamicFields?: FieldConfig[];
  tooltip?: string;
  defaultValue?: string;
}

interface DynamicFormBuilderProps {
  fields: FieldConfig[];
  form: any;
  columns?: number;
  dynamicOptions?: {
    [key: string]: any[];
  };
  notFoundContent?: {
    [key: string]: React.ReactNode;
  };
  onChange?: (changedValues: any, allValues: any) => void;
}

const DynamicFormBuilder: React.FC<DynamicFormBuilderProps> = ({
  fields,
  form,
  columns = 1,
  dynamicOptions = {},
  notFoundContent = {},
  onChange,
}) => {
  const onChangeDatePicker: DatePickerProps["onChange"] = () => {};

  const handleChange = (changedValues: any, allValues: any) => {
    if (onChange) {
      onChange(changedValues, allValues);
    }
  };
  const handleSwitch = (key: string, checked: boolean) => {
    form.setFieldsValue({ [key]: checked });
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
  const formItems = fields.map((field) => {
    const {
      key,
      label,
      render,
      type = "text",
      required,
      placeholder,
      disabled,
      options = [],
      valueKey = "value",
      labelKey = "label",
      includeTime = false,
      filterOptions,
      singleFieldInRow = false,
      fullRowWidth = false,
      additinalLabel,
      tooltip,
      dynamicComponent,
      fileComponent,
      defaultValue,
    } = field;

    const allOptions = [...options, ...(dynamicOptions?.[key] || [])].filter(
      (option) => option !== null
    );

    const renderComponent = () => {
      switch (type) {
        case "text":
          return render ? (
            render(form.getFieldValue(key), form.setFieldsValue)
          ) : (
            <Input
              disabled={disabled}
              placeholder={placeholder}
              required={required}
            />
          );
        case "number":
          return render ? (
            render(form.getFieldValue(key), form.setFieldsValue)
          ) : (
            <Input
              disabled={disabled}
              placeholder={placeholder}
              required={required}
              type="number"
              style={{width:"25%"}}
            />
          );
        case "dropdown":
          return render ? (
            render(form.getFieldValue(key), form.setFieldsValue)
          ) : (
            <Select
              disabled={disabled}
              placeholder={placeholder}
              defaultValue={defaultValue}
            >
              {allOptions?.map((option) => (
                <Option key={option[valueKey]} value={option[valueKey]}>
                  {option[labelKey]}
                </Option>
              ))}
            </Select>
          );
        case "select":
          return render
            ? render(form.getFieldValue(key), form.setFieldsValue)
            : generateSelectComponent();
        case "autocomplete":
          return generateAutoCompleteComponent();
        case "datepicker":
          return generateDatePickerComponent();
        case "rangepicker":
          return generateRangePickerComponent();
        case "array":
          return render
            ? render(form.getFieldValue(key), form.setFieldsValue)
            : renderArrayInput(form.getFieldValue(key), form.setFieldsValue);
        case "textarea":
          return (
            <Input.TextArea
              disabled={disabled}
              placeholder={placeholder}
              required={required}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          );
        case "contact":
          return generatePhoneInputComponent();
        case "checkbox":
          return generateCheckboxComponent();
        case "Switch":
          return generateSwitchComponent();
        case "radio":
          return generateRadioComponent();
        case "tag":
          return (
            <TagsInput
              value={form.getFieldValue(key)}
              onChange={(tags: any) => form.setFieldsValue({ [key]: tags })}
            />
          );
        case "header":
          return;
        case "dynamic":
          return dynamicComponent ? dynamicComponent(key, field, form) : null;
        case "file":
          return fileComponent ? fileComponent(key, field, form) : null;
        case "linkedin":
          return (
            <Input
              disabled={disabled}
              placeholder={placeholder}
              required={required}
              type="url"
              pattern="https?:\/\/(www\.)?linkedin\.com\/in\/.*"
            />
          );
        default:
          return null;
      }
    };

    const generateCheckboxComponent = () => (
      <Checkbox
        name={key}
        checked={form.getFieldValue(key)}
        id={key}
        onChange={({ target: { checked } }) =>
          form.setFieldsValue({ [key]: checked })
        }
      >
        {additinalLabel}
      </Checkbox>
    );

    const generateSwitchComponent = () => (
      <ToggleSwitch
        checked={form.getFieldValue(field.key)}
        onChange={(checked) => handleSwitch(field.key, checked)}
        disabled={disabled}
      />
    );

    const generateSelectComponent = () => (
      <Select
        showSearch
        allowClear
        disabled={disabled}
        placeholder={placeholder}
        filterOption={filterOptions}
        notFoundContent={notFoundContent[key]}
      >
        {allOptions?.map((option) => (
          <Option key={get(option, valueKey)} value={get(option, labelKey)}>
            {option[labelKey]}
          </Option>
        ))}
      </Select>
    );

    const generateAutoCompleteComponent = () => (
      <AutoComplete
        disabled={disabled}
        placeholder={placeholder}
        options={allOptions?.map((option) => ({
          value: get(option, valueKey),
          label: get(option, labelKey),
        }))}
        filterOption={(inputValue, option: any) => {
          return (
            option?.label?.toLowerCase().indexOf(inputValue.toLowerCase()) !==
            -1
          );
        }}
      />
    );

    const generateDatePickerComponent = () => (
      <DatePicker
        showTime={includeTime ? { format: "HH:mm:ss" } : false}
        format={includeTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
        placeholder={placeholder}
        onChange={onChangeDatePicker}
        style={{ width: "100%" }}
      />
    );
    const generateRangePickerComponent = () => (
      <DatePicker.RangePicker
        showTime={includeTime ? { format: "HH:mm:ss" } : false}
        format={includeTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
        placeholder={[placeholder || "Start Date", placeholder || "End Date"]}
        onChange={(dates: any, _) => {
          form.setFieldsValue({
            minDateValue: dates?.[0] || null,
            maxDateValue: dates?.[1] || null,
          });
        }}
        style={{ width: "100%" }}
      />
    );

    const generatePhoneInputComponent = () => (
      <PhoneInput
        country={"us"}
        onChange={(formattedValue) => {
          form.setFieldsValue({ [key]: formattedValue });
        }}
        inputStyle={{
          width: "100%",
          height: 31,
          borderRadius: 2,
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#d9d9d9",
        }}
      />
    );

    const generateRadioComponent = () => (
      <Radio.Group
        //defaultValue={allOptions[0][valueKey]}
        onChange={(e) => form.setFieldsValue({ [key]: e.target.value })}
      >
        {allOptions?.map((option) => (
          <Radio key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </Radio>
        ))}
      </Radio.Group>
    );

    return (
      <React.Fragment key={`${key}`}>
        <Col key={key} span={24 / (fullRowWidth ? 1 : columns)} >
          <Form.Item
            required={required}
            label={label}
            name={key}
            key={key}
            rules={[
              { required: required || false, message: "Required" },
              ...(key === "firstName" || key === "lastName"
                ? [{ min: 4, message: "Name must be greater than 3 characters" }]
                : []),
              ...(key === "email" ? [{ type: "email" as const }] : []),
              ...(type === "linkedin"
                ? [
                    {
                      pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/.+$/,
                      message: "Please enter a valid LinkedIn URL",
                    },
                  ]
                : []),
              ...(key === "zipCode"
                ? [
                    {
                      validator: validateZipCode,
                    },
                  ]
                : []),
            ]}
            tooltip={
              tooltip
                ? {
                    title: tooltip,
                    icon: <InfoCircleOutlined />,
                  }
                : null
            }
          >
            {renderComponent()}
          </Form.Item>
        </Col>
        {singleFieldInRow && <Col key={key} span={24 / columns}></Col>}
      </React.Fragment>
    );
  });

  return (
    <Form form={form} layout="vertical" onValuesChange={handleChange}>
      <Row gutter={[16, 0]}>{formItems}</Row>
    </Form>
  );
};

export default DynamicFormBuilder;
