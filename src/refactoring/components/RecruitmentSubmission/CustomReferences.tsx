import React, { useEffect, useState } from "react";
import {
  Form,
  Col,
  Input,
  Button,
  Card,
  Row,
  Modal,
  message,
  DatePicker,
  DatePickerProps,
  Select,
} from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import { FieldConfig } from "../shared/Form";

interface CustomReferencesProps {
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

const CustomReferences: React.FC<CustomReferencesProps> = ({ field, form }) => {
  const [formattingNumber, setFormattingNumber] = useState<string>("");
  const { key, dynamicFields } = field;
  const initialValues: any = {};

  // Iterate over each fieldConfig and set the corresponding key to an empty string
  dynamicFields?.forEach((field) => {
    if (field.key === "phone") {
      initialValues[field.key] = "+1";
    } else {
      initialValues[field.key] = "";
    }
  });

  const handlePhoneInputChange = (formattedValue: string) => {
    setFormattingNumber(formattedValue);
  };
  const onChangeDatePicker: DatePickerProps["onChange"] = () => {};

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
    const updatedValues = values.filter((_:any, i:number) => i !== index);
    form.setFieldsValue({ [key]: updatedValues });
  };

  const showDeleteConfirmation = (index: any) => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure you want to delete this Reference?",
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: async () => await handleRemoveDynamicField(index),
    });
  };

  const handleDelete = async (index: number) => {
    try {
      const { name, email } = form.getFieldValue(key)[index] || {};
      if (name || email) {
        await showDeleteConfirmation(index);
      } else {
        await handleRemoveDynamicField(index);
      }
    } catch (error: any) {
      message.error("Error deleting Reference:", error);
    }
  };

  return (
    <Card
      size="small"
      title="References"
      actions={[
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddDynamicField}
            ghost
            aria-label="Add Reference"
          >
            Add
          </Button>
        </Row>,
      ]}
    >
      <Form.List name={key}>
        {(fields) => (
          <>
            {fields.map((field, index) => (
              <div
                key={field.key}
                style={{
                  background: "#fafafa",
                  borderRadius: 4,
                  padding: 8,
                  marginBottom: 8,
                }}
              >
                <Row gutter={16} align="middle">
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
                            required={dynamicField.required}
                            placeholder={
                              dynamicField.placeholder || "Enter Text"
                            }
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            style={{ width: "100%" }}
                          />
                        ) : dynamicField.type === "datepicker" ? (
                          <DatePicker
                            format={"YYYY-MM-DD"}
                            placeholder={dynamicField.placeholder}
                            onChange={onChangeDatePicker}
                            style={{ width: "100%" }}
                          />
                        ) : dynamicField.type === "dropdown" ? (
                          <Select options={dynamicFields} />
                        ) : null}
                      </Form.Item>
                    </Col>
                  ))}
                  {fields.length > 1 && (
                    <Col span={4} style={{ textAlign: "right" }}>
                      <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(index)}
                        aria-label="Remove Reference"
                        style={{ marginLeft: 8 }}
                      />
                    </Col>
                  )}
                </Row>
              </div>
            ))}
          </>
        )}
      </Form.List>
    </Card>
  );
};

export default CustomReferences;
