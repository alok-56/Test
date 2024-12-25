import { REACT_API_URL } from "../../urlConfig";

class ResumeAnalyzerService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createResumeAnalyzer = () => `${this.baseUrl}/matchResume`;

  // Read operation
  getResumeAnalyzer = () => `${this.baseUrl}/matchResume`;

  // Update operation
  async updateClient() {
    throw "Not implemented";
  }

  // Delete operation
  async deleteClient() {
    throw "Not implemented";
  }
}

export default ResumeAnalyzerService;
