import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";

class RecruitmentSubmissionService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createRecruitmentSubmission = () => `${this.baseUrl}/recruitment/submission`;

  // Read operation
  getRecruitmentSubmissions = () => `${this.baseUrl}/recruitment/submission`;

  getRecruitmentSubmissionsOnlyByProject = (
    project = "_id,subDetails.profile.name"
  ) => `${this.baseUrl}/recruitment/submission?project=${project}`;

  getMainRecruitmentSubmission = (
    filters: any,
    page: number,
    pageSize: number
  ) => {
    const url = `${this.baseUrl}/recruitment/submission`;
    const params = { ...filters, page, pageSize };
    return AppUtils.appendParamsToUrl(url, params);
  };

  getActiveSubmissionCount = (page: number, pageSize: number, id: string) => {
    const url = `${this.baseUrl}/recruitment/submission?requisitionId=${id}`;
    const params = { page, pageSize };
    return AppUtils.appendParamsToUrl(url, params);
  };

  getActiveUserSubmission = (
    page: number,
    pageSize: number,
    email: string,
    project = "createDate,submittedTo,c2cRate,clientName,jobTitle,requisitionId,status"
  ) => {
    const url = `${this.baseUrl}/recruitment/submission/user?email=${email}`;
    const params = { page, pageSize, project };
    return AppUtils.appendParamsToUrl(url, params);
  };

  getSelectedRecruitment = (id: string) =>
    `${this.baseUrl}/recruitment/submission/${id}`;

  getCandidatesNames = () =>
    `${this.baseUrl}/filter/reqsubmission?key=candidateName`;

  getEmployees = () => `${this.baseUrl}/filter/reqsubmission?key=employer`;
  getRequesitionIds = () =>
    `${this.baseUrl}/filter/recruitment?key=requisitionId`;

  getTechnology = () => `${this.baseUrl}/filter/reqsubmission?key=technology`;
  // // Update operation
  updateRecruitmentSubmission = (id: any) =>
    `${this.baseUrl}/recruitment/submission/${id}`;

  // // Delete operation
  deleteRecruitmentSubmission = (id: any) =>
    `${this.baseUrl}/recruitment/submission/${id}`;

  //Filter operation
  getFilterRecruitmentSubmission = (queryparams: any) =>
    `${this.baseUrl}/recruitment/submission?${queryparams}`;
}

export default RecruitmentSubmissionService;
