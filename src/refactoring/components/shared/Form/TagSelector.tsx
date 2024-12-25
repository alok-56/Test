import React, { useState, useEffect, useRef } from "react";
import { Input, InputRef, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const tagInputStyle: React.CSSProperties = {
  width: 80,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

const tagPlusStyle: React.CSSProperties = {
  height: 22,
  borderStyle: "dashed",
};

const TagsInput = ({ value = [], onChange }: any) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  const handleIconClick = () => {
    setInputVisible(true);
  };

  useEffect(() => {
    if (value && value.length > 0) {
      if (typeof value[0] === "string") {
        const updatedValues = value.map((val: string) => ({
          text: val,
          color: getRandomColor(),
        }));
        onChange(updatedValues);
      }
    }
  }, [value]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue.trim()) {
      onChange([
        ...value,
        { text: inputValue.trim(), color: getRandomColor() },
      ]);
      setInputValue("");
      setInputVisible(false);
    }
  };

  const handleClose = (removedTag: any) => {
    const newTags = value.filter((tag: any) => tag.text !== removedTag.text);
    onChange(newTags);
  };
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
  };

  useEffect(() => {
    if (inputVisible) {
      inputRef?.current?.focus();
    }
  }, [inputVisible]);

  return (
    <div>
      {value.map((tag: any, _: any) => (
        <Tag
          key={tag?.text}
          color={tag?.color}
          closable
          onClose={() => handleClose(tag)}
        >
          {tag?.text}
        </Tag>
      ))}
      {inputVisible ? (
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onPressEnter={handleInputConfirm}
          onBlur={() => setInputVisible(false)}
          style={tagInputStyle}
          ref={inputRef}
          placeholder="New tag"
        />
      ) : (
        <Tag
          style={tagPlusStyle}
          icon={<PlusOutlined />}
          onClick={handleIconClick}
        >
          New Tag
        </Tag>
      )}
    </div>
  );
};

export default TagsInput;
