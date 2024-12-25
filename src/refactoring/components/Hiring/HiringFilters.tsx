import React, { useMemo } from "react";
import { Col, Button, Select, DatePicker, DatePickerProps } from "antd";

import { maxTagPlaceholder, sharedProps } from "../../utils/CustomButton";
import { CloseCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

interface HiringFiltersProps {
  visa: any;
  users: any[];
  filters: any;
  setFilters: any;
  onClearFilter: () => void;
}

const HiringsFilter: React.FC<HiringFiltersProps> = ({
  visa,
  users,
  filters,
  setFilters,
  onClearFilter,
}) => {

  const onChange: DatePickerProps["onChange"] = (dates, dateStrings: any) => {
    if (dates) {
      const selectedYears = dateStrings.map((dateString: any) => dateString);
      setFilters((prev: any) => ({ ...prev, dob: selectedYears }));
    } else {
      setFilters((prev: any) => ({ ...prev, dob: undefined })); // Clear date when null
    }
  };
  const handleVisaClear = () => {
    setFilters((prev: any) => ({ ...prev, visa: undefined }));
  };

  const handleVisaSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, visa: value }));
  };

  const handlefirstNameSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, fname: value }));
  };

  const handlelastNameSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, lname: value }));
  };

  const handlelastNameClear = () => {
    setFilters((prev: any) => ({ ...prev, lname: undefined }));
  };
  const handlefirstNameClear = () => {
    setFilters((prev: any) => ({ ...prev, fname: undefined }));
  };

  const disabled = useMemo(
    () => Object.values(filters).some((key) => key),
    [filters]
  );

  const userNameFilter = (name: any) =>
    name?.filter((item: string) => !/\d/.test(item));

  return (
    <>
    <Col>FILTER BY:</Col>
      <Col span={4}>
        <DatePicker
        placeholder="Select Year"
          multiple
          value={
            filters.dob ? filters.dob.map((year: any) => dayjs(year)) : null
          }
          style={{ width: "100%" }}
          onChange={onChange}
          picker="year"
          allowClear
          maxTagCount="responsive"
          
        />
      </Col>
      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Visa"
          value={filters.visa}
          options={visa}
          onClear={handleVisaClear}
          onChange={handleVisaSearch}
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Col>

      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%", marginRight: "100px" }}
          placeholder="First Name"
          value={userNameFilter(filters.fname)}
          options={
            users?.map((user: any) => ({
              value: user?._id,
              label: user?.firstName,
              children: user?.firstname,
            })) || []
          }
          onClear={handlefirstNameClear}
          onChange={handlefirstNameSearch}
          filterOption={(input: any, option: any) =>
            //option?.children?.toLowerCase().indexOf(input?.toLowerCase()) >= 0

            {
              return (
                option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              );
            }
          }
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
          placeholder="Last Name"
          value={userNameFilter(filters.lname)}
          options={
            users?.map((user: any) => ({
              value: user?._id,
              label: user?.lastName,
              children: user?.lastName,
            })) || []
          }
          onClear={handlelastNameClear}
          onChange={handlelastNameSearch}
          filterOption={(input: any, option: any) =>
            option?.children?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
          }
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Col>
      <Col>
        <Button
          type="primary"
          ghost
          onClick={onClearFilter}
          disabled={!disabled}
          icon={<CloseCircleOutlined />}
        >
          Clear
        </Button>
      </Col>
    </>
  );
};

export default HiringsFilter;
