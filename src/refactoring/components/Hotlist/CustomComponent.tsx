import React, { useState } from "react";
import { Select } from "antd";
import get from "lodash.get";

interface NameEditorProps {
  value: string;
  values: any[];
  onValueChange: (value: any) => void;
  placeholder?: string;
  valueKey?: string;
  labelKey?: string;
  customLabel?: boolean;
  data?: any;
  rowIndex: number;
  api: any;
}

export const CustomCellEditor: React.FC<NameEditorProps> = ({
  value,
  values: options,
  onValueChange,
  placeholder = "Select",
  labelKey = "label",
  valueKey = "value",
  customLabel = true,
}) => {
  const [selectedValue, setSelectedValue] = useState<any>(value);

  const handleChange = (newValue: string) => {
    if (newValue === undefined) {
      return newValue;
    }
    setSelectedValue(newValue);
    onValueChange(newValue);
  };

  const filterOptions = (input: string, option: any) => {
    if (!option) return false; // Check if option exists
    const label =get(option,labelKey).toLowerCase(); // Safely get the label
    return label?.includes(input?.toLowerCase()); // Case insensitive match
  };

  return (
    <Select
      bordered={false}
      showSearch
      style={{ width: "100%", height: "100%", background: "#fff" }}
      onChange={handleChange}
      value={selectedValue}
      placeholder={placeholder}
      options={
        customLabel
          ? options.map((option: any) => {
              const label = get(option, labelKey);
              const value = get(option, valueKey);
              return { value, label };
            })
          : options
      }
      filterOption={filterOptions}
    ></Select>
  );
};
