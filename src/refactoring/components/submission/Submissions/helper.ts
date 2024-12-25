import dayjs from "dayjs";
import AppUtils from "../../../utils/AppUtils";
import {
  dummyClientRecruiterData,
  dummyVendorRecruiterData,
} from "./constants";

const findRecruiter = (
  companyName: string,
  recruiterName: string,
  type: string,
  recruitersOptions: any
) => {
  return recruitersOptions.find(
    (recruiter: any) =>
      recruiter.company_name === companyName &&
      recruiter.name === recruiterName &&
      recruiter.type === type
  );
};

export const getRecruitersByType = (
  recruitersOptions: any[],
  type: any,
  value: any
) => {
  const recruiter = recruitersOptions.filter(
    (item: any) => item.type === type && item.company_name === value
  );
  return recruiter;
};

export const extractRecruiterFields = (recruiterData: any) => {
  const { company_id, contact, email, name, rec_id } = recruiterData;
  return { company_id, recruiter: { rec_id, contact, email, name } };
};

export const formatUpdateSubmission = (formData: any) => {
  const {
    subDetails: {
      profile,
      status,
      date,
      jobRole,
      workLocation,
      jobDescription,
      comments,
      primeVendor,
      vendor,
      client,
    },
  } = formData;
  const formattedData = {
    primeVendorCompanyName: primeVendor?.name,
    primeVendorRecruiterName: primeVendor?.recruiter?.name,
    vendorRecruiterName: vendor?.recruiter?.name,
    clientRecruiterName: client?.recruiter?.name,
    userName: profile?.firstName,
    _id: profile?._id,
    vendorCompanyName: vendor?.name,
    sameAsVendor: primeVendor.company_id == vendor.company_id || false,
    clientCompanyName: client?.name,
    jobRole,
    status,
    salesRecruiter: formData?.subDetails?.salesRecruiter,
    date: dayjs.unix(date),
    workLocation,
    jobDescription,
    comments,
  };

  return formattedData;
};

export const getUserId = (users: any[], value: any) => {
  const selectedUser = users.find(
    (user: any) => user.profile.firstName === value
  );
  return selectedUser?.profile?._id;
};

export const handleSameAsVendorChanged = (
  form: any,
  sameAsVendor: boolean,
  vendorName: string,
  vendorRecruiterName: string
) => {
  if (sameAsVendor) {
    form.setFieldsValue({
      primeVendorCompanyName: vendorName,
    });
    setTimeout(
      () =>
        form.setFieldsValue({
          primeVendorRecruiterName: vendorRecruiterName,
        }),
      100
    );
    return;
  }
  form.setFieldsValue({
    primeVendorCompanyName: undefined,
    primeVendorRecruiterName: undefined,
  });
};

export const formatPayload = async (
  form: any,
  users: any[],
  recruitersOptions: any[]
) => {
  await form.validateFields();
  const values = form.getFieldsValue(true);
  let formData = {};
  const {
    vendorCompanyName,
    userName,
    clientCompanyName,
    primeVendorCompanyName,
    vendorRecruiterName,
    primeVendorRecruiterName,
    clientRecruiterName,
    comments,
    jobDescription,
    jobRole,
    date,
    salesRecruiter,
    status,
    workLocation,
  } = values;
  formData = {
    comments,
    jobDescription,
    jobRole,
    salesRecruiter,
    status,
    workLocation,
    date: AppUtils.dateToUnix(dayjs(date).format("MM-DD-YYYY")),
  };
  const selectedUser =
    users.find((user) => user.profile.firstName=== userName) || {};

  const { _id } = selectedUser.profile;

  formData = {
    ...formData,
    profile: {
      _id: _id,
      name: userName,
    },
  };
  let client = {};
  let vendor = {};
  let primeVendor = {};
  try {
    vendor = extractRecruiterFields(
      findRecruiter(
        vendorCompanyName,
        vendorRecruiterName,
        "vendor",
        recruitersOptions
      )
    );
  } catch {
    vendor = extractRecruiterFields(dummyVendorRecruiterData);
  }

  try {
    primeVendor = extractRecruiterFields(
      findRecruiter(
        primeVendorCompanyName,
        primeVendorRecruiterName,
        "vendor",
        recruitersOptions
      )
    );
  } catch {
    primeVendor = extractRecruiterFields(dummyVendorRecruiterData);
  }

  try {
    client = extractRecruiterFields(
      findRecruiter(
        clientCompanyName,
        clientRecruiterName,
        "client",
        recruitersOptions
      )
    );
  } catch {
    client = extractRecruiterFields(dummyClientRecruiterData);
  }

  formData = {
    ...formData,
    vendor: { ...vendor, name: vendorCompanyName },
    client: { ...client, name: clientCompanyName },
    primeVendor: { ...primeVendor, name: primeVendorCompanyName },
  };

  return { subDetails: formData, tags: null };
};
