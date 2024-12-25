import AppUtils from "../../utils/AppUtils";

export const formatCreateHiringUser = (formData: any, selectedHiring: any) => {
  const upload =
    selectedHiring?.uploads?.map((file: any) => ({
      fileName: file.name || file.response?.data?.fileName || file.fileName,
      url: file.url || file.response?.data?.url,
      uid: file.uid || file.response?.data?.uid,
      status: file.status || file.response?.data?.status||"done",
      percent: file.percent || file.response?.data?.percent||"100%",
    })) || [];
  const formattedData = {
    addOns: {yearsOfExperience:selectedHiring?.personalInfo?.yearsOfExperience,},
    attachment: {},
    uploads: upload,
    credentials: {
      password: formData.password,
    },
    educationDetails:
    selectedHiring?.educationDetails
    ?.filter((education: any) => 
      education.university && education.specialization // Ensure both are not empty
    )
    .map((education: any) => ({
      degree: education.degree,
      university: education.university,
      graduationDate: education.graduationDate
        && (AppUtils.dateToUnix(education.graduationDate) || 0) * 1000000,
      specialization: education.specialization,
    })) || [],
    personalInfo: {
      linkedinID: selectedHiring?.personalInfo.linkedinID ,
      passportNo: selectedHiring?.personalInfo.passportNo ,
      dlNumber: selectedHiring?.personalInfo.dlNumber ,
      visaStatus: selectedHiring?.personalInfo.visaStatus ,
      visaStartDate: selectedHiring?.personalInfo.visaStartDate
        && (AppUtils.dateToUnix(selectedHiring?.personalInfo.visaStartDate) ||
            0) * 1000000
        ,
      dob: selectedHiring?.personalInfo.dob
        && (AppUtils.dateToUnix(selectedHiring?.personalInfo.dob) || 0) * 1000000
       ,
      referredBy: selectedHiring?.personalInfo.referredBy ,
      statesEntryDate: selectedHiring?.personalInfo.statesEntryDate
        && (AppUtils.dateToUnix(selectedHiring?.personalInfo.statesEntryDate) ||
            0) * 1000000
        ,
        yearsOfExperience:selectedHiring?.personalInfo?.yearsOfExperience,
    },
    jobInfo:
      selectedHiring?.jobInfo?.map((job: any) => ({
        employerName: job.employerName ,
        employerType: job.employerType ,
        employerBusiness: job.employerBusiness ,
        startDate: job.startDate
          && (AppUtils.dateToUnix(job.startDate) || 0) * 1000000
          ,
        endDate: job.endDate
          && (AppUtils.dateToUnix(job.endDate) || 0) * 1000000
          ,
        jobTitle: job.jobTitle ,
        jobDuties: job.jobDuties ,
        skills: job.skills ,
      })) || [],
    primaryTechnology: selectedHiring?.hiringUser.primaryTechnology,
    profile: {
      active: true,
      address: {
        addressLine1: "8054 Preston Rd",
        city: "Frisco",
        country: "United States",
        addressLine2: selectedHiring?.address.addressLine2 ,
        state: "Texas",
        type: selectedHiring?.address.type ,
        zipCode: "75034",
      },
      authRole: formData.authRole,
      currentLocation:
        selectedHiring?.address||selectedHiring?.address,
      email: selectedHiring?.hiringUser.email,
      firstName: selectedHiring?.hiringUser.firstName,
      gender: selectedHiring?.hiringUser.gender,
      jobRole: formData.jobRole,
      lastName: selectedHiring?.hiringUser.lastName,
      middleName: selectedHiring?.hiringUser.middleName ,
      mobile: selectedHiring?.hiringUser.mobile,
    },
    secondaryTechnology: selectedHiring?.hiringUser.secondaryTechnology ,
    tags: null,
    marketingStartDate:
      (AppUtils.dateToUnix(formData.marketingStartDate) || 0) * 1000 ,
    guestHouseDate:
      (AppUtils.dateToUnix(formData.guestHouseDate) || 0) * 1000 ,
  };

  return formattedData;
};
