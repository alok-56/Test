import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";

class InterviewService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createInterview = () => `${this.baseUrl}/interview`;
  // Read operation
  getInterviews = () => `${this.baseUrl}/interview?onlyInterviews=true`;

  getInterviewFilters = (filters: any, interviewData: any) => {
    const updatedFilters = filters;
    filters?.name?.forEach((id: string) => {
      const user = interviewData.find(
        (user: any) => user?.subDetails?.profile._id === id
      );
      if (user) {
        updatedFilters.name.push(user?.subDetails?.profile.name);
      }
    });
    const names = Array.from(new Set(updatedFilters.name)).filter(
      (item) => !/\d/.test(item as string)
    );

    const url = `${this.baseUrl}/interview?onlyInterviews=true`;
    if (names?.length) {
      updatedFilters.name = names;
      return AppUtils.appendParamsToUrl(url, updatedFilters);
    } else {
      return AppUtils.appendParamsToUrl(url, updatedFilters);
    }
  };

  // Update operation
  updateInterview = (id: any) => `${this.baseUrl}/interview/${id}`;

  // Delete operation
  deleteInterview = (id: any) => `${this.baseUrl}/interview/${id}`;
}

export default InterviewService;
