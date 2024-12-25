import { Image, Spin, Typography } from "antd";
import Resume1 from "./../../../assets/resume1.png";
import Resume2 from "./../../../assets/resume2.png";
import Resume3 from "./../../../assets/resume3.png";
import { useEffect, useState } from "react";

const { Title } = Typography;

const loadImage = (loaderStage: number) => {
  switch (loaderStage) {
    case 0:
      return Resume2;
    case 1:
      return Resume1;
    case 2:
      return Resume3;
    default:
      return Resume2;
  }
};

const ResumeLoader = ({ loading }: any) => {
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <Spin spinning={loading}>
        <div style={{ textAlign: "center" }}>
          <Image height={350} src={loadImage(imageIndex)} preview={false} />;
        </div>
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Title level={5}>Analysing...</Title>
        </div>
      </Spin>
    </div>
  );
};

export default ResumeLoader;
