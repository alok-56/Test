import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";

class RecruitmentService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createRecruitment = () => `${this.baseUrl}/recruitment`;

  // Read operation
  getRecruitment = () => `${this.baseUrl}/recruitment`;
  getRecruitmentDetails = (id:string) => `${this.baseUrl}/recruitment/${id}`;
  getMainRecruitment = (filters: any, page: number, pageSize: number) => {
    const url = `${this.baseUrl}/recruitment`;
    const params = { ...filters, page, pageSize };
    return AppUtils.appendParamsToUrl(url, params);
  };

  getRecruitmentByProject = (project = "name") =>
    `${this.baseUrl}/recruiter?project=${project}`;

  //single recruitment operation
  getSelectedRecruitment = (id: string) => `${this.baseUrl}/recruitment/${id}`;

  // Update operation
  updateRecruitment = (id: string) => `${this.baseUrl}/recruitment/${id}`;

  // Delete operation
  deleteRecruitment = (id: string) => `${this.baseUrl}/recruitment/${id}`;
}

export default RecruitmentService;
