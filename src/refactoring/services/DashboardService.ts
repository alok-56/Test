import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";

class DashboardService {
  baseUrl = REACT_API_URL + "/dashboard";
  recentDays = 30;

  constructor() {}

  getRecruiters = (filters: any) => {
    let url = `${this.baseUrl}/charts/recruiters`;
    return AppUtils.appendParamsToUrl(url, filters);
  };

  getOverview = (filters: any) => {
    let url = `${this.baseUrl}/charts/overview`;
    return AppUtils.appendParamsToUrl(url, filters);
  };

  getSummary = () => `${this.baseUrl}/summary?recentDays=${this.recentDays}`;
}

export default DashboardService;
