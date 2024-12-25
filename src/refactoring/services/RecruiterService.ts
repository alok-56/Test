import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";


class RecruiterService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createRecruiter = () => `${this.baseUrl}/recruiter`;

  // Read operation

  getCompanies = () => `${this.baseUrl}/filter/recruiters?key=company_name`;

  getTechnologies = () => `${this.baseUrl}/filter/recruiters?key=technology`;

  getRecruiters = () => `${this.baseUrl}/recruiter?userEnable=true`;

  getSubmissionRecruiters = () => `${this.baseUrl}/recruiter`;

  getRecruitersByProject = (project = "name") =>
    `${this.baseUrl}/recruiter?project=${project}`;
 
  // getfiltersRecruiters = (filters: any) => `${this.baseUrl}/recruiter?userEnable=true&${filters}`;

  getfiltersRecruiters = (filters: any) => {
    let url = `${this.baseUrl}/recruiter?userEnable=true`;
    return AppUtils.appendParamsToUrl(url, filters);
  };
  
  
  // Update operation
  async updateRecruiter() {
    throw "Not implemented";
  }

  // Delete operation
  async deleteRecruiter() {
    throw "Not implemented";
  }
}

export default RecruiterService;
