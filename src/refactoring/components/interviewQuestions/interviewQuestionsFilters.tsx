import React, { useMemo } from "react";
import { Button, Col, Select, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import AppConstants from "../shared/constants";
import { maxTagPlaceholder, sharedProps } from "../../utils/CustomButton";

const { Text } = Typography;

interface InterviewQuestionsFiltersProps {
  clientsData: any[];
  vendorsData: any[];
  filters: any;
  setFilters: any;
  onClearFilter: () => void;
  tags: any[];
  positionsData: any;
}
const InterviewQuestionsFilter: React.FC<InterviewQuestionsFiltersProps> = ({
  clientsData,
  vendorsData,
  filters,
  setFilters,
  onClearFilter,
  tags,
  positionsData,
}) => {
  const handleClientClear = () => {
    setFilters((prev: any) => ({ ...prev, client: undefined }));
  };
  const handleVendorClear = () => {
    setFilters((prev: any) => ({ ...prev, vendor: undefined }));
  };
  const handleRoundClear = () => {
    setFilters((prev: any) => ({ ...prev, round: undefined }));
  };

  const handleTagsClear = () => {
    setFilters((prev: any) => ({ ...prev, tags: undefined }));
  };

  const handlePositionsClear = () => {
    setFilters((prev: any) => ({ ...prev, position: undefined }));
  };

  const handlePositionSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, position: value }));
  };
  const handleClientSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, client: value }));
  };
  const handleVendorSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, vendor: value }));
  };

  const handleTagsSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, tags: value }));
  };

  const handleRoundSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, round: value }));
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
          placeholder="Client"
          value={filters.client}
          options={
            clientsData?.map((client: any) => ({
              value: client?.name,
              label: client?.name,
              children: client?.name,
            })) || []
          }
          onClear={handleClientClear}
          onChange={handleClientSearch}
          filterOption={(input: any, option: any) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          placeholder="Vendor"
          value={filters.vendor}
          options={
            vendorsData?.map((vendor: any) => ({
              value: vendor?.name,
              label: vendor?.name,
              children: vendor?.name,
            })) || []
          }
          onClear={handleVendorClear}
          onChange={handleVendorSearch}
          filterOption={(input: any, option: any) =>
            option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        />
      </Col>

      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          style={{ width: "100%" }}
          allowClear
          placeholder="Round"
          value={filters.round}
          options={
            AppConstants.StatusList?.map((status: any) => ({
              value: status.value,
              label: status.label,
            })) || []
          }
          onClear={handleRoundClear}
          onChange={handleRoundSearch}
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
          placeholder="Tags"
          value={filters.tags}
          options={tags.map((tag) => ({
            value: tag,
            label: tag,
          }))}
          onClear={handleTagsClear}
          onChange={handleTagsSearch}
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
          placeholder="Positions"
          value={filters.position}
          options={
            positionsData?.data?.map((name: string) => ({
              label: name,
              value: name,
            })) || []
          }
          onClear={handlePositionsClear}
          onChange={handlePositionSearch}
          {...sharedProps}
          maxTagPlaceholder={maxTagPlaceholder}
        ></Select>
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

export default InterviewQuestionsFilter;
