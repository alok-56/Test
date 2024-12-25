import React from "react";
import { Typography } from "antd";
import AppUtils from "../../utils/AppUtils";
import get from "lodash.get";

const { Text, Paragraph } = Typography;

interface item {
  label: string;
  key: string;
  type?: "text" | "date" | "header";
  isCapitalize?: boolean;
  render: (...args: any[]) => any;
  isFullRow?: boolean;
}

interface LabelWithValueProps {
  item: item;
  data: any;
  nullValue?: string;
}
const LabelWithValue: React.FC<LabelWithValueProps> = ({
  item,
  data,
  nullValue = "--",
}) => {
  const { label, key, type = "text", isCapitalize = true, render } = item;
  const value = get(data, key, nullValue);
  const formatDate = "DD MMM,YYYY";
  const renderValue = () => {
    if (type === "date") {
      return AppUtils.unixToDate(value, formatDate);
    } else if (type === "header") {
      return (
        <Text strong style={{ fontSize: 20 }} underline={true}>
          {label}
        </Text>
      );
    } else {
      return isCapitalize ? AppUtils.capitalizeFirstLetter(value) : value;
    }
  };

  if (typeof render === "function") {
    return (
      <>
        <Text>{label}</Text>
        <div>{render(data, key, value)}</div>
      </>
    );
  }
  return (
    <React.Fragment key={key}>
      <Text>{label}</Text>
      <Paragraph type="secondary">
        {value == nullValue ? value : renderValue()}
      </Paragraph>
    </React.Fragment>
  );
};

export default LabelWithValue;
