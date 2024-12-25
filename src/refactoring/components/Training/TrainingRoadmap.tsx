import {  Card,  Typography } from "antd";


interface TrainingRoadmapProps {
  roadmap: any;
}

const TrainingRoadmap: React.FC<TrainingRoadmapProps> = ({ roadmap }) => {
  // const [visible, setVisible] = useState(false);
 
  return (
    <div>
      {roadmap.length > 0 ? (
        <Card title="Road Map" bordered={false} style={{ width: "100%" }}>
          {roadmap?.map((item: any, index: number) => (
            <div key={index}>
              {item.title}-
              <Typography.Link href={item.videolink}>View</Typography.Link>
              {/* <Button
                type="primary"
                onClick={() => setVisible(true)}
                style={{ border: "none", background: "none", color: "#15b5d4" }}
              >
                View
              </Button>
              {item.videolink.includes("https") ? (
                visible && (
                  <iframe
                    src={item.videolink}
                    width="100%"
                    height="560px"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )
              ) : (
                <Image
                  width={200}
                  style={{ display: "none" }}
                  src={item.videolink}
                  preview={{
                    visible,
                    //scaleStep,
                    src: `${item.videolink}`,
                    onVisibleChange: (value) => {
                      setVisible(value);
                    },
                  }}
                />
              )} */}
            </div>
          ))}
        </Card>
      ) : (
        <Card title="Road Map" bordered={false} style={{ width: "100%" }}>
          <Typography.Text>No Roadmaps Available</Typography.Text>
        </Card>
      )}
    </div>
  );
};

export default TrainingRoadmap;
