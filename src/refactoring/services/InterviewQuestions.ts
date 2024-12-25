import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";

class InterviewPreparationService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createUserInterview = () => `${this.baseUrl}/interviewQuestions`;
  // Read operation
  getUserInterviewsQuestion = () => `${this.baseUrl}/interviewQuestions`;
  getUserInterviewsQuestionById = (id: string) =>
    `${this.baseUrl}/interviewQuestions/${id}`;

  getUserInterviews = (filters: any, page: number, pageSize: number) => {
    const url = `${this.baseUrl}/interviewQuestions`;
    const params = { ...filters, page, pageSize };
    return AppUtils.appendParamsToUrl(url, params);
  };

  getFrequentlyInterviews = (position: any) => 
    `${this.baseUrl}/interviewQuestions?position=${position}`;
  
  // getUserInterviews = (filters: any, ) => {
  //   const url = `${this.baseUrl}/interviewQuestions`;
  //   const params = { ...filters,  };
  //   return AppUtils.appendParamsToUrl(url, params);
  // };

  getTagsInterviewQuestions = () => `${this.baseUrl}/tags/interviewQuestions`;

  getPositions = () => `${this.baseUrl}/filter/interviewQuestions?key=position`;
  getInterviewPreparationsById = (id: string) =>
    `${this.baseUrl}/interviewQuestions/${id}`;

  getInterviewQuestionsById = (id: string) =>
    `${this.baseUrl}/interview/Questions/${id}`;

  // Update operation
  updateUserInterview = (id: string) =>
    `${this.baseUrl}/interviewQuestions/${id}`;

  // Delete operation
  deleteUserInterview = (id: string) =>
    `${this.baseUrl}/interviewQuestions/${id}`;
}

export default InterviewPreparationService;
