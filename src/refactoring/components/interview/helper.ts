import AppUtils from "../../utils/AppUtils";

export const formatCreateInterview = async (formData: any) => {
  const unixTimestamp: number = Math.floor(Date.now() / 1000);

  const createdUserId = localStorage.getItem("user_id");
  const createdUser = localStorage.getItem("user");
  const formattedData = {
    ...formData,
    auditInfo: {
      createdDate: unixTimestamp,
      createdUserID: createdUserId,
      createdUserName: createdUser,
      updatedDate: unixTimestamp,
      updatedUserName: createdUser,
      updatedUserid: createdUserId,
    },
  };
  return formattedData;
};


export const formayPayLoadInterview=async(selectedInterview:any,questions:any)=>{
  const dateTimeStr1 = selectedInterview.start_time.$d;
      const dateTimeStr2 = selectedInterview.end_time.$d;
  const formatterData = {
    submission_id: selectedInterview.submission_id,
    status: selectedInterview.status,
    comments: selectedInterview.comments,
    start_time: AppUtils.dateToUnix(dateTimeStr1),
        end_time: AppUtils.dateToUnix(dateTimeStr2),
    panel:
    selectedInterview.panel?.map((ip: any) => ({
        name: ip.name,
        mailID: ip.mailID,
        linkedinID: ip.linkedinID,
      })) || [],

    mode: selectedInterview.mode,
    inviteReceived: selectedInterview.inviteReceived,
    interviewQuestions:questions,
  };
  return formatterData
}