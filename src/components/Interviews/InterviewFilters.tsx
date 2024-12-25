import React, { useMemo } from "react";
import {
  Button,
  Select,
  TimeRangePickerProps,
  Typography,
  DatePicker,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import AppUtils from "../../refactoring/utils/AppUtils";
const { RangePicker } = DatePicker;
const { Text } = Typography;
const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];
interface IInterviewFiltersProps {
  filters: any;
  setFilters: any;
  onClearFilter: () => void;
  isAdmin: boolean;
  interviewData: any;
}
const InterviewFilter: React.FC<IInterviewFiltersProps> = ({
  filters,
  setFilters,
  onClearFilter,
  isAdmin,
  interviewData,
}) => {
  const getUniqueByProfileId = (data: any[]) => {
    const seen = new Set();
    return data?.filter((item) => {
      const profileId = item?.subDetails?.profile?._id;
      if (seen?.has(profileId)) {
        return false; // Skip if this profile._id has already been seen
      }
      seen.add(profileId);
      return true; // Include the item if it's the first time encountering this profile._id
    });
  };

  // Get unique items based on profile._id
  const uniqueItems = getUniqueByProfileId(interviewData);

  const handleUserClear = () => {
    setFilters((prev: any) => ({ ...prev, name: undefined }));
  };

  const handleUserSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, name: value }));
  };

  const handleDateChange = (_: any, dateStrings: [string, string]) => {
    const [fromDate, toDate] = dateStrings;
    if (!fromDate) {
      setFilters((prev: any) => ({
        ...prev,
        fromDate,
        toDate,
      }));
      return;
    }

    const unixFromDate = AppUtils.dateToUnix(fromDate);
    const unixToDate = AppUtils.dateToUnix(toDate);
    setFilters((prev: any) => ({
      ...prev,
      fromDate: unixFromDate,
      toDate: unixToDate,
    }));
    return;
  };

  const disabled = useMemo(
    () => Object.values(filters).some((key) => key),
    [filters]
  );
  return (
    <div   style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      width: "90%"
    }}>
      <Text type="secondary" style={{marginRight:"10px"}}>FILTER BY</Text>

      {isAdmin && (
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "20%",marginRight:"10px" }}
          placeholder="Candidate Name"
          value={filters.name}
          options={
            uniqueItems?.map((interview: any) => ({
              value: interview?.subDetails?.profile?._id,
              label: interview?.subDetails?.profile?.name,
              children: interview?.subDetails?.profile?.name,
            })) || []
          }
          onClear={handleUserClear}
          onChange={handleUserSearch}
        />
      )}

     <div> <RangePicker style={{marginRight:"10px"}}
        presets={rangePresets}
        onChange={handleDateChange}
        value={
          filters.fromDate
            ? [
                dayjs(AppUtils.unixToDate(filters.fromDate)),
                dayjs(AppUtils.unixToDate(filters.toDate)),
              ]
            : [null, null]
        }
      /></div>

      <Button
        type="primary"
        ghost
        onClick={onClearFilter}
        disabled={!disabled}
        icon={<CloseOutlined />}
      >
        Clear
      </Button>
    </div>
  );
};

export default InterviewFilter;
