import { useLocation,  } from "react-router-dom";
import {
  Image,
  Layout,

} from "antd";

import TLogo from "../../../assets/thinklusive.png";


import "../../../components/Headers/Headers.css"


import { LOGIN_URL } from "../../../urlConfig";

const { Header } = Layout;

const ThinklusiveLogo: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;


  if (pathname == LOGIN_URL) {
    return ;
  }




  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:"#fff"
        }}
      >



            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1px",
              }}
            >
              <Image
                src={TLogo}
                alt="main logo"
                style={{ width: 197, height: 50 }}
                preview={false}
              />
            </div>
  
          




      </Header>
    </div>
  );
};

export default ThinklusiveLogo;
