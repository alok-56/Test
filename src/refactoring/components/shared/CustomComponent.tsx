import React, { useEffect, useState } from "react";
import { Form, Col, Input, Button, Card, Row, DatePicker, Select } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
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

  dynamicFields?.forEach((field) => {
    initialValues[field.key] = "";
  });

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
    const updatedValues = [...values.slice(0, index), ...values.slice(index + 1)];
    form.setFieldsValue({ [key]: updatedValues });
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
                    <Col span={6} key={`${field.name}.${dynamicField.key}`}>
                      <Form.Item
                        label={dynamicField.label}
                        name={[field.name, dynamicField.key]}
                        rules={
                          dynamicField.key === "email"
                            ? [
                                {
                                  type: "email",
                                  message: "The input is not valid email!",
                                },
                              ]
                            : []
                        }
                      >
                        {dynamicField.type === "text" ? (
                          <Input
                            placeholder={dynamicField.placeholder || "Enter Text"}
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
                            placeholder={dynamicField.placeholder || "Enter Text"}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            style={{ width: "100%" }}
                          />
                        ) : dynamicField.type === "datepicker" ? (
                          <DatePicker
                            format={"YYYY-MM-DD"}
                            placeholder={dynamicField.placeholder}
                            style={{ width: "100%" }}
                          />
                        ) : dynamicField.type === "dropdown" ? (
                          <Select
                            placeholder={dynamicField.placeholder || "Select"}
                            options={dynamicField.options}
                            style={{ width: "100%" }}
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
    </Card>
  );
};

export default CustomReferences;
