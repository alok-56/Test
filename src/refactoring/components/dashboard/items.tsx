import {
  TeamOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";

export const cardData = [
  {
    icon: (
      <VerticalAlignBottomOutlined
        style={{
          fontSize: 28,
          backgroundColor: "rgba(218,165,32,0.2)",
          color: "goldenrod",
          padding: 5,
        }}
      />
    ),
    title: "Submissions",
    value: "12345",
    link: "/v1/submissions",
    growth: "20",
    key: "submissions",
  },
  {
    icon: (
      <TeamOutlined
        style={{
          fontSize: 28,
          backgroundColor: "rgba(0,128,0,0.2)",
          color: "green",
          padding: 5,
        }}
      />
    ),
    title: "Interviews",
    value: "12345",
    link: "/v1/interview",
    growth: "20",
    key: "interviews",
  },
  {
    icon: (
      <UsergroupAddOutlined
        style={{
          fontSize: 28,
          backgroundColor: "rgba(128,0,128,0.2)",
          color: "purple",
          padding: 5,
        }}
      />
    ),
    title: "Recruiters",
    value: "12345",
    link: "/v1/recruiters",
    growth: "20",
    key: "recruiters",
  },
  {
    icon: (
      <UserSwitchOutlined
        style={{
          fontSize: 28,
          backgroundColor: "rgba(218,165,32,0.2)",
          color: "goldenrod",
          padding: 5,
        }}
      />
    ),
    title: "Vendors",
    value: "12345",
    link: "/v1/vendors",
    growth: "20",
    key: "vendors",
  },
];
