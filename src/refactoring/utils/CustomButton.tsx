import {
  Button,
  Col,
  Image,
  Popconfirm,
  Row,
  SelectProps,
  Switch,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import CustomCellRenderer from "./CustomCell";
import videoCoding from "../../assets/video+coding.png";
import video from "../../assets/video.png";
import online from "../../assets/online.png";

const { Text } = Typography;

const CloneButtonRenderer = (props: any) => {
  let editingCells = props.api.getEditingCells();
  let isCurrentRowEditing = editingCells.some((cell: any) => {
    return cell.rowIndex === props.node.rowIndex;
  });

  const onEdit = () => {
    props.api.startEditingCell({
      rowIndex: props.node.rowIndex,
      colKey: props.api.getDisplayedCenterColumns()[0].colId,
    });
  };

  const onDelete = () => {
    props.api.applyTransaction({
      remove: [props.node.data],
    });
  };

  const onCancel = () => {
    props.api.stopEditing(true);
  };

  const onUpdate = () => {
    props.api.stopEditing(false);
  };

  return (
    <div>
      <Row gutter={[8, 16]}>
        {isCurrentRowEditing ? (
          <>
            <Col>
              <Tooltip title="Save">
                <Button
                  onClick={onUpdate}
                  id="update"
                  shape="circle"
                  type="primary"
                  size="middle"
                  icon={<CheckOutlined />}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Cancel">
                <Button
                  onClick={onCancel}
                  id="cancel"
                  shape="circle"
                  size="middle"
                  icon={<CloseOutlined />}
                />
              </Tooltip>
            </Col>
          </>
        ) : (
          <>
            <Col>
              <Tooltip title="Edit">
                <Button
                  onClick={onEdit}
                  id="edit"
                  shape="circle"
                  icon={<EditOutlined />}
                  size="middle"
                  itemProp="data-action=edit"
                />
              </Tooltip>
            </Col>
            <Col>
              <Popconfirm
                title="Are you sure ?"
                description="To delete this user from hotlist."
                onConfirm={onDelete}
                okText="Delete"
                cancelText="Cancel"
              >
                <Tooltip title="Delete">
                  <Button
                    danger
                    shape="circle"
                    size="middle"
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Popconfirm>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default CloneButtonRenderer;

export const CustomButtonComponent = () => {
  return (
    <Button
      onClick={() =>
        window.window.confirm("Are you sure you want to delete this user?")
      }
    >
      Delete
    </Button>
  );
};

export const CustomPriorityComponent = (params: any) => {
  const { color, capitalizedValue } = CustomCellRenderer.renderPriority(
    params.value
  );
  return <Tag color={color}>{capitalizedValue}</Tag>;
};


export const CustomReviewComponent = (params: any) => {
  const { color, capitalizedValue } = CustomCellRenderer.reviewStatus(
    params?.value||params
  );
  if(capitalizedValue==="[object Object]"){
    return <Text type="secondary">---</Text>
  }

  return <Tag color={color}>{capitalizedValue}</Tag>;
};

export const CustomDifficultyComponent = (params: any) => {
  const { color, capitalizedValue } =
    CustomCellRenderer.renderDifficultyLevel(params);
  return <Tag color={color}>{capitalizedValue}</Tag>;
};

export const CustomTagsComponent = (params: any) => {
  if (!params) {
    return <Text type="secondary">-</Text>;
  }

  return (
    <>
      {params.map((tag: string, index: number) => {
        const { color, capitalizedValue } =
          CustomCellRenderer.renderCompanyName(tag);
        return (
          <Tag key={index} color={color}>
            {capitalizedValue}
          </Tag>
        );
      })}
    </>
  );
};

export const CustomDobComponent = (params: any) => {
  const { color, year } = CustomCellRenderer.renderDateOfBirth(params.value);
  return <Tag color={color}>{year}</Tag>;
};

export const CustomWAAuthComponent = (params: any) => {
  const { color, capitalizeAllLetters } = CustomCellRenderer.renderWAAuth(
    params.value
  );
  if (!capitalizeAllLetters) {
    return "-";
  }
  return <Tag color={color}>{capitalizeAllLetters}</Tag>;
};

export const CustomCompanyNameComponent = (params: any) => {
  const { color, capitalizedValue } = CustomCellRenderer.renderCompanyName(
    params.value
  );
  if (!capitalizedValue) {
    return "-";
  }
  return <Tag color={color}>{capitalizedValue}</Tag>;
};

export const CustomRecruiterTypeComponent = (params: any) => {
  const { color, capitalizedValue } = CustomCellRenderer.renderRecruiterType(
    params.value
  );
  return <Tag color={color}>{capitalizedValue}</Tag>;
};
export const CustomStatusInterviewComponent = (params: any) => {
  const { color, capitalizedValue } = CustomCellRenderer.renderStatusInterview(
    params.value
  );
  return <Tag color={color}>{capitalizedValue}</Tag>;
};

export const CustomInviteReceivedComponent = (params: any) => {
  const isInviteReceived = params.value ? true : false;
  return (
    <div>
      <Switch style={{ width: "10px" }} checked={isInviteReceived} disabled />
      {params.value}
    </div>
  );
};





export const CustomInterviewStatusComponent = (params: any) => {
  const isInviteReceived = params.value !== undefined && params.value !== null;
  let statusText = "----";
  let color = "";

  if (isInviteReceived) {
    if (params.value === "Pass" || params.value === "pass") {
      statusText = "Pass";
      color = "green";
    } else if (params.value === "Rejected" || params.value === "rejected") {
      statusText = "Rejected";
      color = "red";
    } else if (params.value === "Awaiting" || params.value === "awaiting") {
      statusText = "Awaiting";
      color = "orange";
    }else if (params.value === "TBD" || params.value === "TBD") {
      statusText = "TBD";
      color = "green";}
  }

  return (
    <div>
      <Tag color={color}>{statusText}</Tag>
    </div>
  );
};

export const CustomInterviewModeComponent = (params: any) => {
  const iconMappings = [
    { value: "video", icon: video },
    { value: "onlineTest", icon: online },
    { value: "Video+Coding", icon: videoCoding },
  ];

  const renderIcon = (value: any) => {
    const iconItem = iconMappings.find((item) => item.value === value);
    const icon = iconItem ? iconItem.icon : "";
    return icon;
  };

  const icon = renderIcon(params.value);

  return (
    <div>
      <Image
        src={icon}
        preview={false}
        style={{ height: "15px", width: "15px", marginRight: 10 }}
      />
      {params.value}
    </div>
  );
};

export const StartEndDateTimeComponent = ({ start_time, end_time }: any) => {
  return (
    <div>
      <div>Start Time: {start_time}</div>
      <div>End Time: {end_time}</div>
    </div>
  );
};

export const CustomRecruitmentComponent = (params: any) => {
  const { color, capitalizedValue } =
    CustomCellRenderer.renderRecruitmentStatus(params.value);
  return <Tag color={color}>{capitalizedValue}</Tag>;
};

export const CustomRecruitmentSubmissionComponent = (params: any) => {
  const { color, capitalizedValue } =
    CustomCellRenderer.renderRecruitmentSubmissionStatus(params.value);
  return <Tag color={color}>{capitalizedValue}</Tag>;
};

export const CustomTechnology = (params: any) => {
  const technologies = CustomCellRenderer.renderTechnology(params.value);

  if (technologies.length === 0) {
    return "-";
  }

  return (
    <>
      {technologies.map((tech, index) => (
        <Tag key={index} color={tech.color}>
          {tech.capitalizedValue}
        </Tag>
      ))}
    </>
  );
};



export const sharedProps: SelectProps = {
  mode: 'multiple',
  style: { width: '100%' },
  maxTagCount: 'responsive',
};

export const maxTagPlaceholder=(omittedValues:any) => (
  <Tooltip
    overlayStyle={{ pointerEvents: 'none' }}
    title={omittedValues?.map(({ label }:any) => label).join(', ')}
  >
    <span>Hover Me</span>
  </Tooltip>
)