import { message } from "antd";
import AppUtils from "../../utils/AppUtils";
import dayjs from "dayjs";

export const formatCreateUser = async (formData: any) => {
  const formattedData = {
    hiringUser: {
      firstName: formData.firstName ,
      middleName: formData.middleName ,
      lastName: formData.lastName ,
      email: formData.email ,
      mobile: formData.mobile ,
      gender: formData.gender ,
      primaryTechnology: formData.primaryTechnology ,
      secondaryTechnology: formData.secondaryTechnology ,
      relocateToOffice: (formData.relocateToOffice) ,
      anyUSALocation: (formData.anyUSALocation),
      userComments: formData.userComments ,
      adminComments: formData.adminComments ,
    },
    educationDetails: [
      formData.mastersUniversity && formData.mastersSpecialization&&({
        degree:formData.mastersUniversity && formData.mastersSpecialization
        ? "Master's"
        : undefined,
        university: formData.mastersUniversity ,
        graduationDate:
          AppUtils.dateToUnix(formData.mastersGraduationDate) ||
          AppUtils.dateToUnix(formData.mastersGraduationDate) ,
        specialization: formData.mastersSpecialization ,
      }) ,
      {
        degree: "Bachelor's" ,
        university: formData.bachelorUniversity ,
        graduationDate:
          AppUtils.dateToUnix(formData.bachelorGraduationDate) ||
          AppUtils.dateToUnix(formData.bachelorGraduationDate) ||
          null,
        specialization: formData.bachelorSpecialization ,
      },
    ],
    personalInfo: {
      linkedinID: formData.linkedinID ,
      passportNo: formData.passportNo ,
      dlNumber: formData.dlNumber ,
      visaStatus: formData.visaStatus ,
      visaStartDate: AppUtils.dateToUnix(formData.visaStartDate) || null,
      dob: AppUtils.dateToUnix(formData.dob) || null,
      referredBy: formData.referredBy ,
      yearsOfExperience: parseInt(formData.yearsOfExperience) || null,
    },
    jobInfo: [
      {
        employerName: formData.employerName ,
        employerType: formData.employerType ,
        employerBusiness: formData.employerBusiness ,
        startDate: AppUtils.dateToUnix(formData.startDate) || null,
        endDate: AppUtils.dateToUnix(formData.endDate) || null,
        jobTitle: formData.jobTitle ,
        jobDuties: formData.jobDuties ,
        skills: formData.skills ,
      },
    ],
    address: formData.address ,
    reviewStatus: formData?.reviewStatus||""
  };

  const formDataToSend = new FormData();

  formDataToSend.append("json", JSON.stringify(formattedData));

  if (formData.uploads && Array.isArray(formData.uploads)) {
    formData.uploads.forEach((file: any, index: number) => {
      if (file.originFileObj) {
        formDataToSend.append("files", file.originFileObj);
      } else {
        message.error(`No originFileObj found for file #${index + 1}`);
      }
    });
  }
  return formDataToSend;
};

export const formatUpdateHiringUser = (hiringData: any) => {
  const relocate=hiringData?.hiringUser?.relocateToOffice===true ?true:false

  const usaLocation=hiringData?.hiringUser?.anyUSALocation===true ?true:false
  return {
    relocateToOffice:relocate ,
    anyUSALocation:usaLocation ,
    firstName: hiringData.hiringUser?.firstName ,
    middleName: hiringData.hiringUser?.middleName ,
    lastName: hiringData.hiringUser?.lastName ,
    email: hiringData.hiringUser?.email ,
    address: hiringData.address ,
    dob: hiringData.personalInfo?.dob
      ? dayjs.unix(hiringData.personalInfo.dob)
      : null,
    gender: hiringData.hiringUser?.gender ,
    mobile: hiringData.hiringUser?.mobile ,
    mastersUniversity: hiringData.educationDetails[0]?.university ,
    mastersSpecialization: hiringData.educationDetails[0]?.specialization ,
    mastersGraduationDate: hiringData.educationDetails[0]?.graduationDate
      ? dayjs.unix(hiringData.educationDetails[0].graduationDate)
      : null,
    bachelorUniversity: hiringData.educationDetails[1]?.university ,
    bachelorSpecialization:
      hiringData.educationDetails[1]?.specialization ,
    bachelorGraduationDate: hiringData.educationDetails[1]?.graduationDate
      ? dayjs.unix(hiringData.educationDetails[1].graduationDate)
      : null,
    employerName: hiringData.jobInfo[0]?.employerName ,
    startDate: hiringData.jobInfo[0]?.startDate
      ? dayjs.unix(hiringData.jobInfo[0].startDate)
      : null,
    endDate: hiringData.jobInfo[0]?.endDate
      ? dayjs.unix(hiringData.jobInfo[0].endDate)
      : null,
    yearsOfExperience: hiringData.personalInfo.yearsOfExperience ,
    passportNo: hiringData.personalInfo?.passportNo ,
    dlNumber: hiringData.personalInfo?.dlNumber ,
    visaStatus: hiringData.personalInfo?.visaStatus ,
    visaStartDate: hiringData.personalInfo?.visaStartDate
      ? dayjs.unix(hiringData.personalInfo.visaStartDate)
      : null,
    referredBy: hiringData.personalInfo?.referredBy ,
    primaryTechnology: hiringData.hiringUser?.primaryTechnology ,
    reviewStatus: hiringData?.reviewStatus || "Yet to Review",
    adminComments: hiringData.hiringUser?.adminComments ,
    userComments: hiringData.hiringUser?.userComments ,
    uploads:
      hiringData?.uploads?.map((file: any) => ({
        fileName: file?.name || file.response?.data?.fileName || file?.fileName,
        url: file.url || file.response?.data?.url,
        uid: file.uid || file.response?.data?.uid,
        status: file.status || file.response?.data?.status,
        percent: file.percent || file.response?.data?.percent,
      })) || [],
  };
};

export const formatUpdateRequiredFields = (formData: any) => {

  const upload=formData?.uploads?.map((file: any) => ({
    fileName: file.name || file.response?.data?.fileName || file.fileName,
    url: file?.url || file.response?.data?.url,
    uid: file.uid || file.response?.data?.uid,
    status: file.status || file.response?.data?.status||"done",
    percent: file.percent || file.response?.data?.percent||"100%",
  })) || []
  const formattedData={
        hiringUser: {
      firstName: formData.firstName ,
      middleName: formData.middleName ,
      lastName: formData.lastName ,
      email: formData.email ,
      mobile: formData.mobile ,
      gender: formData.gender ,
      primaryTechnology: formData.primaryTechnology ,
      secondaryTechnology: formData.secondaryTechnology ,
      relocateToOffice: Boolean(formData.relocateToOffice) ,
      anyUSALocation: (formData.anyUSALocation) ,
      userComments: formData.userComments ,
      adminComments: formData.hiringUser?.adminComments||formData.adminComments,
    },
    personalInfo: {
      linkedinID: formData.linkedinID ,
      passportNo: formData.passportNo ,
      dlNumber: formData.dlNumber ,
      visaStatus: formData.visaStatus ,
      visaStartDate: AppUtils.dateToUnix(formData.visaStartDate) || null,
      dob: AppUtils.dateToUnix(formData.dob) || null,
      referredBy: formData.referredBy ,
      yearsOfExperience: parseInt(formData.yearsOfExperience) || null,
    },
    educationDetails: [
      {
        degree: "Master's" ,
        university: formData.mastersUniversity ,
        graduationDate:
          AppUtils.dateToUnix(formData.mastersGraduationDate) ||
          AppUtils.dateToUnix(formData.mastersGraduationDate) ||
          null,
        specialization: formData.mastersSpecialization ,
      } ,
      {
        degree: "Bachelor's" ,
        university: formData.bachelorUniversity ,
        graduationDate:
          AppUtils.dateToUnix(formData.bachelorGraduationDate) ||
          AppUtils.dateToUnix(formData.bachelorGraduationDate) ||
          null,
        specialization: formData.bachelorSpecialization ,
      },
    ],
    jobInfo: [
      {
        employerName: formData.employerName ,
        employerType: formData.employerType ,
        employerBusiness: formData.employerBusiness ,
        startDate: AppUtils.dateToUnix(formData.startDate) || null,
        endDate: AppUtils.dateToUnix(formData.endDate) || null,
        jobTitle: formData.jobTitle ,
        jobDuties: formData.jobDuties ,
        skills: formData.skills ,
      },
    ],
  reviewStatus: formData?.reviewStatus,
  address: formData?.address,
  uploads:upload
  }

  return formattedData
};
