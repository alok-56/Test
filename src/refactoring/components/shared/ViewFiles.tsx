import React from 'react';
import { Row, Col, Typography } from 'antd';


import { LinkRenderer } from '../RecruitmentSubmission/columns';
const { Text } = Typography;

interface Reference {
  [key: string]: string; // Allows for any string key with string value
}

interface ViewFilesProps {
  references?: Reference[];
}

const ViewFiles: React.FC<ViewFilesProps> = ({ references }) => {
  return (
    <div >
      {references && references.length > 0 ? (
        <div>
          {references.map((ref, index) => (
            <Row
              key={index}
              gutter={16}

            >
              {Object.entries(ref).map(([key, value]) => (
                <Col span={6} key={key} style={{ marginBottom: '8px' }}>
                  <div style={{ marginBottom: '4px' }}>
                  {key === 'url' ? (
                      <Text >LinkedIn{ key.charAt(0).toUpperCase() + key.slice(1)}:</Text> // Use LinkRenderer for URL
                    ) : (
                        <Text >{key.charAt(0).toUpperCase() + key.slice(1)}:</Text>
                    )}
                    
                  </div>
                  <div>
                  {key === 'url' ? (
                      LinkRenderer(value)  // Use LinkRenderer for URL
                    ) : (
                      (value)
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          ))}
        </div>
      ) : (
        <Text>No references available.</Text>
      )}
    </div>
  );
};

export default ViewFiles;
