import React, { useMemo } from "react";
import { Button, Col, Select, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { maxTagPlaceholder, sharedProps } from "../../utils/CustomButton";

const { Text } = Typography;

interface RecruitmentSubmissionFilterProps {
  visa: any;
  filters: any;
  setFilters: any;
  onClearFilter: () => void;
  candidateNames: any;
  employers:any;
  technology: any;
  status:any;
  userStatus:any;
}
const RecruitmentSubmissionFilter: React.FC<
  RecruitmentSubmissionFilterProps
> = ({
  visa,
  filters,
  setFilters,
  onClearFilter,
  candidateNames,
  employers,
  technology,
  status,
  userStatus
}) => {
  const handleVisaClear = () => {
    setFilters((prev: any) => ({ ...prev, visa: undefined }));
  };

  const handleVisaSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, visa: value }));
  };

  const handleEmployerClear = () => {
    setFilters((prev: any) => ({ ...prev, employer: undefined }));
  };

  const handleEmployerSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, employer: value }));
  };

  const handleTechnologyClear = () => {
    setFilters((prev: any) => ({ ...prev, technology: undefined }));
  };
  const handleStatusClear = () => {
    setFilters((prev: any) => ({ ...prev, status: undefined }));
  };

  const handleUserStatusClear = () => {
    setFilters((prev: any) => ({ ...prev, userStatus: undefined }));
  };

  const handleUserStatusSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, userStatus: value }));
  };


  const handleStatusSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, status: value }));
  };

  const handleTechnologySearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, technology: value }));
  };

  const handleCandidateNameClear = () => {
    setFilters((prev: any) => ({ ...prev, candidateName: undefined }));
  };

  const handleCandidateNameSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, candidateName: value }));
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
      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Candidate Name"
          value={filters.candidateName}
          options={
            candidateNames?.data?.map((name: string) => ({
              label: name,
              value: name,
            })) || []
          }
          onClear={handleCandidateNameClear}
          onChange={handleCandidateNameSearch}
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Col>
      <Col span={3}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Employer"
          value={filters.employer}
          options={
            employers?.data?.map((name: string) => ({
              label: name,
              value: name,
            })) || []
          }
          onClear={handleEmployerClear}
          onChange={handleEmployerSearch}
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Col>
      <Col span={3}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Technology"
          value={filters.technology}
          options={
            technology?.data?.map((name: string) => ({
              label: name,
              value: name,
            })) || []
          }
          onClear={handleTechnologyClear}
          onChange={handleTechnologySearch}
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Col>
      <Col span={3}>
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
      <Col span={3}>
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
      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Open To Work"
          value={filters.userStatus}
          options={userStatus}
          onClear={handleUserStatusClear}
          onChange={handleUserStatusSearch}
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
          icon={<CloseOutlined />}
        >
          Clear
        </Button>
      </Col>
    </>
  );
};

export default RecruitmentSubmissionFilter;
