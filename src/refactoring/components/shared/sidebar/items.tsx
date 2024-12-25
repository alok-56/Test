import {
  AppstoreOutlined,
  BookFilled,
  BookOutlined,
  CodeSandboxOutlined,
  ContactsOutlined,
  FireOutlined,
  FolderAddOutlined,
  HistoryOutlined,
  IdcardOutlined,
  ProfileOutlined,
  ReconciliationOutlined,
  RobotOutlined,
  ScanOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useUser } from "../../../../context/UserContext";
import { moduleAccess } from "../RoleAccessModules";


interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  children?: MenuItem[];
}


const getAllowedModules = (authRole: string | null): string[] => {
  const roleAccess = moduleAccess.find((access) => access.role === authRole);
  return roleAccess ? roleAccess.allowedModules : [];
};

const removePrefix = (key: string): string => key.replace(/^\/v1\//, "");
export const getSidebarItems = (): MenuItem[] => {
  const { authRole } = useUser();
  const allowedItems = getAllowedModules(authRole);
  const allMenuItems: MenuItem[] = [
    {
      key: "/v1/dashboard",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
    },
    {
      key: "/v1/thinkai",
      icon: <RobotOutlined />,
      label: "ThinkAI",
    },
    {
      key: "/v1/hiring",
      icon: <HistoryOutlined />,
      label: "Hiring",
    },
    {
      key: "/v1/training",
      icon: <BookOutlined />,
      label: "IT Training",
    },
    {
      key: "/v1/it_terminology",
      icon: <BookFilled />,
      label: "IT Terminology",
    },
    {
      key: "/v1/submissions",
      icon: <FolderAddOutlined />,
      label: "Submissions",
    },

    {
      key: "/v1/users",
      icon: <UserAddOutlined />,
      label: "Users",
    },

    {
      key: "/v1/clients",
      icon: <IdcardOutlined />,
      label: "Clients",
    },
    {
      key: "/v1/vendors",
      icon: <UserSwitchOutlined />,
      label: "Vendors",
    },
    {
      key: "/v1/recruiters",
      icon: <UsergroupAddOutlined />,
      label: "Recruiters",
    },
    {
      key: "/v1/interview",
      icon: <TeamOutlined />,
      label: "Interview",
    },
    {
      key: "/v1/interview_preparation",
      icon: <CodeSandboxOutlined />,
      label: "Interview Preparation",
    },

    {
      key: "/v1/resume_analyzer",
      icon: <ScanOutlined />,
      label: "Resume Analyzer",
    },
    {
      key: "/v1/hotlist",
      icon: <FireOutlined />,
      label: "HotList",
    },
    {
      key: "/v1/recruitment",
      icon: <FolderAddOutlined />,
      label: "Recruitment",
      children: [
        {
          key: "/v1/recruitment",
          icon: <ProfileOutlined />,
          label: "Recruitment",
        },
        {
          key: "/v1/recruitment/submission",
          icon: <FolderAddOutlined />,
          label: "Submission",
        },
      ],
    },
    {
      key: "/v1/resources",
      icon: <ReconciliationOutlined />,
      label: "Resources",
      children: [
        {
          key: "/v1/contacts",
          icon: <ContactsOutlined />,
          label: "Contacts",
        },
      ],
    },
  ];

  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items
      .map((item) => {
        const keyWithoutPrefix = removePrefix(item.key);
        const isMainItemAllowed = allowedItems.includes(keyWithoutPrefix);

        if (isMainItemAllowed) {
          // If the main item is allowed, return it with all subitems
          return { ...item, children: item.children?.map(child => ({
            ...child,
            children: child.children ? filterMenuItems(child.children) : undefined
          })) };
        } else {
          // If the main item is not allowed, check subitems
          const allowedSubitems = item.children?.filter(child => allowedItems.includes(removePrefix(child.key))) || [];

          if (allowedSubitems.length > 0) {
            // If there are allowed subitems, return the main item with allowed subitems
            return { ...item, children: allowedSubitems };
          }

          return null; // Exclude the item if neither it nor its subitems are allowed
        }
      })
      .filter((item) => item !== null) as MenuItem[];
  };

  return filterMenuItems(allMenuItems);
};
