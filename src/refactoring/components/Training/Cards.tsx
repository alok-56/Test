import { Col, Row, Spin, Typography } from "antd";
import { useLocation } from "react-router-dom";
import TrainingRoadmap from "./TrainingRoadmap";
import TrainingVideos from "./TrainingVideos";
import TrainingQuestions from "./TrainingQuestions";
import { useEffect, useState } from "react";
import useGet from "../../hooks/useGet";
import InterviewPreparationService from "../../services/InterviewQuestions";

// interface Link {
//   id: number;
//   title: string;
//   link: string;
//   description: string;
// }
const interviewPrepationService = new InterviewPreparationService();
const Cards = () => {
  const location = useLocation();
  const { courses } = location.state || {};
  const {
    fetchData: fetchQuestionsData,
    data: QuestionsData,
    loading: questionsLoading,
  } = useGet();
  const {
    fetchData: fetchPositionsData,
    data: positionsData,
    loading: positionLoading,
  } = useGet();

  const [positionsList, setPositionsList] = useState<string | null>();

  const getPosition = async () => {
    await fetchPositionsData(interviewPrepationService.getPositions());
  };

  useEffect(() => {
    getPosition();
  }, []);

  const getQuestions = async (Questions: any) => {
    await fetchQuestionsData(
      interviewPrepationService.getFrequentlyInterviews(Questions)
    );
  };

  useEffect(() => {
    if (positionsData?.data) {
      const questionsWithTitle = positionsData.data.filter((item: any) =>
        item.toLowerCase().includes(courses.course.toLowerCase())
      );
      setPositionsList(String(questionsWithTitle));
    }
  }, [positionsData, courses.course]);

  useEffect(() => {
    if (positionsList) {
      getQuestions(positionsList);
    } else {
      getQuestions(null);
    }
  }, [courses, positionsData]);

  if (!courses) {
    return <div>No course data available</div>;
  }
  const classes =
    courses.links.find((link: any) => link.title === "Classes")?.link || [];

  const roadmap =
    courses.links.find((link: any) => link.title === "Roadmap")?.link || [];
  return (
   <div>
    <title>Thinklusive - {courses.course}</title>
     <Spin spinning={positionLoading || questionsLoading}>
      <div style={{ marginTop: "20px", height: "90vh", overflowY: "auto",overflowX:"hidden" }}>
        <Typography.Title>{courses.course}</Typography.Title>
        <Typography.Text>{courses.courseDescription}</Typography.Text>

        <Row gutter={16}>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <TrainingRoadmap roadmap={roadmap} />
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <TrainingVideos classes={classes} />
          </Col>

          <Col span={24}>
            <TrainingQuestions
              questionslist={QuestionsData}
              questionsLoading={questionsLoading}
              positionLoading={positionLoading}
            />
          </Col>
          {/* <Col span={12}>
          <TrainingQuestions />
        </Col> */}
        </Row>
      </div>
    </Spin>
   </div>
  );
};

export default Cards;
