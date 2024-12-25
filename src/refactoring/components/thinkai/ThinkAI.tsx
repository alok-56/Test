import React, { useState } from "react";
import { Avatar, Button, Form, Input, Radio, RadioChangeEvent } from "antd";
import { UserOutlined, SendOutlined } from "@ant-design/icons";
import ThinkAIService from "../../services/ThinkAIService";
import usePost from "../../hooks/usePost";
import chatBot from "../../../assets/chatbot.jpg";

import { ThreeDots } from "react-loader-spinner";
interface Conversation {
  bot: boolean;
  msg: string;
}

const thinkAI = new ThinkAIService();
const initialConversion = [
  {
    bot: true,
    msg: "Hi there, how can I help you?",
  },
];
const categories = ["Submissions", "Interviews", "Code", "Others"];

const ThinAI: React.FC = () => {
  const [query, setQuery] = useState<any>("");
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversion);
  const [category, setCategory] = useState<string>(categories[0]);

  const { postData, loading } = usePost();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const addNewConversation = (newConv: any) => {
    setConversations((prev: any) => [...prev, newConv]);
  };

  const handleCategoryChange = (e: RadioChangeEvent) => {
    setCategory(e.target.value);
  };

  const handleCreateConversations = async () => {
    const userQuery = query.trim();
    if (userQuery && !loading) {
      const userInput: Conversation = {
        bot: false,
        msg: userQuery,
      };
      addNewConversation(userInput);
      setQuery("");
      const payload = {
        message: query,
        category: category,
      };
      const res = await postData(thinkAI.createConversations(), payload);
      const botResponse = { bot: true, msg: res.answer };
      addNewConversation(botResponse);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        padding: "0 16px",
      }}
    >
      <title>Thinklusive - ThinkAI</title>
      <div style={{ marginBottom: "auto" }}></div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <div style={{ height: "calc(-175px + 100vh)", overflow: "auto" }}>
          {conversations?.map(({ msg, bot }, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: bot ? "initial" : "row-reverse",
              }}
            >
              {bot ? (
                <Avatar src={chatBot} />
              ) : (
                <Avatar
                  size={24}
                  icon={<UserOutlined />}
                  style={{ color: "#F4F4F4" }}
                />
              )}

              <div
                style={{
                  margin: "5px",
                  maxWidth: "80%",
                  padding: "10px",
                  borderRadius: "8px",
                  backgroundColor: bot ? "#deefff" : "#ffffff",
                  fontFamily: "monospace",
                }}
              >
                {msg.includes("--") ? (
                  <pre style={{ overflow: "auto" }}>{msg}</pre>
                ) : (
                  msg
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex" }}>
              <Avatar src={chatBot} />
              <ThreeDots
                visible={true}
                height="30"
                width="80"
                color="#15b5d4"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          width: "100%",
          padding: "4px 0",
        }}
      >
        <Radio.Group
          value={category}
          style={{ marginBottom: 2 }}
          onChange={handleCategoryChange}
        >
          {categories.map((categ, index) => (
            <Radio.Button key={index} value={categ}>
              {categ}
            </Radio.Button>
          ))}
        </Radio.Group>

        <Form
          onFinish={handleCreateConversations}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Form.Item style={{ flex: 1, marginBottom: 0 }}>
            <Input
              autoFocus
              placeholder="Ask me anything about your employee..."
              type="text"
              value={query}
              onChange={handleInputChange}
              style={{ height: "50px" }}
              suffix={
                <Form.Item style={{ marginBottom: 0 }}>
                  <span onClick={handleCreateConversations}>
                    <Button
                      htmlType="submit"
                      title="Send"
                      style={{ width: "100%", border: "0px" }}
                    >
                      <SendOutlined style={{ color: "rgb(21, 181, 212)" }} />
                    </Button>
                  </span>
                </Form.Item>
              }
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ThinAI;
