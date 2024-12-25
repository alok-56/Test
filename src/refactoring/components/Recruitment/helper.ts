import dayjs from "dayjs";
import AppUtils from "../../utils/AppUtils";

export const formatCreateRecruitment = async (
  formData: any,
  users: any,
  clients: any
) => {
  const {
    c2cRate,
    activeSubmissionsCount,
    positionsCount,
    questionStatus,
    submissionStatus,
    createDate,
    profileId,
    customerId,
    uploads,
  } = formData;
  const upload =
    uploads?.map((file: any) => ({
      fileName: file.name || file.response?.data?.fileName||file.fileName,
      url: file.url || file.response?.data?.url,
      uid: file.uid || file.response?.data?.uid,
      status: file.status || file.response?.data?.status,
      percent: file.percent || file.response?.data?.percent,
    })) || [];

  const selectedUser =
    users.find((user: any) => user.profile.firstName === profileId) || {};
  const { _id } = selectedUser.profile;
  const selectedClient = clients.find(
    (client: any) => client.name === customerId
  );
  const { company_id } = selectedClient;
  const formattedData = {
    ...formData,
    profileId: _id,
    customerId: company_id,
    createDate: AppUtils.dateToUnix(createDate),
    c2cRate: parseInt(c2cRate),
    activeSubmissionsCount: parseInt(activeSubmissionsCount),
    positionsCount: parseInt(positionsCount),
    questionStatus: parseInt(questionStatus),
    submissionStatus: parseInt(submissionStatus),
    uploads: upload,
  };

  return formattedData;
};

export const formatUpdateRecruitment = (
  selected: any,
  users: any,
  clients: any
) => {
  const { createDate, profileId, customerId } = selected;
  const selectedUser =
    users.find((user: any) => user.profile._id === profileId) || {};
  const { firstName } = selectedUser.profile;

  const selectedClient = clients.find(
    (client: any) => client.company_id === customerId
  );
  const formattedData = {
    ...selected,
    createDate: dayjs.unix(createDate),
    profileId: firstName,
    customerId: selectedClient?.name,
  };
  return formattedData;
};
