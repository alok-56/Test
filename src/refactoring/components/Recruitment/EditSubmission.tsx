import { Button } from "antd";

const ClonedEditButtonRenderer = (props: any) => {
  const handleClick = () => {
    const { setIsViewTable, setIsEditData, user } = props.context;
    const submittedBy = props?.data?.submittedBy;
    const matchingUser = user.find(
      (u: any) =>
        `${u?.profile?.firstName} ${u?.profile?.lastName}` === submittedBy
    );
    let newData = { ...props.data };
    if (matchingUser) {
      newData = { ...newData, submittedBy: matchingUser?.profile._id };
    }
    setIsViewTable(false);
    setIsEditData(newData);
  };
  return (
    <div>
      <Button onClick={handleClick}>Edit</Button>
    </div>
  );
};

export default ClonedEditButtonRenderer;
