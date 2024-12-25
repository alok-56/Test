import React, { useEffect, useState } from "react";
import { ISubmissionData,  localHost, localIp } from "../../utils";
import {
  Button,
  Col,
  DatePicker,
  FloatButton,
  Form,
  Modal,
  Row,
  Select,
} from "antd";
import { useUser } from "../../context/UserContext";

import { FilterTwoTone } from "@ant-design/icons";
import axiosInstance from "../../refactoring/services/shared/AxiosService";


interface SubmissionFiltersProps {
  onFiltersApplied: (filteredData: ISubmissionData[]) => void;
}

const SubmissionFilters: React.FC<SubmissionFiltersProps> = ({
  onFiltersApplied,
}) => {

  const { isAdmin } = useUser();

  const [isVisible, setIsVisible] = useState(false);

  const [submittedBySuggestions, setSubmittedBySuggestions] = useState<any[]>(
    []
  );
  const [selectedSubmittedBy, setSelectedSubmittedBy] = useState<string[]>([]);

  const [candidateNameSuggestions, setCandidateNameSuggestions] = useState<
    any[]
  >([]);
  const [selectedCandidateName, setSelectedCandidateName] = useState<string[]>(
    []
  );

  const [statusSuggestions, setStatusSuggestions] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const [selectedDays, setSelectedDays] = useState<string | undefined>(
    undefined
  );
  const [rowData, setRowData] = useState<ISubmissionData[]>([]);
  const [isDateVisible, setIsDateVisible] = useState<any>(false);
  const [fromDate, setFromDate] = useState<any>("");
  const [toDate, setToDate] = useState<any>("");

  useEffect(() => {
    const fetchSubmissionFilter = async () => {
      try {
        const response = await axiosInstance.get(
          `http://${localHost}:${localIp}/api/v1/submission`
        );
        const submissionDetails = response.data;

        const uniqueSubmittedByValues = Array.from(
          new Set(
            submissionDetails.map(
              (submission: any) => submission.subDetails.salesRecruiter
            )
          )
        );

        setSubmittedBySuggestions(uniqueSubmittedByValues);

        const uniqueCandidateNames = Array.from(
          new Set(
            submissionDetails.map(
              (submission: any) => submission.subDetails.profile.name
            )
          )
        );
        setCandidateNameSuggestions(uniqueCandidateNames);

        const uniqueStatusValues = Array.from(
          new Set(
            submissionDetails.map(
              (submission: any) => submission.subDetails.status
            )
          )
        );
        setStatusSuggestions(uniqueStatusValues);

        // const uniqueDates = Array.from(
        //   new Set(
        //     submissionDetails.map((submission: any) =>
        //       new Date(submission.subDetails.date).toLocaleDateString("en-US")
        //     )
        //   )
        // );
        // setSelectedDate(uniqueDates);

        setRowData(submissionDetails);

      } catch (error: any) {
        console.error("Error fetching Submission details:", error);
      }
    };

    fetchSubmissionFilter();
  }, []);

  const handleFiltersButtonClick = () => {
    setIsVisible(true);
  };

  const handleFiltersModalOk = async () => {
    try {
      const filters: any = {};

      if (selectedSubmittedBy.length > 0) {
        filters.recruiter = selectedSubmittedBy[selectedSubmittedBy.length - 1];
      }

      if (isAdmin) {
        if (selectedCandidateName.length > 0) {
          filters.name =
            selectedCandidateName[selectedCandidateName.length - 1];
        }
      }

      if (selectedStatus.length > 0) {
        filters.status = selectedStatus[selectedStatus.length - 1];
      }

      // if (selectedDays) {
      //   filters.selectedDays = selectedDays;
      // }

      if (fromDate && toDate) {
        const fromDateEpoch = new Date(fromDate).getTime();
        const toDateEpoch = new Date(toDate).getTime();

        filters.fromDate = fromDateEpoch;
        filters.toDate = toDateEpoch;
      }

      const queryParams = new URLSearchParams(filters).toString();

      const response = await axiosInstance.get(
        `http://${localHost}:${localIp}/api/v1/submission?${queryParams}`
      );
      const filteredData = response.data;
      onFiltersApplied(filteredData);
    } catch (error) {
      console.error("Error applying filters:", error);
    }

    setIsVisible(false);
  };

  const handleSubmittedByChange = (value: string) => {
    setSelectedSubmittedBy([...selectedSubmittedBy, value]);
    // if (typeof value === "string") {
    //   setSelectedSubmittedBy(value);
    // } else {
    //   setSelectedSubmittedBy(value.join(","));
    // }
  };

  const handleCandidateNameChange = (value: string) => {
    setSelectedCandidateName([...selectedCandidateName, value]);
    // if (typeof value === "string") {
    //   setSelectedCandidateName(value);
    // } else {
    //   setSelectedCandidateName(value.join(","));
    // }
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus([...selectedStatus, value]);
    // if (typeof value === "string") {
    //   setSelectedStatus(value);
    // } else {
    //   setSelectedStatus(value.join(","));
    // }
  };

  const handleFiltersModalCancel = () => {
    setSelectedSubmittedBy([]);
    setSelectedCandidateName([]);
    setSelectedStatus([]);
    setFromDate("");
    setToDate("");
    setSelectedDays("");

    setRowData(rowData)
    setIsVisible(false);
  };

  const handleDateChange = (value: string) => {
    if (value === "custom") {
      setIsDateVisible(true);
    } else {
      setIsDateVisible(false);

      const today = new Date();
      const fromDate = new Date(today);
      const toDate = new Date(today);
      const selectedDays = parseInt(value);

      fromDate.setDate(today.getDate() - selectedDays);

      toDate.setDate(today.getDate() + 1);

      const fromDateFormatted = fromDate.toISOString().slice(0, 10);
      const toDateFormatted = toDate.toISOString().slice(0, 10);

      setFromDate(fromDateFormatted);
      setToDate(toDateFormatted);
      setSelectedDays(value);
    }
  };

  return (
    <div>
      <FloatButton
        onClick={handleFiltersButtonClick}
        icon={<FilterTwoTone />}
      />
      <Modal
        title="Filters"
        open={isVisible}
        onCancel={handleFiltersModalCancel}
        footer={[
          <Button key="back" onClick={handleFiltersModalCancel}>
            Clear
          </Button>,
          <Button key="submit" type="primary" onClick={handleFiltersModalOk}>
            Apply
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12}>
              <Form.Item label="Date">
                <Select
                  placeholder="Select Date"
                  onChange={handleDateChange}
                  value={selectedDays}
                >
                  <Select.Option key="1" value="1">
                    Last day
                  </Select.Option>
                  <Select.Option key="7" value="7">
                    Last 7 days
                  </Select.Option>
                  <Select.Option key="10" value="10">
                    Last 10 days
                  </Select.Option>
                  <Select.Option key="20" value="20">
                    Last 20 days
                  </Select.Option>
                  <Select.Option key="30" value="30">
                    Last 30 days
                  </Select.Option>
                  <Select.Option key="custom" value="custom">
                    custom
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>

            {isDateVisible && (
              <>
                <Col xs={24} sm={12}>
                  <Form.Item label="From Date">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={(dateString) => setFromDate(dateString)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item label="To Date">
                    <DatePicker
                      style={{ width: "100%" }}
                      onChange={( dateString) => setToDate(dateString)}
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col xs={24} sm={12}>
              <Form.Item label="Submitted By">
                <Select
                  mode="multiple"
                  placeholder="Select Submitted By"
                  onChange={handleSubmittedByChange}
                  //value={selectedSubmittedBy}
                >
                  {submittedBySuggestions.map((suggestion, index) => (
                    <Select.Option key={index} value={suggestion}>
                      {suggestion}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            {isAdmin && (
              <Col xs={24} sm={12}>
                <Form.Item label="Candidate Name">
                  <Select
                    mode="multiple"
                    placeholder="Select Candidate Name"
                    onChange={handleCandidateNameChange}
                    //value={selectedCandidateName}
                  >
                    {candidateNameSuggestions.map((suggestion, index) => (
                      <Select.Option key={index} value={suggestion}>
                        {suggestion}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            )}
            <Col xs={24} sm={12}>
              <Form.Item label="Status">
                <Select
                  mode="multiple"
                  placeholder="Select Status"
                  onChange={handleStatusChange}
                  //value={selectedStatus}
                >
                  {statusSuggestions.map((suggestion, index) => (
                    <Select.Option key={index} value={suggestion}>
                      {suggestion}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default SubmissionFilters;
