import React, { useMemo } from "react";
import {
  Button,
  Row,
  Col,
  Select,
  Typography,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { maxTagPlaceholder, sharedProps } from "../../utils/CustomButton";


const { Text } = Typography;



interface RecruiterFilter {
  companies: { data: string[] }; 
  technologies: { data: string[] }; 
  filters: any; 
  setFilters: (filters: any) => void; 
  onClearFilter: () => void; 
}

const RecruiterFilter: React.FC<RecruiterFilter> = ({
  companies = { data: [] },
  technologies = { data: [] },
  filters,
  setFilters,
  onClearFilter,
}) => {
  const handleCompanySearch = (value: string[]) => {
    setFilters((prev: any) => ({ ...prev, company_name: value }));
  };

  const handleTechnologySearch = (value: string[]) => {
    setFilters((prev: any) => ({ ...prev, technology: value }));
  };

  const handleCompanyClear = () => {
    setFilters((prev: any) => ({ ...prev, company_name: undefined }));
  };

  const handleTechnologyClear = () => {
    setFilters((prev: any) => ({ ...prev, technology: undefined }));
  };

  const disabled = useMemo(
    () => Object.values(filters).some((key) => key),
    [filters]
  );
   
  const companyOptions = Array.isArray(companies?.data) 
    ? companies.data.map((company) => ({
        value: company, // Use a unique identifier if available
        label: company,
      })) 
    : [];

    const technologyOptions = Array.isArray(technologies?.data) 
    ? technologies.data.map((technology) => ({
        value: technology, // Use a unique identifier if available
        label: technology,
      }))
    : [];
  

  return (
    
    <Row gutter={4} justify="end">
      <Col>
        <Text type="secondary">FILTER BY</Text>
      </Col>
      <Col span={4}>
        <Select
          mode="multiple"
          showSearch
          allowClear
          style={{ width: "100%" }}
          placeholder="Vendor"
          value={filters.company_name}
          options= {companyOptions}
          onClear={handleCompanyClear}
          onChange={handleCompanySearch}
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
          options={technologyOptions
          }
          onClear={handleTechnologyClear}
          onChange={handleTechnologySearch}
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
    </Row>
  );
};

export default RecruiterFilter;
