import React, { useEffect,  } from "react";
import {
  Form,
  Spin,
  message,
  Drawer,
  Button,
  

} from "antd";
import DynamicFormBuilder from "../shared/Form";

import usePost from "../../hooks/usePost";

import { addingUser } from "./columns";
import HiringService from "../../services/HiringService";
import useGet from "../../hooks/useGet";
import { formatCreateHiringUser } from "./helper.tsx";
import UserService from "../../services/UserService.ts";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { MoreOutlined } from "@ant-design/icons";


const hiring = new HiringService();
const userService = new UserService();
interface AddingUserProps {
  selectedHiring:any;
  isAddVisible:boolean;
setIsAddVisible:any;
}
const AddingUser: React.FC<AddingUserProps> = ({selectedHiring,isAddVisible,setIsAddVisible}) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { postData, loading: creating } = usePost();
  const { fetchData: fetchSelectedHiring, data } = useGet();
  //const [isVisible, setIsVisible] = useState(false);

  const handleModal = async (e: any) => {
    e.stopPropagation();
    setIsAddVisible(true)

  };
  const handleModalCancel = () => {
    setIsAddVisible(false);
  };

  const getHiringSelected = async () => {
    if (selectedHiring?._id) {
      await fetchSelectedHiring(hiring.getSelectedHiring(selectedHiring?._id));
    }
  };

  useEffect(() => {
    if(isAddVisible &&selectedHiring?._id){
      getHiringSelected();
    }
  }, [isAddVisible,selectedHiring?._id]);
  
  const handleSubmitRecruitment = async () => {
    await form.validateFields();
    try {
      const payload = await formatCreateHiringUser(
        form.getFieldsValue(),
        data?.data
      );
      await postData(userService.createUser(), payload);
      form.resetFields();
      message.success("User Created successfully");
      setIsAddVisible(false);
      navigate("/v1/users");
    } catch (err: any) {
    }
  };

  return (
    <div>
      <Button
        type="text"
        shape="circle"
        icon={<MoreOutlined />}
        ref={(ref) => {
          if (!ref) return;

          ref.onclick = (e) => {
            handleModal(e);
          };
        }}
      />

      <Drawer
        title="User Credentials"
        open={isAddVisible}
        onClose={handleModalCancel}
        maskClosable={false}
        footer={[
          <Button
            key="cancel"
            onClick={handleModalCancel}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>,

          <Button key="add" type="primary" onClick={handleSubmitRecruitment}>
            Add User
          </Button>,
        ]}
        width={"30%"}
      >
        <Spin spinning={creating}>
          <Form
            form={form}
            name="User"
            initialValues={{
              authRole: "user",
              active: true,
              marketingStartDate:dayjs(),
              guestHouseDate:dayjs()
            }}
            layout="vertical"
          >
            {/* <Steps
              direction="vertical"
              items={[ 
                 {
                  title: "User Credentials",
                  status: "process",
                  description: (
                    <Space direction="vertical">
                     */}
                      <DynamicFormBuilder
                        fields={addingUser}
                        form={form}
                        columns={1}
                      />
                    {/* </Space>
                  ),
                },
              ]}
            /> */}
          </Form>
        </Spin>
      </Drawer>
    </div>
  );
};

export default AddingUser;
