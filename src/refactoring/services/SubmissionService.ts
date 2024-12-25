import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";

class SubmissionService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createSubmission = () => `${this.baseUrl}/submission`;
  //we get ids and names and they are repated
  // Read operation
  // getSubmissions = (filters: any,users:any) => {
  //   const updatedFilters=filters
  //   filters?.name?.forEach((id:string) => {
  //     const user = users.find((user:any) => user.profile._id === id);
  //     if (user) {
  //       updatedFilters.name.push(user?.profile.firstName);
  //     }
  //   });

  //   const url = `${this.baseUrl}/submission`;
  //   return AppUtils.appendParamsToUrl(url, updatedFilters);
  // };

  //we get only names and they are not selected in ui
  getSubmissions = (filters: any, users: any) => {
    const updatedFilters = filters;
    filters?.name?.forEach((id: string) => {
      const user = users.find((user: any) => user.profile._id === id);
      if (user) {
        updatedFilters.name.push(user?.profile.firstName);
      }
    });
    const names = Array.from(new Set(updatedFilters.name)).filter(
      (item) => !/\d/.test(item as string)
    );

    updatedFilters.name = names;
    const url = `${this.baseUrl}/submission`;
    return AppUtils.appendParamsToUrl(url, updatedFilters);
  };

  getSubmissionsOnlyByProject = (project = "_id,subDetails.profile.name") =>
    `${this.baseUrl}/submission?project=${project}`;

  getSubmissionById = (id: any) => {
    return `${this.baseUrl}/submission/${id}`;
  };

  getRecruiterDetails = (id: any) => {
    return `${this.baseUrl}/comprecs/${id}`;
  };

  // // Update operation
  updateSubmission = (id: any) => `${this.baseUrl}/submission/${id}`;

  // // Delete operation
  deleteSubmission = (id: any) => `${this.baseUrl}/submission/${id}`;

  //Filter operation
  getFilterSubmission = (queryparams: any) =>
    `${this.baseUrl}/submission?${queryparams}`;
}

export default SubmissionService;
