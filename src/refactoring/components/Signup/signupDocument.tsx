import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { Button, Upload } from "antd";
import { UploadProps } from "antd/lib";
interface UploadHiringProps {
  field: any;
  form: any;
}

const UploadHiring: React.FC<UploadHiringProps> = ({ field, form }) => {
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>(
    form.getFieldValue(field.key) || []
  );
  useEffect(() => {
    const currentFiles = form.getFieldValue(field.key) || [];
    if(currentFiles){
      const mappedUpload = currentFiles.map((file: any) => ({
        ...file,
        name: file.fileName || file.name,
        percent: file.percent,
        status: file.status,
        uid: file.uid,
        url: file.url,
      }));
      setUploadFileList(mappedUpload);
    }
  }, [form.getFieldValue(field.key)]);
  const props: UploadProps = {
    fileList: uploadFileList.map((file) => ({
      ...file,
      status: "done",
    })),
  };
  const handleUploadChange = (info: any) => {
    const fileList = info.fileList;
    setUploadFileList(uploadFileList);
    form.setFieldsValue({ uploads: fileList });
  };
  return (
    <>
      <Upload
        {...props}
        onChange={handleUploadChange}
        showUploadList={{ showDownloadIcon: false }}
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default UploadHiring;
