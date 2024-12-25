import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile, RcFile } from "antd/es/upload/interface";
import { Button, message,  Upload } from "antd";
import { REACT_API_URL } from "../../../../urlConfig";
import axiosInstance from "../../../services/shared/AxiosService";

interface UploadAttachmentProps {
  field: any;
  form: any;
}

const UploadAttachment: React.FC<UploadAttachmentProps> = ({ field, form }) => {
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>(
    form.getFieldValue(field.key) || []
  );


  useEffect(() => {
    const currentFiles = form.getFieldValue(field.key) || [];
    const mappedUpload = currentFiles.map((file: any) => ({
      name: file.fileName || file.name,
      percent: file.percent,
      status: file.status,
      uid: file.uid,
      url: file.url,
    }));
    setUploadFileList(mappedUpload);
  }, [form.getFieldValue(field.key)]);

  const beforeUpload = (_: RcFile) => {
    if (uploadFileList.length >= 6) {
      message.error("You can only upload up to five files.");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const customRequest = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    const formData = new FormData();
    formData.append("file",file);

    try {
      const response = await axiosInstance.post(
        `${REACT_API_URL}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent: any) => {
            if (progressEvent.lengthComputable) {
              onProgress({
                percent: (progressEvent.loaded / progressEvent.total) * 100,
              });
            }
          },
        }
      );

      if (response && response.data) {
        const newFileData: UploadFile = {
          uid: response.data.data.uid,
          name: response.data.data.fileName,
          status: response.data.data.status,
          percent: response.data.data.percent,
          url: response.data.data.url,
        };

        const updatedFileList = uploadFileList.map((fileItem) =>
          fileItem.uid === file.uid ? newFileData : fileItem
        );

        setUploadFileList(updatedFileList as UploadFile[]);
        form.setFieldValue(field.key, updatedFileList);
        onSuccess(response.data.data);
      } else {
        throw new Error("Upload succeeded but no data returned.");
      }
    } catch (error) {
      onError(error);
    }
  };

  const props: UploadProps = {
    customRequest,
    fileList: uploadFileList,
    beforeUpload,
    onChange(info) {
      const { file, fileList: newFileList } = info;
      setUploadFileList(newFileList.slice(-6)); // Limit to last 3 uploaded files

      if (file.status === "done") {
        message.success(`${file.name} uploaded successfully`);
      } else if (file.status === "error") {
        message.error(`${file.name} upload failed.`);
      }
    },
    onRemove(file) {
      const updatedFileList = uploadFileList.filter(
        (item) => item.uid !== file.uid
      );
      setUploadFileList(updatedFileList);
      form.setFieldValue(field.key, updatedFileList);
      message.success("File is deleted successfully");
    },
  };

  return (
    <>
      <Upload {...props} showUploadList={{ showDownloadIcon: false }}>
        <Button icon={<UploadOutlined />} >
          Click to Upload
        </Button>
      </Upload>
    </>
  );
};

export default UploadAttachment;
