import { useMemo } from "react";
import { Steps } from "antd";
import moment from "moment";

const dateTimeFormatter = (params: any) => {
  const timestampInSeconds = params;
  const date = moment.unix(timestampInSeconds).format("DD MMM, YYYY");
  return date;
};

const Stepper = ({ steps, onStepperItemClick }: any) => {
  const items = useMemo(
    () =>
      steps?.map((step: any) => ({
        title: step.status,
        description: step.comments,
        subTitle: dateTimeFormatter(step.auditInfo.createdDate),
        status: "finish",
      })),
    [steps]
  );
  return (
    <Steps
      onChange={(index) => onStepperItemClick(steps[index])}
      direction="vertical"
      size="small"
      current={steps.length}
      items={items}
    />
  );
};
export default Stepper;
