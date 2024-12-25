import { Button, Card, List, Modal, Spin } from "antd";
import { useState, useEffect } from "react";

interface ItemCard {
  id: number;
  title: string;
  description: string;
  videolink: string | null;
}

interface TrainingVideosProps {
  classes: Array<ItemCard>;
}

const TrainingVideos: React.FC<TrainingVideosProps> = ({ classes }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<ItemCard | null>(null); // Track the selected class
  const [loading, setLoading] = useState<boolean>(true); // Track loading state


  const showModal = (item: ItemCard) => {
    setSelectedClass(item); 
    setIsModalVisible(true); 
    setLoading(true); 
  };

  const handleCancel = () => {
    setIsModalVisible(false); 
    setSelectedClass(null); 
  };


  useEffect(() => {
    if (!isModalVisible) {
      setLoading(true); 
    }
  }, [isModalVisible]);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      <Card title="Training Videos" bordered={false} style={{ width: "100%" }}>
        <List
        grid={
          classes.length > 15
            ? { gutter: 16, column: 4 } // Use grid layout for > 10 items
            : undefined // Default list layout
        }
          itemLayout="horizontal"
          dataSource={classes}
          renderItem={(item) => (
            <List.Item >
              <List.Item.Meta
                title={
                  <div>
                    {item.title}-
                    <Button
                      style={{
                        border: "none",
                        textDecoration: "underline",
                        color: "rgb(21, 181, 212)",
                      }}
                      onClick={() => showModal(item)} // Pass item to showModal
                    >
                      Link
                    </Button>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      {/* Modal to display video */}
      {selectedClass && isModalVisible && (
        <Modal
          title={selectedClass.title}
          open={isModalVisible}
          onOk={handleCancel}
          onCancel={handleCancel}
          width="80%"
          height="80%"
          footer={null}
        >
          <Spin spinning={loading}>
            {selectedClass.videolink ? (
              <iframe
                src={selectedClass.videolink}
                width="100%"
                height="560px"
                title={selectedClass.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleVideoLoad} 
              ></iframe>
            ) : (
              <span>No video available</span>
            )}
          </Spin>
        </Modal>
      )}
    </div>
  );
};

export default TrainingVideos;
