import React from "react";
import {
  Form,
  Col,
  Input,
  Button,
  Card,
  Row,
  Radio,
  Modal,
  message,
  Flex,
} from "antd";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { FieldConfig } from "../shared/Form";
interface CustomQuestionsProps {
  field: FieldConfig;
  form: any;
}

const CustomQuestions: React.FC<CustomQuestionsProps> = ({ field, form }) => {
  const { key, dynamicFields } = field;
  const selectedQuestions = form.getFieldValue(key) || [];

  const handleAddDynamicField = () => {
    const values = form.getFieldValue(key) || [];
    const updatedValues = [...values, { promptBy: 0 }];
    form.setFieldsValue({ [key]: updatedValues });
  };

  const handleRemoveDynamicField = (index: number) => {
    const values = form.getFieldValue(key) || [];
    const updatedValues = [
      ...values.slice(0, index),
      ...values.slice(index + 1),
    ];
    form.setFieldsValue({ [key]: updatedValues });
  };

  const handleDropdownChange = (e: any, index: number) => {
    const values = form.getFieldValue(key) || [];
    const updatedValues = [...values];
    updatedValues[index] = {
      ...updatedValues[index],
      promptBy: parseInt(e.target.value),
    };
    form.setFieldsValue({ [key]: updatedValues });
  };

  const showDeleteConfirmation = (index: any) => {
    Modal.confirm({
      title: "Confirmation",
      content: "Are you sure you want to delete this Question?",
      icon: <ExclamationCircleOutlined />,
      okText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: async () => await handleRemoveDynamicField(index),
    });
  };
  const handleDelete = async (index: number) => {
    try {
      const { text, answer } = form.getFieldValue(key)[index] || {};
      if (text || answer) {
        await showDeleteConfirmation(index);
      } else {
        await handleRemoveDynamicField(index);
      }
    } catch (error: any) {
      message.error("Error deleting Interview Question:", error);
    }
  };
  return (
    <Col span={24}>
      <Card
        size="small"
        title="Questions"
        actions={[<Flex justify="end" align="middle">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddDynamicField}
            ghost
            aria-label="Add Question"
          >
            Add
          </Button>
        </Flex>,]}
      >
        <Form.List name={key} initialValue={[{ promptBy: 0 }]}>
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
                  {dynamicFields?.map((dynamicField, dynamicIndex) => {
                    const questions = form.getFieldValue("questions");
                    const promptByValue = parseInt(questions[index]?.promptBy);
                    if (dynamicField.key === "answer" && promptByValue !== 1) {
                      return null;
                    }
                    return (
                      <Form.Item
                        style={{ margin: 8 }}
                        key={`${field.name}.${dynamicField.key}`}
                        label={`${dynamicIndex === 0 ? index + 1 + ". " : ""}${
                          dynamicField.label
                        }`}
                        name={[field.name, dynamicField.key]}
                        rules={[
                          {
                            required: dynamicField.required,
                            message: `Required`,
                          },
                        ]}
                      >
                        <Row>
                          <Col span={22}>
                            {dynamicField.type === "textarea" ? (
                              <Input.TextArea
                                required={dynamicField.required}
                                placeholder={
                                  dynamicField.placeholder || "Enter Text"
                                }
                                autoSize={{ minRows: 3, maxRows: 6 }}
                                style={{ width: "100%" }}
                                value={
                                  selectedQuestions?.[field.key]?.[
                                    dynamicField.key
                                  ] || ""
                                }
                              />
                            ) : dynamicField.type === "dropdown" ? (
                              <Radio.Group
                                value={promptByValue !== 1 ? 0 : promptByValue}
                                onChange={(e) => handleDropdownChange(e, index)}
                                buttonStyle="solid"
                              >
                                {dynamicField?.dynamicOtions?.map(
                                  (option: any) => (
                                    <Radio.Button
                                      key={option.value}
                                      value={option.value}
                                    
                                    >
                                     <span style={{marginRight:"10px"}}>{option.icon}</span>
                                     <span>{option.label}</span>
                                      
                                    </Radio.Button>
                                  )
                                )}
                              </Radio.Group>
                            ) : null}
                          </Col>
                          <Col span={2}>
                            {dynamicIndex === 0 && fields.length > 1 && (
                              <Button
                                icon={<DeleteOutlined />}
                                style={{ marginLeft: 20 }}
                                danger
                                onClick={() => handleDelete(index)}
                                aria-label="Remove Question"
                              />
                            )}
                          </Col>
                        </Row>
                      </Form.Item>
                    );
                  })}
                </div>
              ))}
            </>
          )}
        </Form.List>
      </Card>
    </Col>
  );
};

export default CustomQuestions;
