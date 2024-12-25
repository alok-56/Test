import { REACT_API_URL } from "../../urlConfig";

class VendorService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createVendor = () => `${this.baseUrl}/vendor`;

  // Read operation
  getVendors = () => `${this.baseUrl}/vendor?userEnable=true`;
  getSubmissionVendors = () => `${this.baseUrl}/vendor`;
  // Update operation
  async updateVendor() {
    throw "Not implemented";
  }

  // Delete operation
  async deleteVendor() {
    throw "Not implemented";
  }
}

export default VendorService;
