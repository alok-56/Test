import { REACT_API_URL } from "../../urlConfig";

class ThinkAIService {
  baseUrl = REACT_API_URL;

  // Create operation
  createConversations = () => `${this.baseUrl}/conversations`;

  // Read operation
  getConversations = () => `${this.baseUrl}/conversations`;

  // Update operation
  async updateConversations() {
    throw "Not implemented";
  }

  // Delete operation
  async deleteConversations() {
    throw "Not implemented";
  }
}

export default ThinkAIService;
