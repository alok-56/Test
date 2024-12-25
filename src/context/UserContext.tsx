import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useGet from "../refactoring/hooks/useGet";
import UserService from "../refactoring/services/UserService";
import TokenService from "../refactoring/services/shared/TokenService";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LOGIN_URL } from "../urlConfig";

export interface User {
  userData: any;
  email?: string;
  //password: string;
  isAdmin?: boolean;
}

// Define the context type
interface UserContextType {
  user: any | null;
  isAdmin: boolean;
  checkTokenAndGetUser: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isUploadAllowed: boolean;
  setIsUploadAllowed: (allowed: boolean) => void;
  authRole:string;
  loading:boolean;
}

const tokenService = TokenService;
// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { fetchData, data: user, loading } = useGet();
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isUploadAllowed, setIsUploadAllowed] = useState(false);

  const checkTokenAndGetUser = async () => {
    const id = tokenService.decodeToken()?.id;
    if (id) {
      const userService = new UserService();
      const user = await fetchData(userService.getUserById(id));
      return user;
    } else {
      navigate(LOGIN_URL);
    }
  };

  useEffect(() => {
    checkTokenAndGetUser();
  }, []);

  const authRole = user?.profile?.authRole|| user?.[0]?.profile?.authRole || null;
  const isAdmin = authRole === "admin" || false;
  if (loading || !user) {
    <Spin spinning={true} size="large" >Loading ...</Spin>;
  }

  return (
    <UserContext.Provider
      value={{
        user: user?.[0] || user,
        isAdmin,
        checkTokenAndGetUser,
        sidebarCollapsed,
        setSidebarCollapsed,
        isUploadAllowed,
        setIsUploadAllowed,
        authRole,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
