import AppUtils from "../../utils/AppUtils";

export const formatCreateUser = async (userData: any) => {
  const upload =
    userData.uploads?.map((file: any) => ({
      fileName: file.name || file.response?.data?.fileName || file.fileName,
      url: file.url || file.response?.data?.url,
      uid: file.uid || file.response?.data?.uid,
      status: file.status || file.response?.data?.status,
      percent: file.percent || file.response?.data?.percent,
    })) || [];

  const formattedData = {
    addOns: {},
    attachment: {},
    uploads: upload,
    credentials: {
      password: userData.password,
    },
    educationDetails:
      userData.educationDetails?.map((edu: any) => ({
        degree: edu.degree,
        graduationDate: AppUtils.dateToUnix(edu.graduationDate),
        specialization: edu.specialization,
        university: edu.university,
      })) || [],
    jobInfo:
      userData.jobInfo?.map((job: any) => ({
        employerBusiness: job.employerBusiness,
        employerName: job.employerName,
        employerType: job.employerType,
        endDate: AppUtils.dateToUnix(job.endDate),
        jobDuties: job.jobDuties,
        jobTitle: job.jobTitle,
        skills: job.skills,
        startDate: AppUtils.dateToUnix(job.startDate),
      })) || [],
    personalInfo: {
      dlNumber: userData.dlNumber,
      dob: AppUtils.dateToUnix(userData.dob),
      linkedinID: userData.linkedinID, // Assuming no LinkedIn ID is provided
      passportNo: userData.passportNo,
      referredBy: userData.referredBy,
      statesEntryDate: AppUtils.dateToUnix(userData.statesEntryDate),
      visaStartDate: AppUtils.dateToUnix(userData.visaStartDate),
      yearsOfExperience:parseInt(userData.yearsOfExperience),
      visaStatus: userData.visaStatus,
    },
    primaryTechnology: userData.primaryTechnology,
    profile: {
      // Replace with actual ID if available
      active: userData.active,
      address: {
        addressLine1: userData.addressLine1,
        addressLine2: userData.addressLine2,
        city: userData.city, // Adjust as needed
        country: userData.country,
        state: userData.state, // Adjust as needed
        zipCode: userData.zipCode,
        type: "", // Add type if available
      },
      whatsappNo: userData.whatsappNo,
      authRole: userData.authRole,
      currentLocation: userData.currentLocation,
      email: userData.email,
      firstName: userData.firstName,
      gender: userData.gender,
      jobRole: userData.jobRole,
      lastName: userData.lastName,
      middleName: userData.middleName, // Add middle name if available
      mobile: userData.mobile,
    },
    company: userData.company,
    secondaryTechnology: userData.secondaryTechnology, // Add if available
    tags: [], // Add tags if available
    guestHouseDate: AppUtils.dateToUnix(userData.guestHouseDate),
    marketingStartDate: AppUtils.dateToUnix(userData.marketingStartDate),
  };

  return formattedData;
};

export const formatSelectedFields = (selectedUser: any) => {

  const active=selectedUser.profile.active===true?true:false

  const formattedData = {
    firstName: selectedUser.profile.firstName || "",
    middleName: selectedUser.profile.middleName || "",
    lastName: selectedUser.profile.lastName || "",
    email: selectedUser.profile.email || "",
    mobile: selectedUser.profile.mobile || "",
    whatsappNo: selectedUser.profile.whatsappNo || "",
    password: selectedUser.credentials.password || "",
    gender: selectedUser.profile.gender || "",
    currentLocation: selectedUser.profile.currentLocation || "",
    addressLine1: selectedUser.profile.address.addressLine1 || "",
    addressLine2: selectedUser.profile.address.addressLine2 || "",
    zipCode: selectedUser.profile.address.zipCode || "",
    country: selectedUser.profile.address.country || "",
    state: selectedUser.profile.address.state || "",
    city: selectedUser.profile.address.city || "",
    authRole: selectedUser.profile.authRole || "",
    jobRole: selectedUser.profile.jobRole || "",
    active: active,

    linkedinID: selectedUser.personalInfo.linkedinID || "",
    passportNo: selectedUser.personalInfo.passportNo || "",
    dlNumber: selectedUser.personalInfo.dlNumber || "",
    visaStatus: selectedUser.personalInfo.visaStatus || "",
    visaStartDate: selectedUser.personalInfo.visaStartDate
      ? AppUtils.formatDateUnixCompare(selectedUser.personalInfo.visaStartDate)
      : null,
    statesEntryDate: selectedUser.personalInfo.statesEntryDate
      ? AppUtils.formatDateUnixCompare(selectedUser.personalInfo.statesEntryDate)
      : null,
      yearsOfExperience:parseInt(selectedUser.personalInfo.yearsOfExperience),
    referredBy: selectedUser.personalInfo.referredBy || "",
    dob: selectedUser.personalInfo.dob
      ? AppUtils.formatDateUnixCompare(selectedUser.personalInfo.dob)
      : null,

    //educationDetails: formattedEducationalDetails,
    educationDetails:
      selectedUser.educationDetails?.map((edu: any) => ({
        university: edu.university || "",
        specialization: edu.specialization || "",
        degree: edu.degree || "",
        graduationDate: edu.graduationDate
          ? AppUtils.formatDateUnixCompare(edu.graduationDate)
          : null,
      })) || [],

    jobInfo:
      selectedUser.jobInfo?.map((job: any) => ({
        employerName: job.employerName || "",
        employerType: job.employerType || "",
        employerBusiness: job.employerBusiness || "",
        startDate: job.startDate ? AppUtils.formatDateUnixCompare(job.startDate) : null,
        endDate: job.endDate ? AppUtils.formatDateUnixCompare(job.endDate) : null,
        jobTitle: job.jobTitle || "",
        jobDuties: job.jobDuties || "",
        skills: job.skills || "",
      })) || [],

    primaryTechnology: selectedUser.primaryTechnology || "",
    secondaryTechnology: selectedUser.secondaryTechnology || "",
    company: selectedUser.company || "",
    guestHouseDate: selectedUser.guestHouseDate
      ? AppUtils.formatDateUnixCompare(selectedUser.guestHouseDate)
      : null,
    marketingStartDate: selectedUser.marketingStartDate
      ? AppUtils.formatDateUnixCompare(selectedUser.marketingStartDate)
      : null,
    uploads: selectedUser.uploads || [],
  };

  return formattedData;
};

export const formatUpdateUser=async(userData:any)=>{
  const upload =
    userData.uploads?.map((file: any) => ({
      fileName: file.name || file.response?.data?.fileName || file.fileName,
      url: file.url || file.response?.data?.url,
      uid: file.uid || file.response?.data?.uid,
      status: file.status || file.response?.data?.status,
      percent: file.percent || file.response?.data?.percent,
    })) || [];

  const formattedData = {
    addOns: {},
    attachment: {},
    uploads: upload,
    // credentials: {
    //   password: userData.password,
    // },
    educationDetails:
      userData.educationDetails?.map((edu: any) => ({
        degree: edu.degree,
        graduationDate: AppUtils.dateToUnix(edu.graduationDate),
        specialization: edu.specialization,
        university: edu.university,
      })) || [],
    jobInfo:
      userData.jobInfo?.map((job: any) => ({
        employerBusiness: job.employerBusiness,
        employerName: job.employerName,
        employerType: job.employerType,
        endDate: AppUtils.dateToUnix(job.endDate),
        jobDuties: job.jobDuties,
        jobTitle: job.jobTitle,
        skills: job.skills,
        startDate: AppUtils.dateToUnix(job.startDate),
      })) || [],
    personalInfo: {
      dlNumber: userData.dlNumber,
      dob: AppUtils.dateToUnix(userData.dob),
      linkedinID: userData.linkedinID, // Assuming no LinkedIn ID is provided
      passportNo: userData.passportNo,
      referredBy: userData.referredBy,
      statesEntryDate: AppUtils.dateToUnix(userData.statesEntryDate),
      visaStartDate: AppUtils.dateToUnix(userData.visaStartDate),
      yearsOfExperience:parseInt(userData.yearsOfExperience),
      visaStatus: userData.visaStatus,
    },
    primaryTechnology: userData.primaryTechnology,
    profile: {
      //_id:userData._id,
      active: userData.active,
      address: {
        addressLine1: userData.addressLine1,
        addressLine2: userData.addressLine2,
        city: userData.city, // Adjust as needed
        country: userData.country,
        state: userData.state, // Adjust as needed
        zipCode: userData.zipCode,
        type: "", // Add type if available
      },
      whatsappNo: userData.whatsappNo,
      authRole: userData.authRole,
      currentLocation: userData.currentLocation,
      email: userData.email,
      firstName: userData.firstName,
      gender: userData.gender,
      jobRole: userData.jobRole,
      lastName: userData.lastName,
      middleName: userData.middleName, // Add middle name if available
      mobile: userData.mobile,
    },
    company: userData.company,
    secondaryTechnology: userData.secondaryTechnology, // Add if available
    tags: [], // Add tags if available
    guestHouseDate: AppUtils.dateToUnix(userData.guestHouseDate),
    marketingStartDate: AppUtils.dateToUnix(userData.marketingStartDate),
  };
  return formattedData;
}

export const getCustomerIdByName = (customers: any[], customerName: string) => {
  return customers.find((c) => c.name === customerName)?.company_id;
};
