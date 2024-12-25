import React, { useMemo } from "react";
import { Button, Col, Select, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { maxTagPlaceholder, sharedProps } from "../../utils/CustomButton";

const { Text } = Typography;

interface GlossaryFilterProps {
  tags: any;
  keywords: any;
  technologies: any;
  filters: any;
  setFilters: any;
  onClearFilter: () => void;
}
const GlossaryFilter: React.FC<GlossaryFilterProps> = ({
  filters,
  setFilters,
  onClearFilter,
  tags,
  keywords,
  technologies,
}) => {
  const handleTagsClear = () => {
    setFilters((prev: any) => ({ ...prev, tags: undefined }));
  };

  const handleTagsSearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, tags: value }));
  };

  const handleTechnologyClear = () => {
    setFilters((prev: any) => ({ ...prev, technology: undefined }));
  };

  const handleTechnologySearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, technology: value }));
  };

  const handleKeyClear = () => {
    setFilters((prev: any) => ({ ...prev, key: undefined }));
  };

  const handleKeySearch = (value: string) => {
    setFilters((prev: any) => ({ ...prev, key: value }));
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
          placeholder="Keyword"
          value={filters.key}
          options={
            keywords?.data?.map((name: string) => ({
              label: name,
              value: name,
            })) || []
          }
          onClear={handleKeyClear}
          onChange={handleKeySearch}
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
          placeholder="Technology"
          value={filters.technology}
          options={
            technologies?.data?.map((name: string) => ({
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
      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Tags"
          value={filters.tags}
          options={
            tags?.data?.map((name: string) => ({ label: name, value: name })) ||
            []
          }
          onClear={handleTagsClear}
          onChange={handleTagsSearch}
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

export default GlossaryFilter;
