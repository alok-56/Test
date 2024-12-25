import React, { useEffect, useState } from "react";
import { Col, Button,  } from "antd";
import AppConstants from "../shared/constants";
//import { maxTagPlaceholder, sharedProps } from "../../utils/CustomButton";
//import { CloseCircleOutlined } from "@ant-design/icons";

interface UserFiltersProps {
  onFiltersChange: (filters: any) => void;
  users: any[];
  filters: any;
  setFilters: any;
  onClearFilter: () => void;
}

const UsersFilter: React.FC<UserFiltersProps> = ({
  onFiltersChange,

}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("onlyUsers");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    onFiltersChange(filter);
  };

  // const handlefnameSearch = (value: string) => {
  //   setFilters((prev: any) => ({ ...prev, fname: value }));
  // };

  // const handlelnameSearch = (value: string) => {
  //   setFilters((prev: any) => ({ ...prev, lname: value }));
  // };

  // const handlelnameClear = () => {
  //   setFilters((prev: any) => ({ ...prev, lname: undefined }));
  // };
  // const handlefnameClear = () => {
  //   setFilters((prev: any) => ({ ...prev, fname: undefined }));
  // };
  useEffect(() => {
    handleFilterChange(AppConstants.Users[0].value);
  }, []);

  // const disabled = useMemo(
  //   () => Object.values(filters).some((key) => key),
  //   [filters]
  // );
  // const userNameFilter = (name: any) =>
  //   name?.filter((item: string) => !/\d/.test(item));

  return (
    <>
      {" "}
      <Col>
        {AppConstants.Users.map((option) => (
          <Button
            key={option.value}
            type={selectedFilter === option.value ? "primary" : "default"}
            onClick={() => handleFilterChange(option.value)}
            style={{ marginRight: 8 }}
          >
            {option.label}
          </Button>
        ))}
      </Col>
      {/* <Col span={4} style={{marginRight:"5px"}}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" ,marginRight:"100px"}}
          placeholder="First Name"
          value={userNameFilter(filters.fname)}
          options={
            users?.map((user: any) => ({
              value: user?.profile?._id,
              label: user?.profile?.firstName,
              children: user?.profile?.firstName,
            })) || []
          }
          onClear={handlefnameClear}
          onChange={handlefnameSearch}
          filterOption={(input: any, option: any) =>
          //option?.children?.toLowerCase().indexOf(input?.toLowerCase()) >= 0
          {
            return option?.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }
          }
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Col>
      <Col span={4} style={{marginRight:"5px"}}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Last Name"
          value={userNameFilter(filters.lname)}
          options={
            users?.map((user: any) => ({
              value: user?.profile?._id,
              label: user?.profile?.lastName,
              children: user?.profile?.lastName,
            })) || []
          }
          onClear={handlelnameClear}
          onChange={handlelnameSearch}
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
      </Col> */}
    </>
  );
};

export default UsersFilter;
