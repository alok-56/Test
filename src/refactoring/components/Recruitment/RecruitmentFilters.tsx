import React, { useMemo } from "react";
import {
  Button,
  Col,
  Select,
  TimeRangePickerProps,
  Typography,
  DatePicker,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import AppUtils from "../../utils/AppUtils";
import { maxTagPlaceholder, sharedProps } from "../../utils/CustomButton";
const { RangePicker } = DatePicker;
const { Text } = Typography;
const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];
interface InterviewQuestionsFiltersProps {
  users: any[];
  clientsData: any[];
  status: any;
  filters: any;
  setFilters: any;
  onClearFilter: () => void;
  isAdmin: boolean;
}
const RecruitmentFilter: React.FC<InterviewQuestionsFiltersProps> = ({
  clientsData,
  status,
  filters,
  setFilters,
  onClearFilter,
  users,
  isAdmin,
}) => {
  const handleStatusClear = () => {
    setFilters((prev: any) => ({ ...prev, status: undefined }));
  };
  const handleUserClear = () => {
    setFilters((prev: any) => ({ ...prev, profileId: undefined }));
  };
  const handleClientClear = () => {
    setFilters((prev: any) => ({ ...prev, clientId: undefined }));
  };
  const handleUserSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, profileId: value }));
  };
  const handleStatusSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, status: value }));
  };
  const handleClientSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, clientId: value }));
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
    <>
      <Col>
        <Text type="secondary">FILTER BY</Text>
      </Col>
      {isAdmin && (
        <Col span={4}>
          <Select
            mode="multiple"
            showSearch
            allowClear
            style={{ width: "100%" }}
            placeholder="User"
            value={filters.profileId}
            options={
              users?.map((user: any) => ({
                value: user?.profile?._id,
                label: user?.profile?.firstName,
                children: user?.profile?.firstName,
              })) || []
            }
            onClear={handleUserClear}
            onChange={handleUserSearch}
            {...sharedProps}
            maxTagPlaceholder={maxTagPlaceholder}
          />
        </Col>
      )}
      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Client"
          value={filters.clientId}
          options={
            clientsData?.map((client: any) => ({
              value: client?.company_id,
              label: client?.name,
              children: client?.name,
            })) || []
          }
          onClear={handleClientClear}
          onChange={handleClientSearch}
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Col>
      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Status"
          value={filters.status}
          options={status}
          onClear={handleStatusClear}
          onChange={handleStatusSearch}
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Col>
      <Col span={6}>
        <RangePicker
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
        />
      </Col>
      <Col>
        <Button
          type="primary"
          ghost
          onClick={onClearFilter}
          disabled={!disabled}
          icon={<CloseOutlined />}
        >
          Clear
        </Button>
      </Col>
    </>
  );
};

export default RecruitmentFilter;
