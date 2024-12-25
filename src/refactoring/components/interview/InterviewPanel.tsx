import React from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

interface InterviewPanelDetailsProps {
  panel: any[];
}

const InterviewPanelDetails: React.FC<InterviewPanelDetailsProps> = ({
  panel,
}) => {
  return (
    <div>
      {panel.map((panelItem: any, index: number) => (
        <>
          <Paragraph>Panel{index + 1}</Paragraph>
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Paragraph>Name</Paragraph>
              <Paragraph type="secondary">{panelItem.name || "---"}</Paragraph>
            </div>
            <div>
              <Paragraph>Email</Paragraph>
              <Paragraph type="secondary">
                {panelItem.mailID || "---"}
              </Paragraph>
            </div>
            <div>
              <Paragraph>LinkedIn</Paragraph>
              <Paragraph type="secondary">
                {panelItem.linkedinID || "---"}
              </Paragraph>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default InterviewPanelDetails;
