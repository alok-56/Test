import React, { useEffect, useState } from "react";
import { Form, Col, Input, Button, Row, DatePicker, Select } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import { FieldConfig } from "../shared/Form";
import { DatePickerProps } from "antd/lib";

interface CustomFormProps {
  field: FieldConfig;
  form: any;
}

const PhoneInputStyle = {
  width: "100%",
  height: 31,
  borderRadius: 2,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#d9d9d9",
};

const CustomForm: React.FC<CustomFormProps> = ({ field, form }) => {
  const [formattingNumber, setFormattingNumber] = useState<string>("");
  const { key, dynamicFields } = field;
  const initialValues: any = {};

  dynamicFields?.forEach((field) => {
    if (field.key === "phone") {
      initialValues[field.key] = "+1";
    } else {
      initialValues[field.key] = "";
    }
  });
  const onChangeDatePicker: DatePickerProps["onChange"] = () => {};

  const handlePhoneInputChange = (formattedValue: string) => {
    setFormattingNumber(formattedValue);
  };

  useEffect(() => {
    const values = form.getFieldValue(key) || [];
    if (values.length === 0) {
      form.setFieldsValue({ [key]: [initialValues] });
    }
  }, [form, key, initialValues]);

  const handleAddDynamicField = () => {
    const values = form.getFieldValue(key) || [];
    const updatedValues = [...values, initialValues];

    form.setFieldsValue({ [key]: updatedValues });
  };

  const handleRemoveDynamicField = (index: number) => {
    const values = form.getFieldValue(key) || [];
    const updatedValues = values.filter((_: any, i: number) => i !== index);
    form.setFieldsValue({ [key]: updatedValues });
  };

  return (
    <div>
      <Form.List name={key}>
        {(fields) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Row
                  gutter={16}
                  align="middle"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {dynamicFields?.map((dynamicField) => (
                    <Col span={8} key={`${field.name}.${dynamicField.key}`}>
                      <Form.Item
                        label={dynamicField.label}
                        name={[field.name, dynamicField.key]}
                        rules={
                          dynamicField.key === "email"
                            ? [
                                {
                                  required: dynamicField.required,
                                  message: "Required",
                                },
                                {
                                  type: "email",
                                  message: "The input is not valid email!",
                                },
                              ]
                            : dynamicField.required
                              ? [
                                  {
                                    required: dynamicField.required,
                                    message: "Required",
                                  },
                                ]
                              : []
                        }
                      >
                        {dynamicField.type === "text" ? (
                          <Input
                            placeholder={
                              dynamicField.placeholder || "Enter Text"
                            }
                          />
                        ) : dynamicField.type === "contact" ? (
                          <PhoneInput
                            inputStyle={PhoneInputStyle}
                            country={"us"}
                            inputProps={{ required: true }}
                            onChange={handlePhoneInputChange}
                            value={formattingNumber}
                          />
                        ) : dynamicField.type === "textarea" ? (
                          <Input.TextArea
                            placeholder={
                              dynamicField.placeholder || "Enter Text"
                            }
                            autoSize={{ minRows: 3, maxRows: 6 }}
                          />
                        ) : dynamicField.type === "datepicker" ? (
                          <DatePicker
                            style={{ width: "100%" }}
                            format={"YYYY-MM-DD"}
                            onChange={onChangeDatePicker}
                            placeholder={dynamicField.placeholder}
                          />
                        ) : dynamicField.type === "dropdown" ? (
                          <Select
                            placeholder={dynamicField.placeholder || "Select"}
                            options={dynamicField.options}
                          />
                        ) : null}
                      </Form.Item>
                    </Col>
                  ))}
                  <Col span={2} style={{ textAlign: "right" }}>
                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      onClick={() => handleRemoveDynamicField(index)}
                      aria-label="Remove Reference"
                      style={{ marginLeft: 8 }}
                    />
                  </Col>
                </Row>
              </div>
            ))}
          </>
        )}
      </Form.List>
      <div>
        <Button type="primary" onClick={handleAddDynamicField}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default CustomForm;

