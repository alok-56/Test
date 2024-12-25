import React, { useEffect, useState } from "react";
import { Col, Button } from "antd";
import AppConstants from "../shared/constants";

interface HotlistFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const HotlistFilter: React.FC<HotlistFiltersProps> = ({ onFiltersChange }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("P1");
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    onFiltersChange(filter);
  };

  useEffect(() => {
    handleFilterChange(AppConstants.Priority[0].value);
  }, []);
  
  return (
    <>
      <Col>
        {AppConstants.Priority.map((option) => (
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
    </>
  );
};

export default HotlistFilter;
