import { REACT_API_URL } from "../../urlConfig";

class ClientService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createClient = () => `${this.baseUrl}/client`;

  // Read operation
  getClients = () => `${this.baseUrl}/client?userEnable=true`;
  getSubmissionClients = () => `${this.baseUrl}/client`;

  // Update operation
  async updateClient() {
    throw "Not implemented";
  }

  // Delete operation
  async deleteClient() {
    throw "Not implemented";
  }
}

export default ClientService;
