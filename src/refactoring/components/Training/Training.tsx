import { Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { dummyData } from "./data";

const { Meta } = Card;

const TrainingIT = () => {
  const navigate = useNavigate();

  const handleCardClick = (item: any) => {
    navigate(`/v1/training/${item.course}`, { state: { courses: item } });
  };

  return (
    <div style={{ height: "90vh", overflowY: "auto", padding: "20px" }}>
      <title>Thinklusive - Training</title>
      <Row gutter={16} justify="start" style={{ display: "flex", flexWrap: "wrap", }}>
        {dummyData.map((item: any) => (
          <Col key={item.id} style={{ display: "flex", justifyContent: "center",marginBottom:"10px" }} md={6}>
            <Card
              hoverable
              style={{
                width: "300px",
                transition: "transform 0.3s ease",
                position: "relative",
                backgroundColor: "#fff",
              }}
              cover={
                <img
                  height={200}
                  width={300}
                  alt="main logo"
                  src={item.img}
                />
              }
              onClick={() => handleCardClick(item)}
            >
              <Meta title={item.course} description={item.courseDescription} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TrainingIT;
