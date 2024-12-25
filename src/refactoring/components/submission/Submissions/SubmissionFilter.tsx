import React, { useMemo } from "react";
import {
  Button,
  Col,
  DatePicker,
  Select,
  TimeRangePickerProps,
  Typography,
} from "antd";
import AppConstants from "../../shared/constants";
import AppUtils from "../../../utils/AppUtils";
import dayjs from "dayjs";
import { CloseOutlined } from "@ant-design/icons";
import { maxTagPlaceholder, sharedProps } from "../../../utils/CustomButton";

const { Text } = Typography;
const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Last Day", value: [dayjs().add(-1, "d"), dayjs()] },
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];

const { RangePicker } = DatePicker;

interface SubmissionFiltersProps {
  users: any[];
  filters: any;
  setFilters: any;
  onClearFilter: () => void;
  isAdmin: boolean;
}
const SubmissionFilter: React.FC<SubmissionFiltersProps> = ({
  users,
  filters,
  setFilters,
  onClearFilter,
  isAdmin = false,
}) => {
  const handleUserClear = () => {
    setFilters((prev: any) => ({ ...prev, name: undefined }));
  };
  const handleStatusClear = () => {
    setFilters((prev: any) => ({ ...prev, status: undefined }));
  };

  const handleRecruitersClear = () => {
    setFilters((prev: any) => ({ ...prev, recruiter: undefined }));
  };

  const handleUserSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, name: value }));
  };

  const handleRecruiterSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, recruiter: value }));
  };

  const handleStatusSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, status: value }));
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
            value={filters.name}
            options={
              users?.map((user: any) => ({
                value: user?.profile?._id,
                label: user?.profile?.firstName,
                children: user?.profile?.firstName,
              })) || []
            }
            onClear={handleUserClear}
            onChange={handleUserSearch}
            filterOption={(input: any, option: any) =>
              option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...sharedProps}
            maxTagPlaceholder={maxTagPlaceholder}
          />
        </Col>
      )}

      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          style={{ width: "100%" }}
          allowClear
          placeholder="Status"
          value={filters.status}
          options={
            AppConstants.StatusList?.map((status: any) => ({
              value: status.value,
              label: status.label,
            })) || []
          }
          onClear={handleStatusClear}
          onChange={handleStatusSearch}
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        ></Select>
      </Col>
      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          style={{ width: "100%" }}
          allowClear
          placeholder="Recruiter"
          value={filters.recruiter}
          options={
            AppConstants.salesRecruiterList?.map((submittedBy: any) => ({
              value: submittedBy.value,
              label: submittedBy.label,
            })) || []
          }
          onClear={handleRecruitersClear}
          onChange={handleRecruiterSearch}
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        ></Select>
      </Col>
      <Col span={6}>
        <RangePicker
        style={{ width: "100%" }}
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

export default SubmissionFilter;
