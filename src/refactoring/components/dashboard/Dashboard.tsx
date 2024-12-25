import React, { useEffect, useState } from "react";
import { Col, DatePicker, Row, Select, Typography } from "antd";
import Cards from "./Cards";
import { cardData } from "./items";
import useGet from "../../hooks/useGet";
import DashboardService from "../../services/DashboardService";
import dayjs from "dayjs";
import type { TimeRangePickerProps } from "antd";
import UserService from "../../services/UserService";
import { UserOutlined } from "@ant-design/icons";
import AppUtils from "../../utils/AppUtils";
import GraphCard from "./GraphCard";
const { Title } = Typography;
const { RangePicker } = DatePicker;

const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];

type initialFilters = {
  fromDate: number;
  toDate: number;
  cid: string;
};

const userService = new UserService();
const dashboard = new DashboardService();

const initialFilters = {
  fromDate: "",
  toDate: "",
  cid: null,
};

const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<any>(initialFilters);

  const [recruitersData, setRecruitersData] = useState<any[]>([]);
  const [overviewData, setOverviewData] = useState<any[]>([]);

  const [usersData, setUsersData] = useState<any[]>([]);
  const [summaryData, setSummaryData] = useState<any>("");

  const { fetchData, loading } = useGet();

  useEffect(() => {
    getRecruitersChartDetails();
    getOverviewDetails();
  }, [filters]);

  useEffect(() => {
    getUserData();
    getSummaryData();
  }, []);

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

  const handleSearch = (value: string) => {
    if (value) {
      setFilters((prev: any) => ({ ...prev, cid: value }));
    }
  };

  const handleClearSearch = () => {
    setFilters((prev: any) => ({ ...prev, cid: null }));
  };

  const handleClearFilters = async () => {
    setFilters(initialFilters);
  };

  const getRecruitersChartDetails = async () => {
    const res = await fetchData(dashboard.getRecruiters(filters));
    setRecruitersData(res);
  };

  const getOverviewDetails = async () => {
    const res = await fetchData(dashboard.getOverview(filters));
    setOverviewData(res);
  };

  const getSummaryData = async () => {
    const res = await fetchData(dashboard.getSummary());
    setSummaryData(res.data);
  };

  const getUserData = async () => {
    const res = await fetchData(userService.getUsersOnlyByProject());
    setUsersData(res);
  };

  return (
    <div>
      <title>Thinklusive Dashboard</title>

      <Title level={4} style={{ marginTop: 0 }}>
        Dashboard
      </Title>

      <Row gutter={16}>
        {cardData.map((card, index) => {
          const { total, filterData } = summaryData[card.key] || {};
          return (
            <Cards
              key={index}
              title={card.title}
              icon={card.icon}
              value={total}
              link={card.link}
              growth={filterData}
            />
          );
        })}
      </Row>

      <Col>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 30,
            marginBottom: 8,
          }}
        >
          <div style={{ width: "200px", marginRight: 6 }}>
            <Select
              showSearch
              value={filters.cid}
              allowClear
              notFoundContent={null}
              suffixIcon={<UserOutlined />}
              style={{ width: "100%" }}
              placeholder="User"
              options={
                usersData?.map((user) => ({
                  value: user?.profile?._id,
                  label: user?.profile?.firstName,
                  children: user?.profile?.firstName,
                })) || []
              }
              onClear={handleClearSearch}
              onChange={handleSearch}
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </div>
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
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <GraphCard
              title="Submissions"
              data={overviewData}
              loading={loading}
              handleClearFilters={handleClearFilters}
            />
          </Col>
          <Col span={12}>
            <GraphCard
              title="Recruiters"
              data={recruitersData}
              loading={loading}
              handleClearFilters={handleClearFilters}
            />
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default Dashboard;
