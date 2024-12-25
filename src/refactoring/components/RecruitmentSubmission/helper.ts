import dayjs from "dayjs";
import AppUtils from "../../utils/AppUtils";

export const formatCreateRecruitmentSubmission = (
  formData: any,
  usersData: any,
  user: any
) => {
  const { date, uploads, billRate, c2cPayRate, submittedBy } = formData;
  const upload = uploads?.map((file: any) => ({
    fileName: file.name || file.response?.data?.fileName || file.fileName,
    url: file.url || file.response?.data?.url,
    uid: file.uid || file.response?.data?.uid,
    status: file.status || file.response?.data?.status,
    percent: file.percent || file.response?.data?.percent,
  }));

  const selectedUser =
    usersData?.find((user: any) => user?.profile?.firstName === submittedBy) ||
    {};
  const selectedUser1 =
    user?.find((user: any) => user?.profile?.firstName === submittedBy) || {};

  const user_id = selectedUser.profile?._id;
  const user_id1 = selectedUser1.profile?._id;

  const formattedData = {
    ...formData,
    date: AppUtils.dateToUnix(date),
    uploads: upload,
    billRate: parseInt(billRate),
    c2cPayRate: parseInt(c2cPayRate),
    submittedBy: user_id || user_id1,
  };

  return formattedData;
};

export const formatUpdateRecruitmentSubmission = (
  selected: any,
  usersData: any
) => {
  const { date, billRate, c2cPayRate, submittedBy } = selected;
  const selectedUser =
    usersData.find((user: any) => user.profile._id === submittedBy) || {};

  const { firstName } = selectedUser?.profile;
  const formattedData = {
    ...selected,
    date: dayjs.unix(date),
    billRate: parseInt(billRate),
    c2cPayRate: parseInt(c2cPayRate),
    submittedBy: firstName,
  };

  return formattedData;
};

export const formatUpdateEditRecruitmentSubmission = (
  selected: any,
  usersData: any,
  user: any
) => {
  const { date, billRate, c2cPayRate, submittedBy } = selected;
  const selectedUser =
    usersData?.find((user: any) => user?.profile?._id === submittedBy) || {};
  const selectedUser1 =
    user?.find((user: any) => user?.profile?._id === submittedBy) || {};

  const firstName = selectedUser?.profile?.firstName;
  const firstName1 = selectedUser1?.profile?.firstName;
  const formattedData = {
    ...selected,
    date: dayjs.unix(date),
    billRate: parseInt(billRate),
    c2cPayRate: parseInt(c2cPayRate),
    submittedBy: firstName || firstName1,
  };

  return formattedData;
};
